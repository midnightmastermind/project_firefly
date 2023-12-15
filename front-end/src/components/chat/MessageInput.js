import React, { useState } from 'react';

const MessageInput = ({ onSubmitMessage }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    onSubmitMessage(message);
    setMessage('');
  };

  return (
    <div>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default MessageInput;
