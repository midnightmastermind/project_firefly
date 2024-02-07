import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ContextMenu, MenuItem, Icon, Button, Menu } from '@blueprintjs/core';
import { INTENT_SUCCESS } from '@blueprintjs/core/lib/esm/common/classes';
import StyleEditor from './component_settings/StyleEditor';
import ComponentEditor from './component_settings/ComponentEditor';

const ComponentSettings = ({ type, element, setLockGrid, editComponent }) => {
  const selectedItemRef = useRef(null);
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
    setActiveMenuItem(menuItem);
    selectedItemRef.current = menuItem;
  }, []);

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

        {/* Render the content within the parent popover */}
        {activeMenuItem && (
          <div
            style={{
              backgroundColor: '#2F343C',
              border: '1px solid white',
              borderRadius: '5px',
              color: 'white',
              width: '50vw',
              height: 'auto',
            }}
          >
            {/* Render the specific content based on the active menu item */}
            {activeMenuItem.content}
          </div>
        )}
      </ContextMenu>
    </div>
  );
};

export default ComponentSettings;
