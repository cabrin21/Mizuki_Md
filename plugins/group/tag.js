/// 👑 Queen Lucia - Tag System (TagAll + HideTag with Image)

module.exports = [

{
name: 'tagall',
aliases: ['everyone'],
category: 'group',
description: '𝐒𝐮𝐦𝐦𝐨𝐧 𝐭𝐡𝐞 𝐞𝐧𝐭𝐢𝐫𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦',
usage: '.tagall <message>',
groupOnly: true,
adminOnly: true,

execute: async (client, message, args) => {

try {

const chatId = message.key.remoteJid

const metadata = await client.groupMetadata(chatId)
const participants = metadata.participants.map(p => p.id)
const groupName = metadata.subject

const msg = args.join(' ')

const imageUrl = "https://i.ibb.co/DfCV88FJ/1a5a51a0fe3b.jpg"

let list = ''
participants.forEach(user => {
list += `👑 @${user.split('@')[0]}\n`
})

const caption = `
╭━━━〔 ۝ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕━━━╮
┃ ۝ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒ : ${groupName}
┃ ۝Des
┃
┃ 𝐓𝐡𝐞 ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒
┃
┃ 📜 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 :
┃ ${msg || "𝐇𝐞𝐫 𝐌𝐚𝐣𝐞𝐬𝐭𝐲 𝐝𝐞𝐦𝐚𝐧𝐝𝐬 𝐲𝐨𝐮𝐫 𝐚𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧"}
┃
┃ 👑 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 :
${list}
╰━━━━━━━━━━━━━━━━━━╯
`

await client.sendMessage(chatId, {

image: { url: imageUrl },
caption: caption,
mentions: participants

}, { quoted: message })

} catch (err) {

console.error("TagAll Error:", err)

client.sendMessage(message.key.remoteJid, {
text: "❌ 𝐓𝐚𝐠𝐀𝐥𝐥 failed."
})

}

}

},

{
name: 'hidetag',
aliases: ['ht'],
category: 'group',
description: '𝐒𝐞𝐜𝐫𝐞𝐭 𝐫𝐨𝐲𝐚𝐥 𝐬𝐮𝐦𝐦𝐨𝐧',
usage: '.hidetag <message>',
groupOnly: true,
adminOnly: true,

execute: async (client, message, args) => {

try {

const chatId = message.key.remoteJid

const metadata = await client.groupMetadata(chatId)
const participants = metadata.participants.map(p => p.id)
const groupName = metadata.subject

const msg = args.join(' ')

const imageUrl = "https://i.ibb.co/JVPBNkd/979587fed938.jpg"

const caption = msg || `
♛ ℬℰЅᏆᎽ ℳℐℤUᏦℐ

❣ ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒ : ${groupName}

𝐀 𝐬𝐞𝐜𝐫𝐞𝐭 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐭𝐡𝐞 𝐭𝐡𝐫𝐨𝐧𝐞
𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐝𝐞𝐥𝐢𝐯𝐞𝐫𝐞𝐝 𝐭𝐨 𝐚𝐥𝐥 𝐬𝐮𝐛𝐣𝐞𝐜𝐭𝐬.
`

await client.sendMessage(chatId, {

image: { url: imageUrl },
caption: caption,
mentions: participants

}, { quoted: message })

} catch (err) {

console.error("HideTag Error:", err)

client.sendMessage(message.key.remoteJid, {
text: "❌ 𝐇𝐢𝐝𝐞𝐓𝐚𝐠 failed."
})

}

}

}

]