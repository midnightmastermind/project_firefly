import React, { useState } from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import StyleEditor from './StyleEditor'; // Adjust the import path accordingly



const SettingsDrawer = (props) => {
  console.log(props);
  const menuItems = [
    {
      id: 'font_styling',
      label: 'Font Styling',
      panel: <StyleEditor setStyle={props.setStyle} style={props.style} element={props.element} styleCategory="font" />, // Adjust the prop as needed
    },
    {
      id: 'border_styling',
      label: 'Border Styling',
      panel: <StyleEditor element={props.element} style={props.style} setStyle={props.setStyle} styleCategory="border" />, // Adjust the prop as needed
    },
    // {
    //   id: 'size_styling',
    //   label: 'Size Styling',
    //   panel: <StyleEditor styleCategory="size" />, // Adjust the prop as needed
    // },
    {
      id: 'spacing_styling',
      label: 'Spacing Styling',
      panel: <StyleEditor style={props.style} setStyle={props.setStyle}  element={props.element} styleCategory="spacing" />, // Adjust the prop as needed
    },
    {
      id: 'color_styling',
      label: 'Color Styling',
      panel: <StyleEditor style={props.style} setStyle={props.setStyle}  element={props.element} styleCategory="color" />, // Adjust the prop as needed
    },
    // ... (other menu items remain unchanged)
  ];

  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0]);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };



  return (
    <div style={{ display: 'flex'}}>
      <Menu className="settings-menu" style={{ backgroundColor: 'transparent', color: 'white' }}>
        {menuItems.map((menuItem) => {
          if (menuItem.panel) {
            return (
              <MenuItem
                key={menuItem.id}
                icon={activeMenuItem === menuItem.id ? 'double-chevron-right' : undefined}
                onClick={() => handleMenuItemClick(menuItem)}
                text={menuItem.label}
              />
            );
          } else {
            return <MenuDivider key={menuItem.id} title={menuItem.label} />;
          }
        })}
      </Menu>
      <div className="settings-drawer-content">
        {activeMenuItem && (activeMenuItem.panel)}
      </div>
    </div>
  );
};

export default SettingsDrawer;
