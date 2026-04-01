// 👑 Plugin: MODE

const { updateSetting } = require('../../lib/database');

module.exports = {
  name: 'mode',
  aliases: [],
  category: 'owner',
  description: '⚜ 𝐂𝐡𝐚𝐧𝐠𝐞 𝐭𝐡𝐞 𝐫𝐨𝐲𝐚𝐥 𝐦𝐨𝐝𝐞 𝐨𝐟 𝐭𝐡𝐞 𝐛𝐨𝐭 (𝐩𝐮𝐛𝐥𝐢𝐜/𝐩𝐫𝐢𝐯𝐚𝐭𝐞)',
  usage: '.mode <public/private>',
  ownerOnly: true,

  execute: async (client, message, args) => {

    const chatId = message.key.remoteJid
    const newMode = args[0]?.toLowerCase()

    if (!['public','private'].includes(newMode)) {

      return client.sendMessage(chatId, {

text:
`╭━━━〔 ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕━━━╮
┃ ⚜ killua command error
┃
┃ 𝐔𝐬𝐚𝐠𝐞 :
┃ .mode 𝐩𝐮𝐛𝐥𝐢𝐜
┃ .mode 𝐩𝐫𝐢𝐯𝐚𝐭𝐞
┃
┃ ۝ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒
╰━━━━━━━━━━━━━━━━━━╯`

      },{quoted:message})

    }

    // 👑 reaction
    await client.sendMessage(chatId,{
      react:{text:"👑",key:message.key}
    })

    // update mode
    updateSetting('mode',newMode)

    // royal message
    await client.sendMessage(chatId,{

text:
`╭━━━〔 ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕━━━╮
┃ ⚜ ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒
┃ ۝ 𝐍𝐞𝐰 𝐌𝐨𝐝𝐞 : *${newMode.toUpperCase()}*
┃
┃ ۝ 𝐎𝐫𝐝𝐞𝐫𝐞𝐝 𝐛𝐲 𝐭𝐡𝐞 𝐭𝐡𝐫𝐨𝐧𝐞
┃
┃ ۝ 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲
┃     ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒
╰━━━━━━━━━━━━━━━━━━╯`

    },{quoted:message})

  }
}
