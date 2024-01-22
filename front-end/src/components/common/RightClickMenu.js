import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ContextMenu, MenuItem, Popover, Menu, Portal, Icon, Button } from '@blueprintjs/core';
import { INTENT_SUCCESS } from '@blueprintjs/core/lib/esm/common/classes';

const RightClickMenu = ({ menuItems, content, setLockGrid, selectedItem, setSelectedItem, popoverPosition, setPopoverPosition }) => {

  const [isOpen, setIsOpen] = useState(false);
  const handleMenuItemClick = (item, index, event) => {
    item.i = index;
    const rect = event.currentTarget.getBoundingClientRect();
    const newPopoverPosition = {
      top: (rect.bottom + window.scrollY) - 50,
      left: rect.left + window.scrollX,
    };
    console.log('New Popover Position:', newPopoverPosition); // Add this line for debugging
    setPopoverPosition(newPopoverPosition);
    setIsOpen(true);
    setSelectedItem(item);
  };
  

  const handlePopoverClosed = () => {
    console.log("hit2");
    setSelectedItem(null);
  };


  return (
    <div style={{ height: '100%' }}>
      <ContextMenu style={{ height: '100%' }} content={(
        <Menu>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              text={menuItem.title}
              onClick={(event) => handleMenuItemClick(menuItem, index, event)}
            />
          ))}
        </Menu>
      )}>
        {content}
      </ContextMenu>
          <Popover
            className="popover"
            usePortal={true}
            canEscapeKeyClose={true}
            style={{
              zIndex: '1000',
              position: 'fixed',
              backgroundColor: '#2F343C',
              border: '1px solid white',
              borderRadius: '5px',
              color: 'white',
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
            }}
            isOpen={isOpen}
            isControlled={true}
            popoverClassName="custom-popover-class"
            content={(
              <div
                style={{
                  position: 'fixed',
                  backgroundColor: '#2F343C',
                  border: '1px solid white',
                  borderRadius: '5px',
                  color: 'white',
                  top: `${popoverPosition.top}px`,
                  left: `${popoverPosition.left}px`,
                  width: '50vw',
                  height: 'auto',
                }}
              >
                {selectedItem && selectedItem.content}
              </div>
            )}
          />
    </div>
  );
};

export default RightClickMenu;
