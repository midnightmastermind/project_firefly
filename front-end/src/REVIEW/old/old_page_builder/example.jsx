import React, { useState, useCallback, useEffect, useRef } from "react";

import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import Row from "./Row";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout
} from "./helpers";
import CustomDrawer from "common/CustomDrawer";
import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN, DEFAULT_STYLES } from "./constants";
import shortid from "shortid";
import { Menu, FormGroup, InputGroup, ButtonGroup, Button, Switch, Position, DrawerSize } from "@blueprintjs/core";
import EditorComponent from "./popovers/EditorComponent";
import SideBar from "./SideBar";
import { Delta } from "@blueprintjs/icons/lib/esm/generated/20px/paths";

const Container = (props) => {
  const myRef = useRef();
  const [layout, setLayout] = useState([]);
  const [components, setComponents] = useState({});
  const [page, setPage] = useState({});
  const [selectedNodePreview, setSelectedNodePreview] = useState(null);
  const [lockDragAndDrop, setLockDragAndDrop] = useState(false);
  const [showDropAreas, setShowDropAreas] = useState(false);
  const [showGridlines, setShowGridlines] = useState(true);

  const [isContextOpen, setIsContextOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [reference, setReference] = useState(null);

  const changeContextMenu = (id) => {
    setContextMenu(id);
  }  

  const handleSetPageName = (name) => {
    let newPage = JSON.parse(JSON.stringify(page));
    newPage.object_properties['name'] = name;
    window.setTimeout(() => setPage(newPage), 10);
  }

  const handleSetPageRoute = (route) => {
    let newPage = JSON.parse(JSON.stringify(page));
    newPage.object_properties['route'] = route;
    window.setTimeout(() => setPage(newPage), 10);
  }

  useEffect(() => {
    setReference(myRef.current)
},[myRef]);

  useEffect(() => {
    if (props.page) {
      setLayout(props.page.children);
      setComponents(extractComponents(props.page.children));
      setPage(props.page)
    }
  }, [props]);

  const revertPage = () => {
    setLayout(props.page.children);
    setComponents(extractComponents(props.page.children));
    setPage(props.page)
  }

  const handleSavePage = () => {
    let contentToAdd = components;
    let parentID = props.page.id;
    let newData = JSON.parse(JSON.stringify(layout)); // Create a deep copy of the original data
    let site_id = props.site_id;

    let stack = [...newData];
    while (stack.length > 0) {
      let obj = stack.pop();
      // obj.parent_id = parentID; // Assign parent ID for top-level objects
      obj.site_id = site_id;
      
      if (obj.children) {
        for (let child of obj.children) {
          // child.parent_id = obj.id; // Assign parent ID for children
          child.site_id = site_id;

          if (child.children) {
            for (let component of child.children) {
              if (contentToAdd[component.id]) {
                // component.parent_id = child.id; // Assign parent ID for components
                component.site_id = site_id;
                component.object_properties = {...component?.object_properties, ...contentToAdd[component.id]};
              }
            }
            stack = [...stack, ...child.children];
          }
        }
      }
    }

    const updatedPage = { ...props.page, ...page, children: newData };
    props.savePage(updatedPage)
  }

  const extractComponents = (data) => {
    let components = {};
    let stack = [...data];
    while (stack.length > 0) {
      let obj = stack.pop();
      if (obj.children) {
        for (let child of obj.children) {
          if (child.children) {
            for (let component of child.children) {
              if (component.type === "component") {
                components[component.id] = component;
              }
            }
            stack = [...stack, ...child.children];
          }
        }
      }
    }

    return components;
  }
  const findNode = (nodes, targetId) => {
    for (let node of nodes) {
        if (node.id === targetId) {
            return node;
        }
        if (node.children && node.children.length) {
            const foundNode = findNode(node.children, targetId);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null;
};

const deepCopy = (inObject) => {
    let outObject, value, key;
    if (typeof inObject !== "object" || inObject === null) {
        return inObject; // Return the value if inObject is not an object
    }
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) {
        value = inObject[key];
        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopy(value);
    }
    return outObject;
};

const updateObjectPropertiesById = (targetId, updatedProperties) => {
  const newPage = deepCopy({id: page.id, type: page.type, object_properties: page.object_properties, children: layout});
  const targetNode = findNode([newPage], targetId);

  if (targetNode) {
      if (updatedProperties.style) {
        const updatedStyle = {
          ...targetNode.object_properties.style,
          ...updatedProperties.style,
        };
        targetNode.object_properties.style = updatedStyle;

      } else {
        const updatedObjectProperties = {
          ...targetNode.object_properties,
          ...updatedProperties
        };
        targetNode.object_properties = updatedObjectProperties;
      }
      
      setLayout(newPage.children);
      setPage(newPage);
  }
};

const getObjectPropertiesById = (targetId) => {
  const pageSearch = {id: page.id, type: page.type, object_properties: page.object_properties, children: layout};
  const node = findNode([pageSearch], targetId);
  if (node) {
      return node.object_properties;
  }
  return null;
};

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
        newItem.object_properties.style = DEFAULT_STYLES['column'];
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
          object_properties: {
            style: DEFAULT_STYLES['component']
          }
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent
        });

        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        selectedNodePreview={selectedNodePreview}
        showDropAreas={showDropAreas}
        lockDragAndDrop={lockDragAndDrop}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
        setIsContextOpen={setIsContextOpen}
        changeContextMenu={changeContextMenu}
      />
    );
  };
  console.log('layout', layout);
  console.log('components', components);
  console.log('lockdraganddrop', lockDragAndDrop);
  console.log('showdropareas', showDropAreas);
  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="page-editor">
      <Menu className="top-bar">
        <div className="page-info">
          <FormGroup
            label="Page Name"
            labelFor="page_name"
          >
            <InputGroup asyncControl={true} id="page_name" type="text" readOnly={false} value={page?.object_properties?.name} onValueChange={handleSetPageName} />

          </FormGroup>
          <FormGroup
            label="Page Route"
            labelFor="page_route"
          >
            <InputGroup id="page_route" asyncControl={true} leftIcon="slash" readOnly={false} type="text" value={page?.object_properties?.route} onValueChange={handleSetPageRoute} />

          </FormGroup>
        </div>
        <div className="top-tool-bar">
          <Switch checked={showGridlines} label="Show Gridlines" onClick={() => setShowGridlines(!showGridlines)}/>
          <Switch disabled={lockDragAndDrop} checked={showDropAreas} label="Show Drop Areas" onClick={() => setShowDropAreas(!showDropAreas)}/>
        </div>
        <ButtonGroup>
          <Button className="revert-button" disabled={props.page.children == layout && props.page.object_properties.name == page?.object_properties?.name && props.page.object_properties.route == page?.object_properties?.route} icon="reset" text="Revert" onClick={() => revertPage()} />
          <Button className="save-button" disabled={props.page.children == layout && props.page.object_properties.name == page?.object_properties?.name && props.page.object_properties.route == page?.object_properties?.route} icon="floppy-disk" text="Save Page" onClick={() => handleSavePage()} />
        </ButtonGroup>
      </Menu>
      <div className="page-editor-area">
       <SideBar setShowDropAreas={setShowDropAreas} setLockDragAndDrop={setLockDragAndDrop} setSelectedNodePreview={setSelectedNodePreview} getObjectPropertiesById={getObjectPropertiesById} updateObjectPropertiesById={updateObjectPropertiesById} handleDropToTrashBin={handleDropToTrashBin} page={{id: page.id, type: page.type, object_properties: page.object_properties, children: layout}}/>
        <div className="pageContainer">
          <div className={`${selectedNodePreview == page.id ? 'previewed' : ''} ${showGridlines ? '': 'hide-grid'} page`} style={{...page?.object_properties?.style}}>
            {layout.map((row, index) => {
              const currentPath = `${index}`;

              return (
                <React.Fragment key={row.id}>
                  <DropZone
                    data={{
                      path: currentPath,
                      childrenCount: layout.length
                    }}
                    onDrop={handleDrop}
                    path={currentPath}
                    className={`${lockDragAndDrop ? 'hide-dragdrop' : '' } ${showDropAreas ? 'show-drop-color' : '' } verticalDrag`}
                  />
                  {renderRow(row, currentPath)}
                </React.Fragment>
              );
            })}
            <DropZone
              data={{
                path: `${layout.length}`,
                childrenCount: layout.length
              }}
              onDrop={handleDrop}
              isLast
              className={`${lockDragAndDrop ? 'hide-dragdrop' : '' } ${showDropAreas ? 'show-drop-color' : '' } verticalDrag`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Container;
