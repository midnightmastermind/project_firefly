import { createSlice } from '@reduxjs/toolkit';

const formDataSlice = createSlice({
  name: 'formData',
  initialState: [],
  reducers: {
    addFormData: (state, action) => {
      state.push(action.payload);
    },
    updateFormDataStatus: (state, action) => {
      const { id, status } = action.payload;
      const existingFormData = state.find(item => item.id === id);
      if (existingFormData) {
        existingFormData.status = status;
      }
    },
    updateFileUrl: (state, action) => {
      const { id, localFile, url } = action.payload;
      const existingFormData = state.find(item => item.id === id);
      if (existingFormData) {
        const existingFile = existingFormData.files.find(file => file.localFile === localFile);
        if (existingFile) {
          existingFile.url = url;
        }
      }
    },
  },
});

export const { addFormData, updateFormDataStatus, updateFileUrl } = formDataSlice.actions;
export default formDataSlice.reducer;
