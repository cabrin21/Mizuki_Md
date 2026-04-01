//// ℳ¡☡ųƙ¡ Md - CONFIGURATION (Via .env)

require('dotenv').config();

module.exports = {

  botName: process.env.BOT_NAME || 'ℬℰЅᏆᎽ ℳℐℤUᏦℐ',
  ownerName: process.env.OWNER_NAME || '۝ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒۝',

  ownerNumber: (process.env.OWNER_NUMBER || '243817601713').split(','),

  phoneNumber: process.env.PHONE_NUMBER || '243817601713',

  prefix: process.env.PREFIX || '.',

  sessionName: process.env.SESSION_NAME || 'session',

  defaultLang: process.env.DEFAULT_LANG || 'fr',

  autoRead: process.env.AUTO_READ === 'true',

  newsletterJid: process.env.NEWSLETTER_JID || '120363419277738229@newsletter',

  logoUrl: process.env.LOGO_URL || 'https://i.ibb.co/XZKTpYKc/d17c01de96d9.jpg',

  syncFullHistory: false,
  keepAliveInterval: 30000,
  
  database: {
    users: './database/users.json',
    groups: './database/groups.json',
    settings: './database/settings.json'
  }

};
