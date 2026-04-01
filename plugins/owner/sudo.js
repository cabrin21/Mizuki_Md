const { updateSetting, getSettings } = require('../../lib/database');
const { normalizeJid } = require('../../lib/authHelper');

module.exports = [
{
name: 'setsudo',
aliases: ['addsudo'],
category: 'owner',
description: 'Add a killua',
usage: '.setsudo (@tag or reply)',
ownerOnly: true,

execute: async (client, message, args) => {

const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.participant || message.message?.extendedTextMessage?.contextInfo?.participant;
const target = mentioned || quoted;

if (!target) {
return client.sendMessage(message.key.remoteJid,{
text:`ℬℰЅᏆᎽ ℳℐℤUᏦℐ
⚜️ Mention killua officiel .`
},{quoted:message});
}

const targetId = normalizeJid(target);
const settings = getSettings();
let sudos = settings.sudo || [];

if (sudos.includes(targetId)) {
return client.sendMessage(message.key.remoteJid,{
text:`ℬℰЅᏆᎽ ℳℐℤUᏦℐ
⚜️ 𝐓𝐡𝐢𝐬 𝐬𝐮𝐛𝐣𝐞𝐜𝐭 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐩𝐨𝐬𝐬𝐞𝐬𝐬𝐞𝐬 ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒ .`
},{quoted:message});
}

sudos.push(targetId);
updateSetting('sudo', sudos);

await client.sendMessage(message.key.remoteJid,{
text:` ℬℰЅᏆᎽ ℳℐℤUᏦℐ 
⚜️ 𝐁𝐲 𝐦𝐲 ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒, @${targetId} 𝐢𝐬 ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒ .`,
mentions:[target]
},{quoted:message});

}
},

{
name: 'delsudo',
aliases: ['rmsudo'],
category: 'owner',
description: 'Remove',
usage: '.delsudo (@tag or reply)',
ownerOnly: true,

execute: async (client, message, args) => {

const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.participant;
const target = mentioned || quoted;

if (!target) {
return client.sendMessage(message.key.remoteJid,{
text:`ℬℰЅᏆᎽ ℳℐℤUᏦℐ
🌷 up .`
},{quoted:message});
}

const targetId = normalizeJid(target);
const settings = getSettings();
let sudos = settings.sudo || [];

if (!sudos.includes(targetId)) {
return client.sendMessage(message.key.remoteJid,{
text:`ℬℰЅᏆᎽ ℳℐℤUᏦℐ
 𝐩𝐫𝐢𝐯𝐢𝐥𝐞𝐠𝐞𝐬 .`
},{quoted:message});
}

sudos = sudos.filter(id => id !== targetId);
updateSetting('sudo', sudos);

await client.sendMessage(message.key.remoteJid,{
text:`ℬℰЅᏆᎽ ℳℐℤUᏦℐ
⚜️ 𝐁𝐲 𝐨𝐫𝐝𝐞𝐫 𝐨𝐟 𝐭𝐡𝐞 ℬℰЅᏆᎽ, @${targetId} 𝐥𝐨𝐬𝐞𝐬 𝐭𝐡𝐞𝐢𝐫 ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒ privileges.`,
mentions:[target]
},{quoted:message});

}
},

{
name: 'listsudo',
aliases: ['sudos'],
category: 'owner',
description: 'List of Killua Officiel',
usage: '.listsudo',
ownerOnly: true,

execute: async (client, message, args) => {

const settings = getSettings();
const sudos = settings.sudo || [];

if (sudos.length === 0) {
return client.sendMessage(message.key.remoteJid,{
text:`ℬℰЅᏆᎽ ℳℐℤUᏦℐ
⚜️ 𝐍𝐨 𝐤𝐧𝐢𝐠𝐡𝐭 𝐡𝐚𝐬 𝐲𝐞𝐭 𝐛𝐞𝐞𝐧 𝐜𝐡𝐨𝐬𝐞𝐧 𝐭𝐨 𝐬𝐞𝐫𝐯𝐞 𝐭𝐡𝐞 𝐜𝐫𝐨𝐰𝐧 .`
},{quoted:message});
}

let list='';
sudos.forEach(s => list+=`⚜️ @${s}\n`);

await client.sendMessage(message.key.remoteJid,{
text:`ℬℰЅᏆᎽ ℳℐℤUᏦℐ

⚜️𝐨𝐟 𝐭𝐡𝐞 ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒ ⚜️

${list}

Powers by Killua officiel`,
mentions:sudos.map(s=>s+'@s.whatsapp.net')
},{quoted:message});

}
}
];
