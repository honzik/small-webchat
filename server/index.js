const WebSocket = require('ws');

// Init websockets server
const wss = new WebSocket.Server({ port: 8080 });
console.log("Websockets server ready on localhost:8080");

// On connection, do
wss.on("connection", function connection(ws) {
    
    // Send we need to identify 
    ws.send("IDENTIFY");
    console.log("Incoming connection, identification requested");

    let identified = false;

    ws.on('message', function incoming(message) { 
        // do something    
    }); 

});
