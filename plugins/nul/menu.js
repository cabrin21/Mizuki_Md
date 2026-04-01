// 🌺 Menu for ℳ¡☡ųƙ¡-𝕸𝖉 🌺

const fs = require('fs');
const path = require('path');
const config = require('../../config');
const { getSettings } = require('../../lib/database');
const { formatUptime } = require('../../lib/functions');

const MENU_IMAGES = [
"https://i.ibb.co/C51Xsdh6/b178e8bf7008.jpg",
"https://i.ibb.co/cXCh470M/1e4f852315c7.jpg",
"https://i.ibb.co/XZKTpYKc/d17c01de96d9.jpg",
"https://i.ibb.co/cXCh470M/1e4f852315c7.jpg"
];

const AUDIO_THEME_URL = "https://files.catbox.moe/nj4zoi.mp3";

const menuCooldown = new Map();

module.exports = {
name: 'menu',
aliases: ['killua','mizuki'],
category: 'misc',
description: 'ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒ 𝐌𝐞𝐧𝐮',
usage: '.menu',

execute: async (client, message, args, msgOptions) => {

try {

const chatId = message.key.remoteJid;
const senderId = message.key.participant || message.key.remoteJid;

const commandKey = `${chatId}-${senderId}`;
const now = Date.now();

if (menuCooldown.get(commandKey) && now - menuCooldown.get(commandKey) < 3000) return;
menuCooldown.set(commandKey, now);

await client.sendMessage(chatId,{react:{text:"🌹",key:message.key}});

const settings = getSettings();
const prefix = settings.prefix || config.prefix;

const images = settings.menuImages?.length > 0 ? settings.menuImages : MENU_IMAGES;
const randomImage = images[Math.floor(Math.random()*images.length)];

let caption = "```\n";

caption += `┏━━━━━━━━۝〔 ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕۝━━━━━━━━✰\n`;
caption += `┃ ۝ 𝐎𝐰𝐧𝐞𝐫 : ♛ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒♛\n`;
caption += `┃ ۝ 𝐔𝐬𝐞𝐫 : @${senderId.split('@')[0]}\n`;
caption += `┃ ۝ 𝐏𝐫𝐞𝐟𝐢𝐱 : [${prefix}]\n`;
caption += `┃ ۝ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${formatUptime(process.uptime())}\n`;
caption += `┗━━━━━━━━━━━━━━━━━━━━━━━━━✰\n\n`;

const categories = [

{dir:'system',title:'┏━━🌹 𝐌𝐄 🌹'},
{dir:'media',title:'┏━━🌹 𝐌𝐄𝐃𝐈𝐀 🌹'},
{dir:'group',title:'┏━━🌹 𝐆𝐑𝐎𝐔𝐏 🌹'},
{dir:'tools',title:'┏━━🌹 𝐓𝐎𝐎𝐋𝐒 🌹'},
{dir:'misc',title:'┏━━🌹 𝐌𝐈𝐒𝐂 🌹'},
{dir:'fun',title:'┏━━🌹 𝐅𝐔𝐍 🌹'},
{dir:'download',title:'┏━━🌹 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 🌹'},
{dir:'ai',title:'┏━━🌹 𝐀𝐈 🌹'},
{dir:'owner',title:'┏━━🌹 𝐓𝐎P 🌹'}

];

const pluginsDir = path.join(__dirname,'../../plugins');
const processed = new Set();

let totalCommands = 0;

for (const cat of categories){

const catPath = path.join(pluginsDir,cat.dir);

if(!fs.existsSync(catPath)) continue;

const files = fs.readdirSync(catPath).filter(f=>f.endsWith('.js'));

let cmds=[];

for (const file of files){

try{

const plugin = require(path.join(catPath,file));

const list = Array.isArray(plugin)?plugin:[plugin];

list.forEach(cmd=>{

if(cmd.name && !processed.has(cmd.name) && cmd.name!=='menu'){

processed.add(cmd.name);

cmds.push(cmd.name);

totalCommands++;

}

});

}catch{}

}

if(cmds.length>0){

caption += `${cat.title}\n`;

cmds.sort().forEach(c=>{

caption += `┃⚜️ /${c}\n`;

});

caption += `┗━━━━━━━━━━━━━━━━━━✰\n\n`;

}

}

caption += `┏━━━━━━━━━━━━━━━━━━━━━━━━━✰\n`;
caption += `┃ ♛ℬℰЅᏆᎽ ℳℐℤUᏦℐ♛\n`;
caption += `┃ ♛𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 : ${totalCommands}\n`;
caption += `┃ ♛Power by ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒\n`;
caption += `┗━━━━━━━━━━━━━━━━━━━━━━━━━✰\n`;

caption += "```";

await client.sendMessage(chatId,{
image:{url:randomImage},
caption,
mentions:[senderId],
...msgOptions
},{quoted:message});

if(AUDIO_THEME_URL){

setTimeout(()=>{

client.sendMessage(chatId,{

audio:{url:AUDIO_THEME_URL},
mimetype:'audio/mpeg',
ptt:false

});

},800);

}

}catch(err){

console.log("Menu Error:",err);

}

}

};
