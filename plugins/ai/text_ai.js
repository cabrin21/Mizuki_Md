// 👑 MIZUKI AI SYSTEM
// Officiel Text AI Models

const axios = require('axios');

const API_KEY = 'gifted';

const textModels = [
{ name: 'gpt4o', endpoint: 'gpt4o', desc: 'GPT-4o Royal Mind' },
{ name: 'gemini', endpoint: 'gemini', desc: 'Google Gemini Intelligence' },
{ name: 'venice', endpoint: 'venice', desc: 'Venice AI Oracle' },
{ name: 'unlimitedai', endpoint: 'unlimitedai', desc: 'Unlimited Artificial Mind' },
{ name: 'letme', endpoint: 'letmegpt', desc: 'Let Me GPT For You', isUrlResponse: true }
];

const commands = textModels.map(model => ({

name: model.name,
aliases: [],
category: 'ai',
description: model.desc,
usage: `.${model.name} <question>`,

execute: async (client, message, args) => {

const chatId = message.key.remoteJid;
const text = args.join(' ');

if (!text) {

return client.sendMessage(chatId,{
text:

`╭━━━〔 🌷ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕━━━╮
┃ ⚜ Royal AI Chamber
┃
┃ Example :
┃ .${model.name} What is AI?
┃
┃ ♛ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒
╰━━━━━━━━━━━━━━━━━━╯`
},{quoted:message})

}

await client.sendMessage(chatId,{
react:{text:"🌹",key:message.key}
})

await client.sendPresenceUpdate("composing",chatId)

try{

const {data}=await axios.get(
`https://api.giftedtech.co.ke/api/ai/${model.endpoint}?apikey=${API_KEY}&q=${encodeURIComponent(text)}`
)

if(model.isUrlResponse){

const replyText=typeof data==="string"
? data
: (data.result||data.url||JSON.stringify(data))

await client.sendMessage(chatId,{
text:replyText
},{quoted:message})

return
}

if(data && data.success && data.result){

await client.sendMessage(chatId,{

text:

`╭━━━〔 🌷ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕━━━╮
┃ Response
┃
┃ ${data.result}
┃
┃ 🧠 Model : ${model.name}
┃ ♛ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒
╰━━━━━━━━━━━━━━━━━━╯`

},{quoted:message})

}else{

throw new Error("API Error")

}

}catch(error){

console.error(error)

await client.sendMessage(chatId,{
text:

`ℬℰЅᏆᎽ ℳℐℤUᏦℐ.`

},{quoted:message})

}

await client.sendPresenceUpdate("paused",chatId)

}

}))

// 🌷CUSTOM AI (MIZUKI PERSONALITY)

commands.push({

name:'mizuki',
category:'ai',
description:'Chat with mizuki AI',
usage:'.<question>',

execute:async(client,message,args)=>{

const chatId=message.key.remoteJid
const text=args.join(' ')

if(!text){
return client.sendMessage(chatId,{
text:"ҜILLUΔ ᴼᶠᶠᴵᶜᴵᴱᴸ."
},{quoted:message})
}

await client.sendMessage(chatId,{
react:{text:"🌹",key:message.key}
})

await client.sendPresenceUpdate("composing",chatId)

const prompt=
`You are ℬℰЅᏆᎽ ℳℐℤUᏦℐ, the ruler of a digital kingdom.
You speak elegantly like a besty, intelligent and calm.
You help users with wisdom and clarity.`

try{

const {data}=await axios.get(
`https://api.giftedtech.co.ke/api/ai/custom?apikey=${API_KEY}&q=${encodeURIComponent(text)}&prompt=${encodeURIComponent(prompt)}`
)

if(data && data.success && data.result){

await client.sendMessage(chatId,{

text:

`╭━━━〔 🌷ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕━━━╮
┃
┃ ${data.result}
┃
┃ ♛ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒
╰━━━━━━━━━━━━━━━━━━╯`

},{quoted:message})

}else{

throw new Error("API Error")

}

}catch(e){

await client.sendMessage(chatId,{
text:"🌷 The mizuki cannot answer right now."
},{quoted:message})

}

await client.sendPresenceUpdate("paused",chatId)

}

})

module.exports = commands
