import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessages } from './chatSlice';

const ChatBox = () => {
  const messages = useSelector(selectMessages);

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index}>
        <p>{message.sender}: {message.message}</p>
      </div>
    ));
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      width: '300px',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      padding: '10px',
      maxHeight: '400px',
      overflowY: 'auto',
    }}>
      {renderMessages()}
    </div>
  );
};

export default ChatBox;
