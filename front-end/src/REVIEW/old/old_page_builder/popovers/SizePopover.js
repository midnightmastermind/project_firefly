import React, { useState } from 'react';
import { Popover, Button, FormGroup, HTMLSelect } from '@blueprintjs/core';
import renderNumericInput from './renderNumericInput';

const SizePopover = ({ ref, elementStyle, handleInputChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUnitChange = (e, property) => {
    const value = e.target.value;
    handleInputChange(property, elementStyle[property].replace(/[a-zA-Z%]+$/, '') + value);
  };

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
          <div>
            {renderNumericInput('Width', 'width', elementStyle, handleInputChange)}
            <FormGroup label="Unit">
              <HTMLSelect
                options={['px', '%']}
                onChange={(e) => handleUnitChange(e, 'width')}
              />
            </FormGroup>
          </div>
          <div>
            {renderNumericInput('Height', 'height', elementStyle, handleInputChange)}
            <FormGroup label="Unit">
              <HTMLSelect
                options={['px', '%']}
                onChange={(e) => handleUnitChange(e, 'height')}
              />
            </FormGroup>
          </div>
        </div>
      }
      interactionKind="click"
    >
      <Button icon="zoom-to-fit" onClick={() => setIsOpen(!isOpen)} />
    </Popover>
  );
};

export default SizePopover;
