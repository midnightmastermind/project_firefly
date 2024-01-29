import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ContextMenu, MenuItem, Popover, Portal, Icon, Button, Menu } from '@blueprintjs/core';
import { INTENT_SUCCESS } from '@blueprintjs/core/lib/esm/common/classes';
import StyleEditor from './component_settings/StyleEditor';
import ComponentEditor from './component_settings/ComponentEditor';

const Popup = ({ item, onClose }) => (
  <div key={item.i} className="popup-content" style={{ padding: '20px', position: 'relative' }}>
    <Icon
      icon="cross"
      onClick={onClose}
      style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
    />
    <div className="popup-top-bar"><h3>{item.title}</h3><Button icon="floppy-disk" text="Save" intent={INTENT_SUCCESS} /></div>
    {item.content}
  </div>
);

const ComponentSettings = ({ type, content, element, setLockGrid, editComponent }) => {
  const selectedItemRef = useRef(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const menuItems = [
    {
      title: "Info",
      content: "Info",
    },
    {
      title: "Style",
      content: (
        <StyleEditor
          editComponent={editComponent}
          element={element}
          styleCategory="font"
          selectedItem={selectedItemRef.current}
          setPopoverPosition={setPopoverPosition}
        />
      ),
    },
    {
      title: "Properties",
      content: <ComponentEditor type={type} />,
    },
    // ... (other menu items can be added here)
  ];

  const handleMenuItemClick = useCallback((menuItem, index, event) => {
    menuItem.i = index;
    const rect = event.currentTarget.getBoundingClientRect();
    const newPopoverPosition = {
      top: (rect.bottom + window.scrollY) - 50,
      left: rect.left + window.scrollX,
    };
    setPopoverPosition(newPopoverPosition);
    setActiveMenuItem(menuItem);
    selectedItemRef.current = menuItem;
  }, [setLockGrid, setPopoverPosition]);

  const handlePopoverClosed = useCallback(() => {
    setActiveMenuItem(null);
    setLockGrid(false);
  }, [setLockGrid]);

  useEffect(() => {
    // Update selectedItemRef.current after the editComponent operation is completed
    selectedItemRef.current = activeMenuItem;
  }, [activeMenuItem]);

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

      {activeMenuItem && (
        <Portal hasBackdrop={true} enforceFocus={true} container={document.body}>
          <Popover
            onClosed={handlePopoverClosed}
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
            isOpen={true}
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
                <Popup item={activeMenuItem} onClose={() => setActiveMenuItem(null)} />
              </div>
            )}
          />
        </Portal>
      )}
    </div>
  );
};

export default ComponentSettings;
