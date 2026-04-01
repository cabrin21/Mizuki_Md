<p align="center">
  <img src="./mizuki.jpg" alt="🌹ℳ¡☡ųƙ¡-𝕸𝖉🌹" width="100%" style="border-radius: 10px;"/>
</p>

<h1 align="center">🌹ℳ¡☡ųƙ¡-𝕸𝖉🌹</h1>

<p align="center">
  <b>The Fast, Modular & Developer-Friendly WhatsApp Bot.</b><br>
  <i>Le Bot WhatsApp rapide, modulaire et facile pour les développeurs.</i>
</p>

<p align="center">
  <a href="https://github.com/stephdev12/REN-MDX/fork">
    <img src="https://img.shields.io/badge/FORK-REPO-black?style=for-the-badge&logo=github" alt="Fork Repo">
  </a>
  <a href="https://github.com/stephdev12/REN-MDX/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/DOWNLOAD-ZIP-blue?style=for-the-badge&logo=download" alt="Download Zip">
  </a>
</p>

<hr/>

## 🌟 Features / Fonctionnalités

- **⚡ Fast & Optimized:** Uses `gifted-baileys` with stripped history sync for instant startup.
- **🔌 Auto-Pairing:** No QR Code scan needed in terminal! Just run and enter your number.
- **🛠️ Modular:** Command structure is simple (`module.exports`).
- **🛡️ Secure:** Built-in Group Protections (AntiLink, AntiSpam, AntiDelete...).
- **🌍 Multi-Language:** Dynamic language switching (`fr`, `en`...).
- **⚙️ Customizable:** Easily editable `config.js` and `.env`.

---

## 🚀 Deployment / Déploiement

### 📦 1. Panel (Pterodactyl, Sen-Host, etc.)

It's the easiest way to host the bot 24/7.

1.  **Upload & Extract:** Upload the `REN-MDX` zip file to your panel and extract it.
2.  **Create Configuration:** Create a file named `.env` in the root folder and fill it:
    *Créez un fichier nommé `.env` à la racine et remplissez-le :*

    ```env
    BOT_NAME=ℳ¡☡ųƙ¡-𝕸𝕯
    OWNER_NAME=༒𓊈ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒𓊉༒      
    OWNER_NUMBER=+243906905464
    PREFIX=.
    SESSION_NAME=session
    DEFAULT_LANG=fr
    # Optional / Optionnel
    AUTO_READ=false
    NEWSLETTER_JID=120363419277738229@newsletter
    ```

3.  **Install & Start:**
    *   Go to "Startup" tab (or Console).
    *   Run command: `npm install && npm start`
    *   **Auto-Pairing:** The console will ask for your number if no session exists.

### 📱 2. Termux (Android)

Perfect for testing or local hosting.

```bash
apt update && apt upgrade
pkg install git nodejs ffmpeg
git clone https://github.com/stephdev12/REN-MDX.git
cd REN-MDX
npm install
npm start
```

---

## 👨‍💻 For Developers / Pour les Devs

Adding a command is super simple. Create a file in `plugins/category/mycmd.js`:

```javascript
module.exports = {
  name: 'mycmd',
  category: 'misc',
  description: 'Test command',
  usage: '.mycmd',
  
  // Flags
  ownerOnly: false,
  groupOnly: false,

  execute: async (client, message, args) => {
    await client.sendMessage(message.key.remoteJid, { text: 'It works!' });
  }
};
```

---

## 📞 Support & Credits

*   **Created by:** ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒
*   **Support Channel:** [Join WhatsApp Channel](https://whatsapp.com/channel/0029Vb6E9Kb84Om7UbQX431m)

---

## ⚠️ Disclaimer

This bot was created for educational purposes using an unofficial WhatsApp API. The developer is not responsible for any misuse, account bans, or damages caused by this software. Use at your own risk.
