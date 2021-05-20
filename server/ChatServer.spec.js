const ChatServer = require('./ChatServer');

class WebSocketServerMock {
    constructor() {
        this.on = jest.fn((event, method) => {});
    }        
}

const wss = new WebSocketServerMock;

class WebSocketMock {
    constructor() {
        this.send = jest.fn((message) => {});
        this.on = jest.fn((event, method) => {})
    }
}

const ws = new WebSocketMock;


describe("ChatServer Test Suite", () => {

    beforeEach(()=>{
        wss.on.mockClear();        
        ws.on.mockClear();
        ws.send.mockClear();
    })

    test("inits properly", () => {
        const cs = new ChatServer(wss);        
        expect(cs.clientList.length).toEqual(0);
        expect(wss.on).toHaveBeenCalledTimes(1);
        expect(wss.on.mock.calls[0][0]).toEqual("connection");
        expect(typeof wss.on.mock.calls[0][1]).toEqual("function");
    });

    test("incoming connection handling", () => {
        const cs = new ChatServer(wss);
        
        // simulate connection
        cs.connectHandler(ws);        
        expect(cs.clientList.length).toEqual(1);
        expect(cs.clientList[0].nickname).toBeDefined();
        expect(cs.clientList[0].ws).toEqual(ws);
        expect(ws.on).toHaveBeenCalledTimes(2);        
        expect(ws.send).toHaveBeenCalledTimes(2);
    });
});