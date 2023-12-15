import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
    name: 'message',
    initialState: '',
    reducers: {
      setMessage: (state, action) => {
        state = action.payload;
      },
    },
  });
  
  export const { setMessage } = messageSlice.actions;
  
  export default messageSlice.reducer;
  