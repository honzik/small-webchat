import './App.css';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

const URL = 'ws://localhost:8080';

function App() {
  
  const [connected, setConnected] = useState(false);
  const [nickname, setNickname] = useState('');
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  console.log(messages);

  // connect to ws
  useEffect(() => {
    // open WS
    ws.current = new WebSocket(URL);
    // handle open
    ws.current.onopen = () => setConnected(true);
    // handle incoming messages
    ws.current.onmessage = event => {
      // decompress message
      const msg = JSON.parse(event.data)    
      console.log(msg);
      // what kind of message?
      if(msg.ack) {
        // ack only - store nick
        setNickname(msg.nickname);        
      } else {
        // new message - store it in messages
        setMessages( arr => [...arr, msg ] );
      }
    }
    return () => {
      ws.current.close();
    }
  }, []);

  // handler for the sending
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {  
      // store the value
      const msg = event.target.value;

      // send the message      
      ws.current.send(msg);

      // clear the field      
      event.target.value = '';
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webchat</h1>
        
        { connected ? (

          <div className="App-chat">
            <p>Connected with nickname <em>{nickname}</em></p>
            <pre>
              {messages.map( (msg,i) => 
                <p key={i} className={classNames({
                  'me': msg.nickname === nickname,
                  'server': msg.nickname === "SERVER"
                })}>
                  [{msg.nickname}] {msg.message}
                </p>
              )}
            </pre>
            <label for="chatinput">
              {nickname}:
              <input 
                type="text" 
                name="chatinput" 
                placeholder="type something..." 
                onKeyDown={handleKeyDown} 
              />
            </label>
            
          </div>
        
        ) : (
        
          <div>
            Connecting to server...
          </div>
        
        )}

      </header>
    </div>
  );
}

export default App;
