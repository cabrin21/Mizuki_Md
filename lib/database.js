// 💾 DATABASE HELPER (Extension Groupes)

const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

function initDb() {
    if (!fs.existsSync(config.database.settings)) {
        fs.outputJsonSync(config.database.settings, { 
            mode: 'public', 
            lang: 'fr',
            autostatusview: false,
            autostatusreact: false,
            autotyping: false,
            autorecord: false,
            chatbotMode: 'off', // off, private, group, both
            sudo: [], // Liste des Super-Utilisateurs
            menuImages: [
                "https://i.ibb.co/6RgB62mq/ab84f0746010.jpg",
                "https://i.ibb.co/C51Xsdh6/b178e8bf7008.jpg",
                "https://i.ibb.co/cXCh470M/1e4f852315c7.jpg",
                "https://i.ibb.co/DfCV88FJ/1a5a51a0fe3b.jpg"
            ]
        });
    }
    if (!fs.existsSync(config.database.groups)) fs.outputJsonSync(config.database.groups, {});
}

// Récupérer la config d'un groupe (avec valeurs par défaut)
function getGroupSettings(groupId) {
    initDb();
    const groups = fs.readJsonSync(config.database.groups);
    return groups[groupId] || {
        antilink: false,
        antilinkAction: 'delete',
        antispam: false,
        antitransfert: false,
        antimedia: false,
        antitag: false,
        antipromote: false,
        antidemote: false,
        antibadword: false,
        badwords: [],
        autoreact: false, // Réaction auto
        welcome: false, // Message de bienvenue
        welcomeMessage: `
╭━━━〔 ℬℰЅᏆᎽ ℳℐℤUᏦℐ 〕━━━╮
┃ 🫶 Welcome
┃
┃ 👤 Member : @user
┃ 🏰 Killua : @group
┃
┃ 📜 Group Description :
┃ @desc
┃
┃ 📅 Date : @date
┃ 🕒 Time : @time
┃
┃ ❤️‍🩹 welcome.
╰━━━━━━━━━━━━━━━━━━╯
`
    };
}

// Mettre à jour un groupe
function updateGroupSetting(groupId, key, value) {
    initDb();
    const groups = fs.readJsonSync(config.database.groups);
    
    if (!groups[groupId]) groups[groupId] = {};
    groups[groupId][key] = value;
    
    fs.writeJsonSync(config.database.groups, groups, { spaces: 2 });
    return groups[groupId];
}

// ... (Le reste est identique : getSettings, updateSetting)
function getSettings() { initDb(); return fs.readJsonSync(config.database.settings); }
function updateSetting(key, value) { 
    const data = getSettings(); data[key] = value; 
    fs.writeJsonSync(config.database.settings, data, { spaces: 2 }); 
    return data; 
}

module.exports = { getSettings, updateSetting, getGroupSettings, updateGroupSetting };