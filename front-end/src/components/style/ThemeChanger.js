import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useDispatch } from 'react-redux';
import { setPrimaryColor, setBackgroundColor } from '../../slices/style/theme';

const ThemeChanger = () => {
  const dispatch = useDispatch();
  const [primaryColor, setPrimaryColorLocal] = useState('#ffffff'); // Initial color for primary color picker
  const [backgroundColor, setBackgroundColorLocal] = useState('#ffffff'); // Initial color for background color picker

  const handlePrimaryColorChange = (color) => {
    setPrimaryColorLocal(color.hex);
    dispatch(setPrimaryColor(color.hex));
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColorLocal(color.hex);
    dispatch(setBackgroundColor(color.hex));
  };

  return (
    <div>
      <div>
        <label>Primary Color: </label>
        <ChromePicker color={primaryColor} onChange={handlePrimaryColorChange} />
      </div>
      <div>
        <label>Background Color: </label>
        <ChromePicker color={backgroundColor} onChange={handleBackgroundColorChange} />
      </div>
    </div>
  );
};

export default ThemeChanger;
