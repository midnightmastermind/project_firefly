// ChatConversation.jsx
import React from 'react';
import ChatMessage from './ChatMessage';

const ChatConversation = ({ conversation }) => {
  return (
    <div className="chat-conversation">
      {conversation.messages.map((message) => (
        <ChatMessage key={message._id} message={message} />
      ))}
    </div>
  );
};

export default ChatConversation;