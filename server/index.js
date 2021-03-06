const WebSocket = require('ws');
const ChatServer = require('./ChatServer');

// Init websockets server
const wss = new WebSocket.Server({ port: 8080 });
console.log("Websockets server ready on localhost:8080");

// Run the chat server
const cs = new ChatServer(wss);

