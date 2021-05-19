const ChatServer = require('./ChatServer');

class WebSocketServerMock {
    constructor() {
        this.on = jest.fn((event, method) => {});
    }        
}

const wss = new WebSocketServerMock;


describe("ChatServer Test Suite", () => {

    beforeEach(()=>{
        wss.on.mockClear();        
    })

    test("inits properly", () => {
        const cs = new ChatServer(wss);
        const onMock = wss.on;
        expect(cs.clientList.length).toEqual(0);
        expect(onMock).toHaveBeenCalledTimes(1);
        expect(onMock.mock.calls[0][0]).toEqual("connection");
        expect(typeof onMock.mock.calls[0][1]).toEqual("function");
    });

    

});