// import { createSlice } from '@reduxjs/toolkit';
// import { socketIOActionTypes } from 'redux-socket.io-client'; // Import socketIOActionTypes from 'redux-socket.io'

// const initialState = {
//   chat: null,
//   conversations: null,
//   fetching: false,
//   fetched: false,
// };

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     // Add other reducers if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(socketIOActionTypes('CHAT_FETCH_CHATS'), (state, action) => {
//         // Handle the 'fetchChats' event here
//         state.conversations = action.payload;
//         state.fetched = true;
//         state.fetching = false;
//       });
//   },
// });

// export const { fetchChats } = chatSlice.actions;
// export default chatSlice.reducer;
function chatReducer(state = {}, action) {
  switch (action.type) {
    case 'get_chats':
      return Object.assign({...state}, { chat: action.data });
    // case 'get_messeges':
    //   return Object.assign({...state}, { chat_messages: action.data });
    case 'send_message':
      // const messages = [...state.chat];
      // console.log(messages);
      // messages.push(action.data);
      return state;
      // console.log(messages);
      // console.log(Object.assign({...state}, { chat_messages: messages }));
      // return Object.assign({...state}, { chat_messages: messages });
      //return Object.assign({}, {  messages: action.data });
    case 'get_messages':
      return Object.assign({...state}, { chat_messages: action.data });

      // Assume action.data contains the full chat object
      // const updatedChats = state.chat.map(chat =>
      //   chat.id === action.data.id ? action.data : chat
      // );
      // return { ...state, chat: updatedChats };
    // case 'create_chat':
    //   return state;
      // return Object.assign({}, { chat: [...state.chat, action.data ]});
    default:
      return state;
  }
}

export default chatReducer;

