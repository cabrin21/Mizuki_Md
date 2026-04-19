const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { connectToWhatsApp } = require('./killua/client');
const { loadPlugins } = require('./killua/handler');
const config = require('./config');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("panel/public"));

app.get("/", (req, res) => {
  res.send("Mizuki Bot actif ✅");
});

// 🌐 SOCKET PANEL
io.on("connection", (socket) => {
  console.log("Panel connecté");

  // envoyer message depuis site
  socket.on("sendMessage", async (data) => {
    if (!global.sock) return;

    await global.sock.sendMessage(
      data.number + "@s.whatsapp.net",
      { text: data.text }
    );
  });

  // démarrer bot (optionnel)
  socket.on("startBot", async () => {
    console.log("Start demandé depuis panel");
  });
});

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        console.log(`${config.botName} startup`);

        loadPlugins();

        // 🔥 IMPORTANT: expose ton bot globalement
        global.sock = await connectToWhatsApp();

        server.listen(PORT, () => {
            console.log("🌐 Serveur actif sur port " + PORT);
        });

    } catch (e) {
        console.error("Erreur critique:", e);
    }
}

start();
