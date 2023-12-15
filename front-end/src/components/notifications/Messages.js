
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
    const message = useSelector((state) => state.message);
    const [currentMessage, setCurrentMessage] = useState(null);
  
    useEffect(() => {
      if (message) {
        setCurrentMessage(message);
        const timer = setTimeout(() => {
          setCurrentMessage(null);
        }, 5000); // Adjust the timeout as needed
  
        return () => clearTimeout(timer);
      }
    }, [message]);
  
    const messageStyle = {
      display: currentMessage ? 'block' : 'none',
      border: '1px solid black',
      padding: '10px',
      color: currentMessage?.type === 'error' ? 'red' : 'green',
    };
  
    return (
      <div style={messageStyle}>
        {currentMessage && currentMessage.message}
      </div>
    );
  };
  
  export default Messages;