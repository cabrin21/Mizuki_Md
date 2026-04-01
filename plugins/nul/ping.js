const os = require('os');

module.exports = {
  name: 'ping',
  aliases: [],
  category: 'misc',
  description: 'Killua officiel 𝐬𝐭𝐚𝐭𝐮𝐬',
  usage: '.ping',

  execute: async (client, message, args, msgOptions) => {

    const start = Date.now();

    // React with crown
    await client.sendMessage(message.key.remoteJid, {
      react: { text: "👑", key: message.key }
    });

    // Initial royal message
    await client.sendMessage(message.key.remoteJid, {
      text: "۝ℬℰЅᏆᎽ ℳℐℤUᏦℐ 𝐢𝐬 𝐜𝐨𝐧𝐬𝐮𝐥𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐤𝐢llua 𝐚𝐫𝐜𝐡𝐢𝐯𝐞𝐬 ..."
    }, { quoted: message });

    const end = Date.now();
    const latency = end - start;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor(uptime % 3600 / 60);
    const seconds = Math.floor(uptime % 60);

    // ping embed
    await client.sendMessage(message.key.remoteJid, {
      image: { url: "https://i.ibb.co/C51Xsdh6/b178e8bf7008.jpg" },
      caption: `
╭━━━〔 ۝ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕━━━╮
┃ ♟ 𝐁𝐨𝐭 : ℬℰЅᏆᎽ ℳℐℤUᏦℐ
┃ ⚡ 𝐏𝐢𝐧𝐠 : ${latency} ms
┃ ⏳ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${hours}h ${minutes}m ${seconds}s
┃ 📅 𝐃𝐚𝐭𝐞 : ${date}
┃ 🕒 𝐓𝐢𝐦𝐞 : ${time}
┃ 🏷 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 : 1.0.0
┃
┃ ۝ Description :
┃ "𝐓𝐡𝐞 légende ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒ ."
╰━━━━━━━━━━━━━━━━━━╯
`
    }, { quoted: message, ...msgOptions });

  }
};
