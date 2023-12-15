import React, { useState } from 'react';
import { Popover, Button, ChromePicker } from '@blueprintjs/core';
import renderColorPicker from './renderColorPicker';
import renderNumericInput from './renderNumericInput';
const FontPopover = ({ ref, elementStyle, handleInputChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onInteraction={setIsOpen}
      usePortal={true}
      portalContainer={ref}
      enforceFocus={true}
      placement="right-end"
      content={
        <div className="editor-content">
            {renderColorPicker('Text Color', 'color', elementStyle, handleInputChange)}
          <div>
            <label htmlFor="fontFamily">Font Family</label>
            <select
              id="fontFamily"
              value={elementStyle.fontFamily}
              onChange={(e) => handleInputChange('fontFamily', e.target.value)}
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Courier New, monospace">Courier New</option>
              {/* Add other font options as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="fontSize">Font Size</label>
            <input
              id="fontSize"
              type="number"
              value={elementStyle.fontSize}
              onChange={(e) => handleInputChange('fontSize', e.target.value)}
            />
          </div>
          {/* Add other font/text styling options as needed */}
        </div>
      }
      interactionKind="click"
    >
      <Button icon="font" onClick={() => setIsOpen(!isOpen)}>
      </Button>
    </Popover>
  );
};

export default FontPopover
