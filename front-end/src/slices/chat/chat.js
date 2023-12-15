// redux/chatSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  conversations: [],
  activeConversation: null,
  // Add other chat-related state properties as needed
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    // Add other reducer functions as needed
  },
});

export const {
  setMessages,
  setConversations,
  setActiveConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
