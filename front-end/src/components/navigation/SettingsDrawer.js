import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
// import StyleEditor from './StyleEditor';

const SettingsDrawer = (props) => {
  const { menuItems } = props;

  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  useEffect(() => {
    setActiveMenuItem(menuItems[0].id);
  },[menuItems]);

  console.log(menuItems);
  return (
    <div className={props.className} style={{ display: 'flex', justifyContent: 'center' }}>
      <Menu className="settings-menu" style={{ backgroundColor: 'transparent', color: 'white' }}>
        {menuItems.map((menuItem) => {
          if (menuItem.panel) {
            return (
              <MenuItem
                key={menuItem.id}
                className={`${activeMenuItem == menuItem.id ? 'menu-item-selected' : ''} menu-item`}
                // icon={activeMenuItem === menuItem.id ? 'double-chevron-right' : undefined}
                onClick={() => handleMenuItemClick(menuItem.id)}
                text={menuItem.label}
              />
            );
          } else {
            return <MenuDivider key={menuItem.id} title={menuItem.label} />;
          }
        })}
      </Menu>
      <div className="settings-drawer-content">
        {activeMenuItem && menuItems && menuItems.find(item => item.id == activeMenuItem)?.panel}
      </div>
    </div>
  );
};

export default SettingsDrawer;
