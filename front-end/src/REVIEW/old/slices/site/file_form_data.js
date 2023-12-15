import { createSlice } from '@reduxjs/toolkit';

const fileFormDataSlice = createSlice({
  name: 'fileFormData',
  initialState: [],
  reducers: {
    addFormData: (state, action) => {
      state.push(action.payload);
    },
    updateFormDataStatus: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state[index].status = action.payload.status;
      }
    },
    updateFileUrl: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        const fileIndex = state[index].files.findIndex(
          (file) => file.localUrl === action.payload.localUrl
        );
        if (fileIndex >= 0) {
          state[index].files[fileIndex].url = action.payload.url;
        }
      }
    },
  },
});

export const { addFormData, updateFormDataStatus, updateFileUrl } = fileFormDataSlice.actions;
export default fileFormDataSlice.reducer;