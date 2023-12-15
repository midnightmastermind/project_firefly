import React, { useState } from 'react';
import { ContextMenu, MenuItem, Popover, Menu, Icon, Portal, Button } from '@blueprintjs/core';
import { INTENT_SUCCESS } from '@blueprintjs/core/lib/esm/common/classes';

const Popup = ({ item, onClose, saveCallback }) => (
  <div key={item.i} className="popup-content" style={{ padding: '20px', position: 'relative'}}>
    <Icon
      icon="cross"
      onClick={onClose}
      style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
    />
    <div className="popup-top-bar"><h3>{item.title}</h3><Button icon="floppy-disk" text="Save" intent={INTENT_SUCCESS}/></div>
    {item.content}
  </div>
);

const CustomPopup = ({ element, content, menuItems, setLockGrid }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleMenuItemClick = (item, index, event) => {
    console.log(item);
    setLockGrid(true);
    item.i = index;
    setSelectedItem(item);
    // Get the coordinates of the right-clicked component
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      top: (rect.bottom + window.scrollY) - 50,
      left: rect.left + window.scrollX,
    });
  };
  console.log(menuItems);
  console.log(selectedItem);
  return (
    <div style={{height: "100%"}}>
      <ContextMenu
        style={{height: "100%"}}
        content={(
          <Menu>
            {menuItems.map((menuItem, index) => (
              <MenuItem
                key={index}
                text={menuItem.title}
                onClick={(event) => handleMenuItemClick(menuItem, index, event)}
              />
            ))}
          </Menu>
        )}
      >
        {content}
      </ContextMenu>

      {selectedItem && (
        <Portal hasBackdrop={true} enforceFocus={true} container={document.body}>
          <Popover
            className="popover"
            usePortal={true}
            onClosed={() => setSelectedItem(null)}
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
            isOpen={true}
            popoverClassName="custom-popover-class" // Add a custom class for styling
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
                  height: 'auto'
                }}
              >
                <Popup item={selectedItem} onClose={() => {setSelectedItem(null);}} />
              </div>
            )}
          />
        </Portal>
      )}
    </div>
  );
};

export default CustomPopup;
