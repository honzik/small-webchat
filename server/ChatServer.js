const { uniqueNamesGenerator, starWars } = require('unique-names-generator');

// Obtain unique nickname
const characterName = () => uniqueNamesGenerator({ dictionaries: [starWars] });

// encode object as JSON string
const objectEncode = object => JSON.stringify(object);

class ChatServer {    
    /**
     * @param object WebSockets instance 
     */
    constructor(wss) {        
        this.wss = wss;   
        this.clientList = [];
        this.wss.on("connection", ( ws ) => {
            this.connectHandler( ws );
        });           
    }

    /**
     * Send message to all clients
     * @param object messageObject - contains properties message and nickname
     * @return none
     */
    sendToAll( messageObject )  {        
        this.clientList.forEach( client => this.sendTo(client.ws, messageObject));
    }

    /**
     * Send message to one client
     * @param object ws - websockets handle of this client
     * @param object messageObject - contains properties message and nickname
     * @return none
     */
    sendTo( ws, messageObject )  {
        ws.send(objectEncode(messageObject));
    }

    /**
     * Connect handler, is called for every new connection
     * @param object ws - websockets handle of this client
     * @return none
     */
    connectHandler( ws ) {
        // Gen new nickname
        const nickname = characterName();
                
        // Add to queue
        this.clientList.push({
            ws,
            nickname
        });

        // Ack to client
        this.sendTo(ws, {
            nickname,
            ack: true
        });

        // Notify all that a new nickname joined
        this.sendToAll({
            nickname: "SERVER",
            message: `<${nickname}> has joined the chat`
        });

        // Messages transmitting
        ws.on('message', (message) => {             
            this.sendToAll({ nickname, message });
        });

        // Leaving chat
        ws.on('close', () => {                    
            // Remove from queue
            const index = this.clientList.findIndex( (entry) => entry.nickname === nickname );        
            if(index > -1) {
                this.clientList.splice(index, 1);
            }

            // Notify all that nickname lest
            this.sendToAll({
                nickname: "SERVER",
                message: `[${nickname}] has left the chat`
            });    

            console.log(`Connection closed by: <${nickname}>, clients left: ${this.clientList.length}`);
        });

        console.log(`Incoming connection has obtained nickname: <${nickname}>, clients count: ${this.clientList.length}`);
    }
};

module.exports = ChatServer;