import React, { useState } from 'react';
import CustomPopup from './CustomPopup';
import { Icon } from '@blueprintjs/core';
import StyleEditor from './popover_menus/StyleEditor';
import ComponentEditor from './popover_menus/ComponentEditor';
import SettingsDrawer from './popover_menus/SettingsDrawer';
const ComponentPopup = ({ type, content, element, style, setStyle, setLockGrid, editComponent }) => {
    const cogButton = (
        <div
            id={`cogs-icon-${element ? element.i : ''}`}
            style={{
                visibility: "hidden",
                position: "absolute",
                top: "5px",
                left: "5px",
                zIndex: '100',
                color: 'white'
            }}
            >
            <Icon icon="cog" />
        </div>
    );

    const menuItems = [
        {
            title: "Info",
            content: "Info",
        },
        {
            title: "Style",
            content: <SettingsDrawer editComponent={editComponent} style={style} setStyle={setStyle} element={element}/>,
        },
        {
            title: "Properties",
            content: <ComponentEditor type={type} />
        }
    ];

    return (
        <CustomPopup setLockGrid={setLockGrid} element={element} style={{height: "100%"}} content={content} button={cogButton} menuItems={menuItems} />
    );
};

export default ComponentPopup;