// ChatComponent.js
import React, { useEffect, useState } from 'react';
import { ChatProvider, AutoDraft } from "@chatscope/use-chat";
import { useDispatch, useSelector } from 'react-redux';
// import { initWebSocket } from 'slices/chat/chat';
import ChatService from 'services/chat/chat.service';
import { nanoid } from "nanoid";
import ChatWindow from './ChatWindow';
import { Popover, Button } from "@blueprintjs/core";
import {
  BasicStorage,
  ChatMessage,
  Conversation,
  MessageContentType,
  ConversationRole,
  Participant,
  Presence,
  TypingUsersList,
  UpdateState,
  User,
  UserStatus,
} from "@chatscope/use-chat";

const serviceFactory = (storage, updateState) => {
  return new ChatService(storage, updateState);
};
const messageIdGenerator = (message) => nanoid();
const groupIdGenerator = () => nanoid();

const ChatComponent = () => {
  const dispatch = useDispatch();
  const className = "user-window-1"
  const { user: currentUser } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user.users);
  const chat_messages = useSelector((state) => state.chat.chat_messages);
  const conversations = useSelector((state) => state.chat.chat);

  const basicStorage = new BasicStorage({
    groupIdGenerator,
    messageIdGenerator,
  });

  const [chatUser, setChatUser] = useState(null);
  const [storage, setStorage] = useState(basicStorage);

  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  const togglePopover = () => {
    //   storage.triggerUpdate();
    setPopoverIsOpen(prevIsOpen => !prevIsOpen);
  };

  React.useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      const newChatUser = new User({
        id: currentUser.id,
        presence: new Presence({
          status: true,
          description: "",
        }),
        username: currentUser.username,
        avatar: currentUser.profile_image,
      });
      // Add the user to the storage when the component mounts
      //storage.addUser(newChatUser);

      setChatUser(newChatUser);


    }
  }, [currentUser]);


  React.useEffect(() => {
    if (users) {
      users.forEach(user => {
        // 
        
        // if (user._id == currentUser.id) {
        storage.addUser(new User({
          id: user._id,
          presence: new Presence({
            status: true,
            description: "",
          }),
          username: user.username,
          avatar: user.profile_image,
        }));
        // }
      });
    }
  }, [users]);

  React.useEffect(() => {
    if (conversations) {
      conversations.forEach(conversation => {
        delete conversation.typingUsers;
        storage.addConversation(new Conversation({ ...conversation }));
        dispatch({ type: 'server/fetchChatMessages', data: conversation.id });

        // if (conversation.messages) {
        //   conversation.messages.forEach(message => {
        //     const isDuplicate = isMessageIdDuplicate(storage.getState().messages, conversation.id, message.id);
        //     
        //     
        //     if (!isDuplicate) {
        //       const direction = message.senderId === currentUser.id ? 'outgoing' : 'incoming';
        //       
        //       storage.addMessage(new ChatMessage({...message, direction}), conversation.id);
        //     }
        //   })
        // }
      })
      // }
    }
  }, [conversations]);

  const isMessageIdDuplicate = (obj, key, messageId) => {
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
  React.useEffect(() => {

    if (currentUser && chat_messages) {
      chat_messages.forEach(chat_message => {
        // if (!(storage.getConversation(conversation.id)[0])) {

        const isDuplicate = isMessageIdDuplicate(storage.getState().messages, chat_message.conversationId, chat_message.id);
        
        if (!isDuplicate) {
          const direction = chat_message.senderId === currentUser.id ? 'outgoing' : 'incoming';
          
          storage.addMessage(new ChatMessage({ ...chat_message, direction }), chat_message.conversationId);
        }

        // }
      });
    }

  }, [chat_messages, currentUser]);


  
  // useEffect(() => {
  //   dispatch(initWebSocket());
  // }, [dispatch]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }} className="chat-component-container">

      <div key={`${className}-container`}>
        <ChatProvider
          serviceFactory={serviceFactory}
          storage={storage}
          config={{
            typingThrottleTime: 250,
            typingDebounceTime: 900,
            debounceTyping: true,
            autoDraft: AutoDraft.Save | AutoDraft.Restore,
          }}
          initialState={storage}
        >
          <Button key={`${className}-button`} className={`${className}-button chat-button`} onClick={(e) => togglePopover(e)} icon="chat" />
          <Popover isOpen={popoverIsOpen} key={`${className}-popover`} className={`${className}-popover chat-button`} position="auto" content={
            <div className="chat-component"><ChatWindow user={chatUser} users={users} /></div>}
          >
            <div className="testeroo" style={{ width: '0', height: '0', overflow: 'hidden' }}></div>

          </Popover>
        </ChatProvider>
      </div>
    </div>
  );
};

export default ChatComponent;
