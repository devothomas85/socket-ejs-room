const socket = io();
const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

if (messageForm != null) {
  const name = prompt("What is your name ?");
  appendMessage("You Joined");
  socket.emit("new-user", roomName, name);

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You : ${message}`);
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
  });
}

socket.on("/room-created", (room) => {
  /*
    <div><%= room %></div>
      <a href="/<% room %>">Join</a>
  */
  const roomElement = document.createElement("div");
  roomElement.innerText = room;
  const roomLink = document.createElement("a");
  roomLink.href = `/${room}`;
  // roomLink.innerText = "join";
  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
});

socket.on("chat-message", (data) => {
  appendMessage(data);
});

socket.on("user-connected", (name) => {
  name.message = `${name} connected`;
  console.log(name, "++++");
  appendMessage(name);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

function appendMessage(message) {
  //console.log(message);
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `<p class="meta">${message.name} <span></span></p>
  <p class="text">
    ${message.message}
  </p>`;
  messageContainer.append(messageElement);
}
