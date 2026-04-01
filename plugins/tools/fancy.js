// ✨ Plugin: FANCY TEXT
// style text formatter

const axios = require('axios');
const API_KEY = 'gifted';

module.exports = {
    name: 'fancy',
    aliases: ['font', 'style'],
    category: 'tools',
    description: 'Transform text fancy styles',
    usage: '.fancy <text>',

    execute: async (client, message, args) => {

        const text = args.join(' ');
        
        if (!text) {
            return client.sendMessage(
                message.key.remoteJid,
                {
text:`Mizuki transformed into a cool style .`
                },
                { quoted: message }
            );
        }

        await client.sendMessage(message.key.remoteJid,{
            react:{ text:"🌷", key:message.key }
        });

        try {

            const apiUrl = `https://api.giftedtech.co.ke/api/tools/fancy?apikey=${API_KEY}&text=${encodeURIComponent(text)}`;
            const { data } = await axios.get(apiUrl);

            if (!data.success || !data.results) throw new Error('API Fail');

            let replyText = `Mizuki

fancy style 

`;

            data.results.forEach((item, index) => {
                replyText += `🌷 ${index + 1}. ${item.result}\n`;
            });

            replyText += `

power by killua`;

            await client.sendMessage(
                message.key.remoteJid,
                { text: replyText },
                { quoted: message }
            );

        } catch (e) {

            console.error(e);

            client.sendMessage(
                message.key.remoteJid,
                {
text:`Mizuki transformed into a cool style  .`
                },
                { quoted: message }
            );

        }
    }
};
