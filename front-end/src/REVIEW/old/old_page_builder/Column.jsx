import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COLUMN, DEFAULT_STYLES } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";
import { Button, ButtonGroup } from "@blueprintjs/core";
const style = {};
const Column = ({ lockDragAndDrop, showDropAreas, selectedNodePreview, data, components, handleDrop, path, setIsContextOpen, changeContextMenu }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: COLUMN,
      id: data.id,
      children: data.children,
      path
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  const hidden = data?.object_properties?.hidden ? DEFAULT_STYLES['hidden'] : {};

  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
        setIsContextOpen={setIsContextOpen}
        changeContextMenu={changeContextMenu}
        selectedNodePreview={selectedNodePreview}
        
      />
    );
  };

  return (
    <div
      ref={ref}
      style={{ ...data?.object_properties?.style, opacity, ...hidden }}
      className={`${selectedNodePreview == data.id ? 'previewed' : ''} base draggable column}`}
    >
      <div>
        {data.children.map((component, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <React.Fragment key={component.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length
                }}
                onDrop={handleDrop}
                className={`${lockDragAndDrop ? 'hide-dragdrop' : '' } ${showDropAreas ? 'show-drop-color' : '' } verticalDrag`}
              />
              {renderComponent(component, currentPath)}
            </React.Fragment>
          );
        })}
      </div>
      <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length
        }}
        onDrop={handleDrop}
        className={`${lockDragAndDrop ? 'hide-dragdrop' : '' } ${showDropAreas ? 'show-drop-color' : '' } verticalDrag`}
        isLast
      />
    </div>
  );
};
export default Column;
