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
     * @param object messageObject - contains properties 
     *                  message:string or ack:bool 
     *                  nickname:string
     * @return none
     */
    sendToAll( messageObject )  {        
        /* @TODO define this function */
    }

    /**
     * Send message to one client
     * @param object ws - websockets handle of this client
     * @param object messageObject - contains properties 
     *                  message:string or ack:bool 
     *                  nickname:string
     * @return none
     */
    sendTo( ws, messageObject )  {
        /* @TODO define this function */
    }

    /**
     * Connect handler, is called for every new connection
     * @param object ws - websockets handle of this client
     * @return none
     */
    connectHandler( ws ) {
        
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

        
    }
};

module.exports = ChatServer;