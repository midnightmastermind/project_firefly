const Chat = require('../models/chat.model');
// const socketIo = require('socket.io');
// const httpServer = require('http').createServer();

// Create an object to store connected sockets

const createConversation = async (participants) => {
  // Implement your logic to create a new conversation document
  const newConversation = new Chat({
    participants,
    messages: [], // Initialize with an empty array of messages
  });

  // Save the new conversation to the database
  await newConversation.save();

  return newConversation;
};

// Handle Socket.IO events
const handleSocketEvents = (socket) => {
  // Listen for a 'message' event
  socket.on('message', async ({ message, conversationId }) => {
    try {
      // Implement logic to save the message to the chat
      const chat = await Chat.findById(conversationId);

      if (!chat) {
        return socket.emit('errorMessage', { message: 'Chat not found' });
      }

      chat.messages.push(message);
      await chat.save();

      // Broadcast the updated chat state to all connected clients
      io.emit('chatUpdated', chat);
    } catch (error) {
      // Handle errors more explicitly
      console.error(error);
      socket.emit('errorMessage', { message: 'Internal server error' });
    }
  });

  // Listen for a 'fetchChat' event
  socket.on('fetchChat', async () => {
    try {
      // Implement logic to fetch the chat state
      const chat = await Chat.findOne();

      if (!chat) {
        return socket.emit('errorMessage', { message: 'Chat not found' });
      }

      // Respond with the chat state
      socket.emit('chatUpdated', chat);
    } catch (error) {
      // Handle errors more explicitly
      console.error(error);
      socket.emit('errorMessage', { message: 'Internal server error' });
    }
  });

  // Listen for a 'createConversation' event
  socket.on('createConversation', async ({ participants }) => {
    try {
      console.log(participants);
      // Implement logic to create a new conversation
      const newConversation = createConversation(participants);
      // Broadcast the new conversation to all connected clients
      io.emit('conversation', newConversation);
    } catch (error) {
      // Handle errors more explicitly
      console.error(error);
      socket.emit('errorMessage', { message: 'Internal server error' });
    }
  });

     // Listen for a 'fetchChat' event
  socket.on('fetchChats', async () => {
    console.log("hit");
    try {
      // // Implement logic to fetch the chat state
      // const chats = await Chat.find();

      // if (!chats) {
      //   return socket.emit('errorMessage', { message: 'Chat not found' });
      // }
      const chat1 = {
        unreadCounter: 0,
        description: '',
        draft: '',
        readonly: false,
        id: 'dM9jyIxHH7eu9LIoC2Jql',
        participants: [
          {
            id: '647cdc13f0323909dbddb183',
            role: {
              permissions: [],
            },
          },
          {
            id: '646e5b5addf6c83f54e84343',
            role: {
              permissions: [],
            },
          },
        ],
        typingUsers: {
          items: [],
        },
      };
  

      // Respond with the chat state
      socket.emit('chatsFetched', [chat1]);
    } catch (error) {
      // Handle errors more explicitly
      console.error(error);
      socket.emit('errorMessage', { message: 'Internal server error' });
    }
  });
  // Add more event handlers as needed
};

module.exports = handleSocketEvents;