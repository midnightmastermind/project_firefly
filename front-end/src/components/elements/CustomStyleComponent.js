import React, { useState } from 'react';
import { Menu, MenuDivider, ColorPicker, Switch, Slider, Card, Elevation } from '@blueprintjs/core';

const componentStyleConfig = {
  'background-color': 'colorPicker',
  'text-color': 'colorPicker',
  'border-left': 'slider',
  // Add more properties as needed
};

const CustomStyleComponentMenu = ({ component, globalCss }) => {
  const [localStyles, setLocalStyles] = useState(component.styles); // Set the initial state to the values from the component

  const handleToggleChange = (property) => {
    const updatedLocalStyles = localStyles.map((style) =>
      style.property === property ? { ...style, useGlobal: !style.useGlobal } : style
    );
    setLocalStyles(updatedLocalStyles);
  };

  const handleStyleChange = (value, property) => {
    const updatedLocalStyles = localStyles.map((style) =>
      style.property === property ? { ...style, [property]: value } : style
    );
    setLocalStyles(updatedLocalStyles);
  };

  const renderInput = (style) => {
    if (componentStyleConfig[style.property] === 'colorPicker') {
      return (
        <ColorPicker
          disabled={style.useGlobal}
          color={style.useGlobal ? globalCss[style.property] : style[style.property]}
          onChange={(color) => handleStyleChange(color, style.property)}
        />
      );
    } else if (componentStyleConfig[style.property] === 'slider') {
      return (
        <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
          <Card
            interactive
            elevation={Elevation.TWO}
            style={{ backgroundColor: style[style.property], width: 30, height: 30 }}
          />
          <Slider
            disabled={style.useGlobal}
            min={0}
            max={100}
            stepSize={1}
            labelStepSize={10}
            value={style[style.property]}
            onChange={(value) => handleStyleChange(value, style.property)}
          />
        </div>
      );
    }
    return null;
  };

  const renderPreviewBox = (style) => (
    <Card
      interactive
      elevation={Elevation.TWO}
      style={{ backgroundColor: globalCss[style.property], width: 30, height: 30 }}
    />
  );

  return (
    <div>
      <Menu>
        <MenuDivider title="Component Styles" />
        {localStyles.map((style) => (
          <div key={style.property} style={{ display: 'flex', alignItems: 'center' }}>
            {renderPreviewBox(style)}
            <Switch checked={style.useGlobal} onChange={() => handleToggleChange(style.property)} />
            {renderInput(style)}
          </div>
        ))}
      </Menu>
    </div>
  );
};

export default CustomStyleComponentMenu;