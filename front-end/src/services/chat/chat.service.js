import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import socket from 'common/socketConfig';
import { ChatMessage, Conversation } from '@chatscope/use-chat';

class ChatService {
  constructor(storage, update) {
    this.storage = storage;
    this.updateState = update;
    this.socket = socket; // Replace with your actual server URL
    // this.socket.on('message', (data) => {
    //   onSocketEvent({ type: 'message', ...data });
    // });


    // this.socket.on('typing', (data) => {
    //   onSocketEvent({ type: 'typing', ...data });
    // });

    // this.socket.on('conversation', (data) => {
    //   onSocketEvent({ type: 'conversation', ...data });
    // });
    // this.socket.on('message', (data) => {
    //   this.dispatch(messageReceived(data));
    // });

    // this.socket.on('typing', (data) => {
    //   this.dispatch(typing(data));
    // });

    // this.socket.on('conversation', (data) => {
    //   this.dispatch(conversation(data));
    // });

    // // Add other socket event listeners here...
    this.socket.on('action', (data) => {      
      if (data.type === 'server/receive_message') {
        
        this.onMessage(data.data);
        
      }
    });


    this.eventHandlers = {
      onMessage: () => { },
      onConnectionStateChanged: () => { },
      onUserConnected: () => { },
      onUserDisconnected: () => { },
      onUserPresenceChanged: () => { },
      onUserTyping: () => { },
      onConversationUpdated: () => { },
    };
  }


  onMessage(data) {
    
    // Call the event handler
    const conversation = data.conversation;
    const new_message = new ChatMessage(data.new_message);

    if (!this.storage.conversationExists(conversation.id)) {
      this.storage.addConversation(new Conversation({...conversation, typingUsers: undefined}));
    }
    
    this.eventHandlers.onMessage({ message: new_message, conversationId: conversation.id });
    
  }

  isMessageIdDuplicate = (obj, key, messageId) => {
    // Check if the key exists in the object
    if (obj.hasOwnProperty(key)) {
      // Retrieve all iterations of the "messages" array for the specified key
      const allMessagesArrays = obj[key].map(iteration => iteration.messages);

      // Flatten the arrays into a single array of messages
      const allMessages = [].concat(...allMessagesArrays);

      // Check if the messageId already exists in the array
      const isDuplicate = allMessages.some(message => message.id === messageId);

      return isDuplicate;
    } else {
      // Key not found in the object
      return false;
    }
  }

  // fetchChats() {
  //   this.socket.emit('server/fetchChats', {});
  // }

  // onChatsFetched(callback) {
  //   this.socket.on('chatsFetched', (chats) => {
  //     callback({ type: 'chat/fetchChats', chats });
  //   });
  // }

  sendMessage({ message, conversationId, recipientId }) {

    // this.socket.emit('action', { type: 'server/sendMessage', data: { message, conversationId } });
    this.socket.emit('action', { type: 'server/newMessage', data: { message, conversationId } });

  }

  // sendTyping({ isTyping, content, conversationId, userId }) {
  //   this.socket.emit('typing', { isTyping, content, conversationId, userId });
  // }

  on(evtType, evtHandler) {
    const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;
    if (key in this.eventHandlers) {
      this.eventHandlers[key] = evtHandler;
    }
  }

  off(evtType, eventHandler) {
    const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;
    if (key in this.eventHandlers) {
      this.eventHandlers[key] = () => { };
    }
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
}
export default ChatService;




// // Usage
// const chatService = new ExampleChatService(/* provide storage and update parameters */);

// // Register callbacks
// chatService.onMessage((event) => {
//   
//   // Handle the received message
// });

// chatService.onUserTyping((event) => {
//   
//   // Handle user typing indication
// });

// // Simulate sending a message
// chatService.sendMessage({ message: 'Hello, world!', conversationId: 'exampleConversation' });

// // Simulate sending typing indication
// chatService.sendTyping({ isTyping: true, content: 'typing...', conversationId: 'exampleConversation', userId: 'exampleUser' });



// const { EventEmitter } = require('events');

// class ExampleChatService extends EventEmitter {
//   constructor(storage, update) {
//     super();
//     this.storage = storage;
//     this.updateState = update;

//     // For communication, we use EventEmitter to emit and listen for events.
//     // In a real application, instead of adding a listener to the object,
//     // you will implement here receiving data from your chat server.

//     // Example: Handling the 'message' event
//     this.on('message', (detail) => {
//       const message = detail.message;
//       message.direction = MessageDirection.Incoming;
//       const { conversationId } = detail;
//       if (detail.sender !== this) {
//         this.emit('onMessage', new MessageEvent({ message, conversationId }));
//       }
//     });

//     // Example: Handling the 'typing' event
//     this.on('typing', (detail) => {
//       const { userId, isTyping, conversationId, content, sender } = detail;
//       if (sender !== this) {
//         this.emit('onUserTyping', new UserTypingEvent({ userId, isTyping, conversationId, content }));
//       }
//     });
//   }

//   sendMessage({ message, conversationId }) {
//     // Simulate sending messages to your chat server
//     this.emit('message', { type: 'message', message, conversationId, sender: this });

//     return message;
//   }

//   sendTyping({ isTyping, content, conversationId, userId }) {
//     // Simulate sending typing indication to your chat server
//     this.emit('typing', { type: 'typing', isTyping, content, conversationId, userId, sender: this });
//   }

//   // Additional methods for dynamic callback registration and unregistration
//   onMessage(callback) {
//     this.on('onMessage', callback);
//   }

//   onUserTyping(callback) {
//     this.on('onUserTyping', callback);
//   }

//   offMessage(callback) {
//     this.off('onMessage', callback);
//   }

//   offUserTyping(callback) {
//     this.off('onUserTyping', callback);
//   }
// }

// // Usage
// const chatService = new ExampleChatService(/* provide storage and update parameters */);

// // Register callbacks
// chatService.onMessage((event) => {
//   
//   // Handle the received message
// });

// chatService.onUserTyping((event) => {
//   
//   // Handle user typing indication
// });

// // Simulate sending a message
// chatService.sendMessage({ message: 'Hello, world!', conversationId: 'exampleConversation' });

// // Simulate sending typing indication
// chatService.sendTyping({ isTyping: true, content: 'typing...', conversationId: 'exampleConversation', userId: 'exampleUser' });
