/ 👑🌸ℳ¡☡ųƙ¡-𝕸𝖉🌸👑 - BETWEEN 

const { connectToWhatsApp } = require('./killua/client');
const { loadPlugins } = require('./killua/handler');
const config = require('./config');

async function start() {
    try {
        console.log(` ${config.botName} startup`);
        
        
        loadPlugins();

        
        await connectToWhatsApp();

    } catch (e) {
        console.error("Erreur critique:", e);
    }
}

start();
