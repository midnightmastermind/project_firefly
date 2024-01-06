import React, { useState } from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
// import StyleEditor from './StyleEditor';

const SettingsDrawer = (props) => {
  const { menuItems } = props;

  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0]);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
        {activeMenuItem && activeMenuItem.panel}
      </div>
    </div>
  );
};

export default SettingsDrawer;
