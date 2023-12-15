import { createSlice } from '@reduxjs/toolkit';

const fileQueueSlice = createSlice({
  name: 'fileQueue',
  initialState: [],
  reducers: {
    addToQueue: (state, action) => {
      state.push(action.payload);
    },
    removeFromQueue: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToQueue, removeFromQueue } = fileQueueSlice.actions;
export default fileQueueSlice.reducer;