import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';

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
        setMessages( arr => [...arr, { nickname: msg.nickname, message: msg.message }] );
      }
    }
    return () => {
      ws.current.close();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webchat</h1>
        { connected ? (
          <div className="App-chat">
            <p>Connected with nickname <em>{nickname}</em></p>
            <pre>
              {messages.map( (msg,i) => 
                <p key={i}>
                  [{msg.nickname}] {msg.message}
                </p>
              )}
            </pre>
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
