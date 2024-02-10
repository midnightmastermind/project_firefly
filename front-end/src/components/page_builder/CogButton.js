import React, { useState } from 'react';
import { Button, Popover, Slider } from '@blueprintjs/core';
import ComponentSettings from './NewComponentSettings';

// ... (other imports)

const CogButton = ({ element, setEditable, editComponent }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const handlePopoverDrag = (event) => {
    event.stopPropagation();
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button icon="cog" className="cog-button" minimal onClick={handleButtonClick} />
      <Popover
        isOpen={isPopoverOpen}
        position="auto-start"
        enforceFocus={true}
        usePortal={true}
        onInteraction={(nextOpenState) => {
          if (!nextOpenState) {
            closePopover();
          }
        }}
        content={
          <div
            className=""
            style={{ padding: '10px', width: '100%'}}
            onMouseDown={handlePopoverDrag}
            onMouseMove={handlePopoverDrag}
          >
            <ComponentSettings editComponent={editComponent} element={element} />
          </div>
        }
      >
        <div className="testeroo" style={{ width: '0', height: '0', overflow: 'hidden' }}></div>
      </Popover>
    </div>
  );
};

export default CogButton;
