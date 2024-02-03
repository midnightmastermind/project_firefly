import React, { useState } from 'react';
import { Button, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

const CogButton = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button
        icon="cog"
        minimal
        onClick={handleButtonClick}
      />
      <Popover
        isOpen={isPopoverOpen}
        position="auto"
        interactionKind={PopoverInteractionKind.HOVER}
        onClose={() => setIsPopoverOpen(false)}
        content={<div style={{ padding: '10px' }}>Hi!</div>}
      >
        <div style={{ width: '0', height: '0', overflow: 'hidden' }}></div>
      </Popover>
    </div>
  );
};

export default CogButton;
