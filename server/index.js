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
/* @TODO define sendData function */

// Send to all wrapper
/* @TODO define sendToAll function */

// On connection, do
wss.on("connection", (ws) => {
        
    /* @TODO add init logic here:

        - generate new nickname
        - add it to clients list
        - send ACK to client { ack: true, nickname }
        - send a notification to all clients that nickname connected
        - add handler for incoming message from this client
        - console log client added and client count
    
    */

    // Leaving chat
    ws.on('close', () => {      
        /* @TODO add remove logic here:

            - move client out of clientList
            - notify all clients he left
            - console log client gone and clients count

        */          
    });
});
