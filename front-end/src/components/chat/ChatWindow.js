// import React, { useMemo, useCallback, useEffect, useState } from "react";
// import { MainContainer, Sidebar, ConversationList, Conversation, Avatar, ChatContainer, ConversationHeader, MessageGroup, Message, MessageList, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
// import { useChat, ChatMessage, MessageContentType, MessageDirection, MessageStatus, User } from "@chatscope/use-chat";
// import { nanoid } from "nanoid";
// import { Button, Popover, Menu, MenuItem, Intent } from "@blueprintjs/core";
// import { useDispatch, useSelector } from 'react-redux';
// import useChat from './useChat'; 

// const ChatWindow = ({ user, conversations, chatMessages, onReceiveMessage }) => {
//   const {
//     currentMessages,
//     activeConversation,
//     setActiveConversation,
//     getUser,
//     currentMessage,
//     setCurrentMessage,
//     setCurrentUser,
//     sendTyping,
//     sendMessage,
//   } = useChat();

//   useEffect(() => {
//     setCurrentUser(user);
//   }, [user, setCurrentUser]);

//   const [currentUserAvatar, currentUserName] = useMemo(() => {
//     if (activeConversation) {
//       const participant = activeConversation.participants.length > 0
//         ? activeConversation.participants[0]
//         : undefined;

//       if (participant) {
//         const chatUser = getUser(participant.id);
//         if (chatUser) {
//           return [<Avatar src={chatUser.avatar} />, chatUser.username];
//         }
//       }
//     }

//     return [undefined, undefined];
//   }, [activeConversation, getUser]);

//   useEffect(() => {
//     const conversationWithLatestMessage = conversations.reduce(
//       (latest, current) =>
//         !latest ||
//         (current.lastMessage && current.lastMessage.createdAt > latest.lastMessage.createdAt)
//           ? current
//           : latest,
//       null
//     );

//     if (!activeConversation?.id && conversationWithLatestMessage?.id) {
//       setActiveConversation(conversationWithLatestMessage.id);
//     }
//   }, [conversations, chatMessages, activeConversation, setActiveConversation]);

//   const handleChange = (value) => {
//     setCurrentMessage(value);
//     if (activeConversation) {
//       sendTyping({
//         conversationId: activeConversation?.id,
//         isTyping: true,
//         userId: user.id,
//         content: value,
//         throttle: true,
//       });
//     }
//   };

//   const handleSend = (text) => {
//     const message = new ChatMessage({
//       id: "",
//       content: text,
//       contentType: MessageContentType.TextHtml,
//       senderId: selectedUser ? selectedUser.id : user.id,
//       direction: MessageDirection.Outgoing,
//       status: MessageStatus.Sent,
//     });

//     const conversationId = selectedUser ? activeConversation || nanoid() : activeConversation;

//     sendMessage({
//       message,
//       conversationId,
//       senderId: user.id,
//     });

//     // Simulate receiving the message for a demo
//     onReceiveMessage(message, conversationId);
//   };

//   const getTypingIndicator = useCallback(() => {
//     if (activeConversation) {
//       const typingUsers = activeConversation.typingUsers;

//       if (typingUsers.length > 0) {
//         const typingUserId = typingUsers.items[0].userId;

//         if (activeConversation.participantExists(typingUserId)) {
//           const typingUser = getUser(typingUserId);

//           if (typingUser) {
//             return <TypingIndicator content={`${typingUser.username} is typing`} />;
//           }
//         }
//       }
//     }

//     return undefined;
//   }, [activeConversation, getUser]);

//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleUserSelect = (user) => {
//     // Find existing conversation or create a new one
//     const existingConversation = conversations.find((c) =>
//       c.participants.some((participant) => participant.id === user.id)
//     );

//     if (existingConversation) {
//       setActiveConversation(existingConversation.id);
//     } else {
//       // Create a new conversation
//       const newConversationId = nanoid();
//       const newConversation = createConversation(newConversationId, user.id);

//       // Update the storage or dispatch an action to handle the new conversation
//       // For simplicity, let's assume you have a function `addConversation` in your storage
//       // and you need to dispatch an action `addConversation` to update Redux state
//       // storage.addConversation(newConversation);
//       // dispatch(addConversation(newConversation));

//       // For now, let's just update localStorage directly
//       localStorage.conversations.push(newConversation);
//       localStorage.chats.push(newConversation);

//       setActiveConversation(newConversationId);
//     }

//     setSelectedUser(null);
//   };

//   const userMenu = (
//     <Menu>
//       {users.map((user) => (
//         <MenuItem key={user.id} text={user.name} onClick={() => handleUserSelect(user)} />
//       ))}
//     </Menu>
//   );

//   return (
//     <MainContainer responsive>
//       <Sidebar position="left" scrollable>
//         <ConversationHeader>
//           <Avatar src={user.avatar} />
//           <ConversationHeader.Content>{user.username}</ConversationHeader.Content>
//         </ConversationHeader>
//         <ConversationList>
//           {conversations.map((c) => {
//             const [avatar, name] = (() => {
//               const participant = c.participants.length > 0 ? c.participants[0] : undefined;

//               if (participant) {
//                 const chatUser = getUser(participant.id);
//                 if (chatUser) {
//                   return [<Avatar src={chatUser.avatar} />, chatUser.username];
//                 }
//               }

//               return [undefined, undefined];
//             })();

//             return (
//               <Conversation
//                 key={c.id}
//                 name={name}
//                 info={c.draft ? `Draft: ${c.draft.replace(/<br>/g, "\n").replace(/&nbsp;/g, " ")}` : ``}
//                 active={activeConversation?.id === c.id}
//                 unreadCnt={c.unreadCounter}
//                 onClick={() => setActiveConversation(c.id)}
//               >
//                 {avatar}
//               </Conversation>
//             );
//           })}
//         </ConversationList>
//       </Sidebar>

//       <ChatContainer>
//         <Popover content={userMenu} position="bottom">
//           <Button text="Select User" intent={Intent.PRIMARY} />
//         </Popover>
//         {activeConversation && (
//           <ConversationHeader>
//             {currentUserAvatar}
//             <ConversationHeader.Content userName={currentUserName} />
//           </ConversationHeader>
//         )}
//         <MessageList typingIndicator={getTypingIndicator()}>
//           {activeConversation &&
//             currentMessages.map((g) => (
//               <MessageGroup key={g.id} direction={g.direction}>
//                 <MessageGroup.Messages>
//                   {g.messages.map((m) => (
//                     <Message
//                       key={m.id}
//                       model={{
//                         type: "html",
//                         payload: m.content,
//                         direction: m.direction,
//                         position: "normal",
//                       }}
//                     />
//                   ))}
//                 </MessageGroup.Messages>
//               </MessageGroup>
//             ))}
//         </MessageList>
//         <MessageInput
//           value={currentMessage}
//           onChange={handleChange}
//           onSend={handleSend}
//           disabled={!activeConversation}
//           attachButton={false}
//           placeholder="Type here..."
//         />
//       </ChatContainer>
//     </MainContainer>
//   );
// };

// export default ChatWindow;


// ChatWindow.js
import React, { useMemo, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { MainContainer, Sidebar, ConversationList, Conversation as ConversationComponent, Avatar, ChatContainer, ConversationHeader, MessageGroup, Message, MessageList, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { useChat, Presence, User, Conversation, TypingUsersList, Participant, ConversationRole, ChatMessage, MessageContentType, MessageDirection, MessageStatus } from "@chatscope/use-chat";
import { nanoid } from "nanoid";
import { Button, Popover, Menu, MenuItem, Intent } from "@blueprintjs/core";
import { fetchChats } from "slices/chat/chat";
import socket from "common/socketConfig";
// import { fetchChats } from "slices/chat/chat";
const ChatWindow = ({ user, users }) => {
  const {
    currentMessages,
    activeConversation,
    setActiveConversation,
    getUser,
    getUsers,
    currentMessage,
    setCurrentMessage,
    setCurrentUser,
    sendTyping,
    sendMessage,
    addConversation,
    onReceiveMessage,
    addUser,
    conversations,
    getState
  } = useChat();
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentUser(user);
  }, [user, setCurrentUser]);
  // useEffect(() => {
  //   // Example: Dispatch the fetchChats action when 'chatsFetched' event is received
  //   const chatsFetchedHandler = (chats) => {
  //     dispatch(fetchChats(chats));
  //   };

  //   // Attach the event handler to the socket
  //   socket.on('chatsFetched', chatsFetchedHandler);

  //   // Clean up the event handler on component unmount
  //   return () => {
  //     socket.off('chatsFetched', chatsFetchedHandler);
  //   };
  // }, [dispatch]);
  const [userList, setUserList] = useState([])
  const [currentUserAvatar, currentUserName] = useMemo(() => {
    if (activeConversation) {
      const participant = activeConversation.participants.find(part => part.id !== user.id);

      if (participant) {
        const chatUser = getUser(participant.id);
        if (chatUser) {
          return [<Avatar src={chatUser.avatar} />, chatUser.username];
        }
      }
    }

    return [undefined, undefined];
  }, [activeConversation, getUser]);

  useEffect(() => {
    
    const conversationWithLatestMessage = conversations.reduce(
      (latest, current) =>
        !latest ||
          (current.lastMessage && current.lastMessage.createdAt > latest.lastMessage.createdAt)
          ? current
          : latest,
      null
    );

    if (!activeConversation?.id && conversationWithLatestMessage?.id) {
      setActiveConversation(conversationWithLatestMessage.id);
    }

    
  }, [conversations, activeConversation, setActiveConversation]);
  useEffect(() => {
    
    const conversationWithLatestMessage = conversations.reduce(
      (latest, current) =>
        !latest ||
          (current.lastMessage && current.lastMessage.createdAt > latest.lastMessage.createdAt)
          ? current
          : latest,
      null
    );

    if (!activeConversation?.id && conversationWithLatestMessage?.id) {
      setActiveConversation(conversationWithLatestMessage.id);
    }
    setUserList(users);
    
  }, [users]);

  const handleChange = (value) => {
    setCurrentMessage(value);
    if (activeConversation) {
      sendTyping({
        conversationId: activeConversation?.id,
        isTyping: true,
        userId: user.id,
        content: value,
        throttle: true,
      });
    }
  };

  
  const handleSend = (text) => {
    const newMessageId = nanoid();

    const message = new ChatMessage({
      id: newMessageId,
      content: text,
      contentType: MessageContentType.TextHtml,
      senderId: user.id,
      direction: MessageDirection.Outgoing,
      status: MessageStatus.Sent
    });

    sendMessage({
      message,
      conversationId: activeConversation.id
    });

    // dispatch({
    //   type:'server/sendMessage', 
    //   data: {
    //     message,
    //     conversationId: conversation.id,
    //     senderId: user.id,
    // }});


    // Simulate receiving the message for a demo
    // onReceiveMessage(message, conversationId);
  };

  const getTypingIndicator = useCallback(() => {
    if (activeConversation) {
      const typingUsers = activeConversation.typingUsers;

      if (typingUsers.length > 0) {
        const typingUserId = typingUsers.items[0].userId;

        if (activeConversation.participantExists(typingUserId)) {
          const typingUser = getUser(typingUserId);

          if (typingUser) {
            return <TypingIndicator content={`${typingUser.username} is typing`} />;
          }
        }
      }
    }

    return undefined;
  }, [activeConversation, getUser]);

  const [selectedUser, setSelectedUser] = useState(null);

  const createConversation = (id, participant) => {
    // let chatUser = getUser(participant._id);
    // if (!chatUser) {
    //   chatUser = new User({
    //     id: participant._id,
    //     presence: new Presence({
    //       status: true,
    //       description: "",
    //     }),
    //     username: participant.username,
    //     avatar: participant.profile_image,
    //   });
    //   addUser(chatUser)
    // }

    const participants = [
      new Participant({
          id: participant._id,
          role: new ConversationRole([]),
      }),
      new Participant({
        id: user.id,
        role: new ConversationRole([]),
    }),
  ];
    return new Conversation({
        id,
        participants,
        unreadCounter: 0,
        typingUsers: new TypingUsersList({ items: [] }),
        draft: "",
    });
  }
  const handleUserSelect = (selected_user) => {
    
    // Find existing conversation or create a new one
    const existingConversation = conversations.find((c) =>
      c.participants.some((participant) => participant.id === selected_user._id)
    );

    
    if (existingConversation) {
      setActiveConversation(existingConversation.id);
    } else {
      // Create a new conversation
      const newConversationId = nanoid();
      
      const newConversation = createConversation( newConversationId, selected_user);
      
      // socket.emit('createConversation', newConversation);

      dispatch({type:'server/createChat', data: newConversation});
      addConversation(newConversation)
      // Update the storage or dispatch an action to handle the new conversation
      // For simplicity, let's assume you have a function `addConversation` in your storage
      // and you need to dispatch an action `addConversation` to update Redux state
      // storage.addConversation(newConversation);
      // dispatch(addConversation(newConversation));

      // For now, let's just update localStorage directly
      // localStorage.chats.push(newConversation);

      setActiveConversation(newConversationId);
    }

    const updatedUserList = userList.filter(user => user.id !== selectedUser.id);
    setSelectedUser(null);
  };
  
  
  
  const userMenu = (
    <Menu className="chat-user-selection">
      {users && users.map((u) => (
        u._id !== user.id && <MenuItem key={u._id} text={`${u.first_name} ${u.last_name}`} onClick={() => handleUserSelect(u)} />
      ))}
    </Menu>
  );
  console.log(user);
  return (
    <MainContainer responsive>
      <Sidebar position="left" scrollable>
        {user && <ConversationHeader>
          <Avatar src={user.avatar} />
          <ConversationHeader.Content>{user.username}</ConversationHeader.Content>
        </ConversationHeader>
        }
        <Popover content={userMenu} position="bottom">
          <Button icon="plus" text="New" intent={Intent.PRIMARY} />
        </Popover>
        <ConversationList>
          {conversations && conversations.map((c) => {
            const [avatar, name] = (() => {
              //const participant = c.participants.length > 0 ? c.participants[0] : undefined;
              const participant = c.participants.find(part => part.id !== user.id);
              
              if (participant) {
                const chatUser = getUser(participant.id);
                
                if (chatUser) {
                  return [<Avatar src={chatUser.avatar} />, chatUser.username];
                }
              }

              return [undefined, undefined];
            })();

            return (
              <ConversationComponent
                key={c.id}
                name={name}
                info={c.draft ? `Draft: ${c.draft.replace(/<br>/g, "\n").replace(/&nbsp;/g, " ")}` : ``}
                active={activeConversation?.id === c.id}
                unreadCnt={c.unreadCounter}
                onClick={() => setActiveConversation(c.id)}
              >
                {avatar}
              </ConversationComponent>
            );
          })}
        </ConversationList>
      </Sidebar>

      <ChatContainer>
        {activeConversation && (
          <ConversationHeader>
            {currentUserAvatar}
            <ConversationHeader.Content userName={currentUserName} />
          </ConversationHeader>
        )}
        <MessageList typingIndicator={getTypingIndicator()}>
          {activeConversation &&
            currentMessages.map((g) => (
              <MessageGroup key={g.id} direction={g.direction}>
                <MessageGroup.Messages>
                  {g.messages.map((m) => (
                    <Message
                      key={m.id}
                      model={{
                        type: "html",
                        payload: m.content,
                        direction: m.direction,
                        position: "normal",
                      }}
                    />
                  ))}
                </MessageGroup.Messages>
              </MessageGroup>
            ))}
        </MessageList>
        <MessageInput
          value={currentMessage}
          onChange={handleChange}
          onSend={handleSend}
          disabled={!activeConversation}
          attachButton={false}
          placeholder="Type here..."
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatWindow;
