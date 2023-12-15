/**
 * This code contains functions for updating site global CSS properties.
 * It also includes error handling for when these functions fail.
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  global: {
    backgroundColor: '#1C2127',
    color: '#ffffff',
  },
  page_container: {
    backgroundColor: '#252A31',
    color: '#ffffff',
  },
  header: {
    backgroundColor: '#2F343C',
    color: 'white',
  },
  footer: {
    backgroundColor: '#2F343C',
    color: 'white',
  },
  // Add more global CSS properties as needed
};

function pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor) {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? darkColor : lightColor;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeProperty: (state, action) => {
      const { section, property, value } = action.payload;
      const root = document.documentElement;
      const converted_property = property.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
      const css_property = `--${section}-${converted_property}`;
      root.style.setProperty(`--${section}-${converted_property}`, value); // Update the CSS variable dynamically
      if (css_property == '--page-container-background-color') {
        root.style.setProperty(`--settings-text-color`, pickTextColorBasedOnBgColorAdvanced(value, '#FFFFFF', '#000000')); // Update the CSS variable dynamically
      }
      
      return {
        ...state,
        [section]: {
          ...state[section],
          [property]: value,
        },
      };
    },
  },
  extraReducers: {
    // Add extra reducers as needed for error handling
  },
});

export const { setThemeProperty } = themeSlice.actions;

export default themeSlice.reducer;
