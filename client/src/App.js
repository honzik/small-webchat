import './App.css';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

const URL = 'ws://localhost:8080';

function App() {
  
  /* @TODO define states here: connected, messages, nickname */ 

  const ws = useRef(null);

  // connect to ws
  useEffect(() => {
    // open WS
    ws.current = new WebSocket(URL);    
    
    /* @TODO define: onopen, onmessage handlers */ 

    // on component unmount
    return () => {
      ws.current.close();
    }
  }, []);

  // handler for the sending
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {  
      // store the value
      const msg = event.target.value;

      /* @TODO message sending */       

      // clear the field      
      event.target.value = '';
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webchat</h1>
        {/* Render the chat based on above states */}
      </header>
    </div>
  );
}

export default App;
