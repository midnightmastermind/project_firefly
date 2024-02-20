// ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.direction}`}>
      <span className="message-content">{message.content}</span>
    </div>
  );
};

export default ChatMessage;
