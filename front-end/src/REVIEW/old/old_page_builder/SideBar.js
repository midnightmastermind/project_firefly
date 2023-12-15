import React, { useState } from 'react';
import { Tabs, Tab } from '@blueprintjs/core';
import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import EditComponent from './EditComponent';

const SideBar = ({setShowDropAreas, setLockDragAndDrop, setSelectedNodePreview, updateObjectPropertiesById, getObjectPropertiesById, page, handleDropToTrashBin}) => {
    const [selectedTabId, setSelectedTabId] = useState('toolbox');

    const handleTabChange = (tabId) => {
        setSelectedTabId(tabId);
        if (tabId == 'toolbox') {
          setLockDragAndDrop(false);
        } else {
          setLockDragAndDrop(true);
          setShowDropAreas(false);
        }
    };

    const ToolBox = () => (
        <div className="ToolBox">
        <div>
          {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
            <SideBarItem key={sideBarItem.id} data={sideBarItem} />
          ))}
        </div>
        <TrashDropZone
          data={{
            ...page.children
          }}
          onDrop={handleDropToTrashBin}
        />
      </div>
    )
    return (
        <Tabs id="TabsExample" selectedTabId={selectedTabId} onChange={handleTabChange} className="sideBar">
            <Tab id="toolbox" title="Toolbox" onClick={() => setLockDragAndDrop(false)} panel={<ToolBox />} />
            <Tab id="edit" title="Edit" onClick={() => { setLockDragAndDrop(true); setShowDropAreas(false);}} panel={<EditComponent setSelectedNodePreview={setSelectedNodePreview} updateObjectPropertiesById={updateObjectPropertiesById} getObjectPropertiesById={getObjectPropertiesById} page={page}/>} />
        </Tabs>
    );
};

export default SideBar;