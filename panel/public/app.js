const socket = io();

function startBot(){
  socket.emit("startBot");
  document.getElementById("status").innerHTML = "Starting...";
}

socket.on("qr", (qr)=>{
  document.getElementById("qr").innerHTML =
    `<img src="${qr}" style="width:200px">`;
});

socket.on("ready", ()=>{
  document.getElementById("status").innerHTML = "✅ Bot Connected";
  document.getElementById("qr").innerHTML = "";
});

function send(){
  socket.emit("sendMessage", {
    number: document.getElementById("num").value,
    text: document.getElementById("msg").value
  });
}
