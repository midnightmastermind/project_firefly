import React, { useState, useRef } from 'react';
import RightClickMenu from '../common/RightClickMenu';
import { Icon } from '@blueprintjs/core';
import StyleEditor from './component_settings/StyleEditor';
import ComponentEditor from './component_settings/ComponentEditor';
import CustomDrawer from 'components/common/CustomDrawer';
import { MarkdownEditor } from 'components/tools/markdown_editor/MarkdownEditor';

const ComponentSettings = ({ type, content, element, setLockGrid, editComponent }) => {
  const selectedItemRef = useRef(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
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

  console.log(selectedItemRef);
  const setCurrenSelectedItem = (item) => {
    console.log("hit");
    selectedItemRef.current = item;
  };

  const handlePopoverClosed = () => {
    selectedItemRef.current = null;
  };

  const styleMenu = [
    {
      id: 'font_styling',
      label: 'Font Styling',
      panel: <StyleEditor editComponent={editComponent} element={element} styleCategory="font" setPopoverPosition={setPopoverPosition} />,
    },
    {
      id: 'border_styling',
      label: 'Border Styling',
      panel: <StyleEditor editComponent={editComponent} element={element} styleCategory="border" setPopoverPosition={setPopoverPosition} />, // Adjust the prop as needed
    },
    // {
    //   id: 'size_styling',
    //   label: 'Size Styling',
    //   panel: <StyleEditor styleCategory="size" />, // Adjust the prop as needed
    // },
    {
      id: 'spacing_styling',
      label: 'Spacing Styling',
      panel: <StyleEditor editComponent={editComponent} element={element} styleCategory="spacing" setPopoverPosition={setPopoverPosition} />, // Adjust the prop as needed
    },
    {
      id: 'color_styling',
      label: 'Color Styling',
      panel: <StyleEditor editComponent={editComponent} element={element} styleCategory="color" setPopoverPosition={setPopoverPosition} />, // Adjust the prop as needed
    },
    // ... (other menu items remain unchanged)
  ];

  const menuItems = [
    {
      title: "Info",
      content: <MarkdownEditor />,
    },
    {
      title: "Style",
      content: <CustomDrawer editComponent={editComponent} element={element} menuItems={styleMenu} />,
    },
    {
      title: "Properties",
      content: <ComponentEditor type={type} />
    }
  ];

  return (
    <RightClickMenu
      setLockGrid={setLockGrid}
      element={element}
      style={{ height: "100%" }}
      content={content}
      button={cogButton}
      menuItems={menuItems}
      selectedItem={selectedItemRef.current}
      setSelectedItem={setCurrenSelectedItem}
      popoverPosition={popoverPosition}
      setPopoverPosition={setPopoverPosition}
    />
  );
};

export default ComponentSettings;
