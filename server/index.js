const WebSocket = require('ws');
const { uniqueNamesGenerator, starWars } = require('unique-names-generator');

// Obtain unique nickname
const characterName = () => uniqueNamesGenerator({ dictionaries: [starWars] });

// encode object as JSON string
const objectEncode = object => JSON.stringify(object);


// Init websockets server
const wss = new WebSocket.Server({ port: 8080 });
console.log("Websockets server ready on localhost:8080");

// List of all clients array
const clientList = [];

// Send data wrapper
const sendData = (ws, specObject) => {
    ws.send(objectEncode(specObject));
}

// Send to all wrapper
const sendToAll = (specObject) => {
    clientList.forEach( client => sendData(client.ws, specObject));
}

// On connection, do
wss.on("connection", (ws) => {
    
    // Gen new nickname
    const nickname = characterName();    

    // Add to queue
    clientList.push({
        ws,
        nickname
    });
    
    // Ack to client
    sendData(ws, {
        nickname,
        ack: true
    });

    // Notify all that a new nickname joined
    sendToAll({
        nickname: "SERVER",
        message: `<${nickname}> has joined the chat`
    });

    // Messages transmitting
    ws.on('message', (message) => {             
        sendToAll({ nickname, message });
    }); 

    // Leaving chat
    ws.on('close', () => {        
        
        // Remove from queue
        const index = clientList.findIndex( (entry) => entry.nickname === nickname );        
        if(index > -1) {
            clientList.splice(index, 1);
        }

        // Notify all that nickname lest
        sendToAll({
            nickname: "SERVER",
            message: `[${nickname}] has left the chat`
        });    

        console.log(`Connection closed by: <${nickname}>, clients left: ${clientList.length}`);
    });

    console.log(`Incoming connection has obtained nickname: <${nickname}>, clients count: ${clientList.length}`);

});
