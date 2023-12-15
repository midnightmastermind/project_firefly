import React from 'react';
import { ChromePicker } from 'react-color';

const renderColorPicker = (label, property, elementStyle, handleInputChange) => {
  return (
    <div key={property}>
      <label>{label}</label>
      <ChromePicker
        color={elementStyle[property]}
        onChange={(color) => handleInputChange(property, color.hex)}
      />
    </div>
  );
};

export default renderColorPicker;
