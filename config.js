//// ℳ¡☡ųƙ¡ Md - CONFIGURATION (Via .env)

require('dotenv').config();

module.exports = {

  // --- IDENTITÉ ---
  botName: process.env.BOT_NAME || 'ℬℰЅᏆᎽ ℳℐℤUᏦℐ',
  ownerName: process.env.OWNER_NAME || '۝ꀘ꒐꒒꒒꒤ꋬ ꄲꊰꊰ꒐ꉔ꒐ꏂ꒒۝',

  // Multi Owner support
  ownerNumber: (process.env.OWNER_NUMBER || '243817601713').split(','),

  // ⚠️ NE PAS FIXER LE NUMÉRO ICI
  phoneNumber: process.env.PHONE_NUMBER || '243817601713',

  // --- PREFIX ---
  prefix: process.env.PREFIX || '.',

  // --- SESSION ---
  sessionName: process.env.SESSION_NAME || 'session',

  // --- LANGUE ---
  defaultLang: process.env.DEFAULT_LANG || 'fr',

  // --- BOT OPTIONS ---
  autoRead: process.env.AUTO_READ === 'true',

  // --- NEWSLETTER ---
  newsletterJid: process.env.NEWSLETTER_JID || '120363419277738229@newsletter',

  // --- LOGO ---
  logoUrl: process.env.LOGO_URL || 'https://i.ibb.co/XZKTpYKc/d17c01de96d9.jpg',

  // --- PERFORMANCE ---
  syncFullHistory: false,
  keepAliveInterval: 30000,

  // --- DATABASE ---
  database: {
    users: './database/users.json',
    groups: './database/groups.json',
    settings: './database/settings.json'
  }

};