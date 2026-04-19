// 🌐 KILLUA - OPTIMIZED CONNECTION CLIENT (CLEAN + PANEL SUPPORT)

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require('gifted-baileys');

const pino = require('pino');
const fs = require('fs');
const path = require('path');
const readline = require("readline");
const config = require('../config');

// Handler
const { messageHandler } = require('./handler');
const { monitorMessage, monitorGroupUpdate } = require('./monitor');
const { getSettings } = require('../lib/database');
const { styleText } = require('../lib/functions');

async function connectToWhatsApp(io = null) {

    const { state, saveCreds } = await useMultiFileAuthState(config.sessionName);
    const { version } = await fetchLatestBaileysVersion();

    console.log(`🌷 ${config.botName} startup...`);

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !config.pairingCode,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        keepAliveIntervalMs: 30000,
        defaultQueryTimeoutMs: 60000,
        retryRequestDelayMs: 250,
        getMessage: async () => undefined
    });

    // 🔥 GLOBAL SOCKET (IMPORTANT POUR PANEL)
    global.sock = sock;

    // 📡 QR + PANEL SUPPORT
    sock.ev.on('connection.update', async (update) => {

        const { connection, lastDisconnect, qr } = update;

        // 🌐 QR PANEL
        if (qr && io) {
            const QRCode = require("qrcode");
            const qrImage = await QRCode.toDataURL(qr);
            io.emit("qr", qrImage);
        }

        // ✅ CONNECTÉ
        if (connection === 'open') {

            console.log('✅ Connecté à WhatsApp');

            if (io) io.emit("ready");

            const settings = getSettings();
            const botName = settings.botName || config.botName;
            const prefix = settings.prefix || config.prefix;

            let pluginCount = 0;
            const pluginDir = path.join(__dirname, '../plugins');

            if (fs.existsSync(pluginDir)) {

                fs.readdirSync(pluginDir).forEach(cat => {

                    const catPath = path.join(pluginDir, cat);

                    if (fs.lstatSync(catPath).isDirectory()) {

                        fs.readdirSync(catPath)
                            .filter(f => f.endsWith('.js'))
                            .forEach(() => pluginCount++);

                    }
                });
            }

            const now = new Date();

            const caption =
`╭━━━〔 ${botName} 〕━━━╮
┃ 🤖 BOT CONNECTED
┃ ⚙ Prefix : ${prefix}
┃ 🧩 Plugins : ${pluginCount}
┃ 📅 ${now.toLocaleDateString()}
┃ 🕒 ${now.toLocaleTimeString()}
╰━━━━━━━━━━━━━━╯`;

            try {
                const jid = sock.user.id.split(':')[0] + '@s.whatsapp.net';

                await sock.sendMessage(jid, {
                    text: caption
                });
            } catch {}
        }

        // 🔁 RECONNECT
        if (connection === 'close') {

            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

            console.log('❌ Connection closed:', statusCode);

            if (shouldReconnect) {
                setTimeout(() => connectToWhatsApp(io), 3000);
            }
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // 📩 MESSAGES
    sock.ev.on('messages.upsert', async (m) => {

        const msg = m.messages[0];
        if (!msg) return;

        if (m.type === 'notify') {
            await monitorMessage(sock, m);
            await messageHandler(sock, m);
        }
    });

    // 👥 GROUPS
    sock.ev.on('group-participants.update', async (update) => {
        await monitorGroupUpdate(sock, update);
    });

    return sock;
}

module.exports = { connectToWhatsApp };
