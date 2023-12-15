import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessages } from './chatSlice';

const Inbox = () => {
  const messages = useSelector(selectMessages);

  const unreadMessages = messages.filter(message => !message.read);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: '10px', right: '10px', backgroundColor: 'red', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {unreadMessages.length}
      </div>
      <div style={{ position: 'fixed', bottom: '10px', right: '10px', width: '300px', backgroundColor: 'white', border: '1px solid #ddd', padding: '10px', maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <p>{message.sender}: {message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
