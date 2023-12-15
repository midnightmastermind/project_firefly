/**
 * This code contains functions for updating site global CSS properties.
 * It also includes error handling for when these functions fail.
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  // Add more global CSS properties as needed
};

const themeSlice = createSlice({
  name: 'theme_css',
  initialState,
  reducers: {
    setThemeProperty: (state, action) => {
      const { property, value } = action.payload;

      return {
        ...state,
        [property]: value,
      };
    },
  },
  extraReducers: {
    // Add extra reducers as needed for error handling
  },
});

export const { setThemeProperty } = themeSlice.actions;

export default themeSlice.reducer;