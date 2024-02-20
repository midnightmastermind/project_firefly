// slices/chatMessageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ChatMessageService from 'services/chat/chat_message.service';

export const getAllChatMessages = createAsyncThunk('chatMessage/getAll', async (_, thunkAPI) => {
  try {
    const response = await ChatMessageService.getAllChatMessages();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getChatMessage = createAsyncThunk('chatMessage/get', async ({ id }, thunkAPI) => {
  try {
    const response = await ChatMessageService.getChatMessage(id);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createChatMessage = createAsyncThunk('chatMessage/create', async ({ data }, thunkAPI) => {
  try {
    const response = await ChatMessageService.createChatMessage({ data });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateChatMessage = createAsyncThunk(
  'chatMessage/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await ChatMessageService.updateChatMessage(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeChatMessage = createAsyncThunk('chatMessage/remove', async ({ id }, thunkAPI) => {
  try {
    const response = await ChatMessageService.removeChatMessage(id);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeAllChatMessages = createAsyncThunk('chatMessage/removeAll', async (_, thunkAPI) => {
  try {
    const response = await ChatMessageService.removeAllChatMessages();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  chatMessages: null,
  fetched: false,
  fetching: false,
};

const chatMessageSlice = createSlice({
  name: 'chatMessage',
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(getAllChatMessages.fulfilled, (state, action) => {
        state.chatMessages = action.payload;
        state.fetching = false;
        state.fetched = true;
      })
      .addCase(getAllChatMessages.rejected, (state) => {
        state.chatMessages = [];
        state.fetching = false;
        state.fetched = true;
      })
      .addCase(getAllChatMessages.pending, (state) => {
        state.fetching = true;
        state.fetched = false;
      })
      .addCase(getChatMessage.fulfilled, (state, action) => {
        // Handle successful get action if needed
      })
      .addCase(updateChatMessage.fulfilled, (state, action) => {
        // Handle successful update action if needed
      })
      .addCase(createChatMessage.fulfilled, (state, action) => {
        // Handle successful create action if needed
        state.chatMessages.push(action.payload);
      })
      .addCase(removeChatMessage.fulfilled, (state, action) => {
        // Handle successful remove action if needed
      });
  },
});

const { reducer } = chatMessageSlice;
export default reducer;
