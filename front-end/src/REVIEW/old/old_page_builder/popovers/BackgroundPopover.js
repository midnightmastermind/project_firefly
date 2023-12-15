import React, { useState } from 'react';
import { Popover, Button, FormGroup, Slider, InputGroup } from '@blueprintjs/core';
import renderColorPicker from './renderColorPicker';
import renderNumericInput from './renderNumericInput';

const BackgroundPopover = ({ ref, elementStyle, handleInputChange }) => {
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
         {renderColorPicker('Background Color', 'backgroundColor', elementStyle, handleInputChange)}
          <FormGroup label="Background Image">
            <InputGroup />
          </FormGroup>
        </div>
      }
      interactionKind="click"
    >
      <Button icon="style" onClick={() => setIsOpen(!isOpen)}>
      </Button>
    </Popover>
  );
};

export default BackgroundPopover;