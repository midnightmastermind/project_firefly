import React, { useState, useCallback, useEffect } from 'react';
import { Tabs, Tab } from '@blueprintjs/core';
import StyleEditor from './component_settings/StyleEditor';
import ComponentEditor from './component_settings/ComponentEditor';
import MarkdownEditor from 'components/tools/markdown_editor/MarkdownEditor';

const ComponentSettings = ({ type, element, setLockGrid, editComponent }) => {
  const [activeTabId, setActiveTabId] = useState("info");
  const [infoContent, setInfoContent] = useState("info");

  console.log(element);
  const updateContent = (content) => {
    editComponent(element.i, 'content', content, false);
  }
  
  useEffect(() => {
    if (element.type == "text") {
      setInfoContent(<div className="text-component-editor"><MarkdownEditor updateContent={updateContent} content={element.content || "### This is a Text Element"} /></div>);
    }
  }, [element])
  const tabs = [
    {
      id: "info",
      title: "Info",
      content: infoContent,
    },
    {
      id: "style",
      title: "Style",
      content: (
        <StyleEditor
          editComponent={editComponent}
          element={element}
          styleCategory="font"
        />
      ),
    },
    {
      id: "properties",
      title: "Properties",
      content: <ComponentEditor type={type} />,
    },
    // ... (other tabs can be added here)
  ];

  const handleTabChange = useCallback((newTabId) => {
    setActiveTabId(newTabId);
  }, []);

  return (
    <div className="component-settings" style={{ height: '100%' }}>
      <Tabs
        vertical
        onChange={handleTabChange}
        selectedTabId={activeTabId}
        renderActiveTabPanelOnly
      >
        {tabs.map(tab => (
          <Tab key={tab.id} id={tab.id} title={tab.title} panel={tab.content} />
        ))}
      </Tabs>
    </div>
  );
};

export default ComponentSettings;
