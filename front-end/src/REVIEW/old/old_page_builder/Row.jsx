import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ROW, DEFAULT_STYLES } from "./constants";
import DropZone from "./DropZone";
import Column from "./Column";
import EditorComponent from "./popovers/EditorComponent";
const style = {};
const Row = ({ lockDragAndDrop, showDropAreas, selectedNodePreview, data, components, handleDrop, path, setIsContextOpen, changeContextMenu  }) => {
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ROW,
      id: data.id,
      children: data.children,
      path
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  const hidden = data?.object_properties?.hidden ? DEFAULT_STYLES['hidden'] : {};
  drag(ref);

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        selectedNodePreview={selectedNodePreview}
        showDropAreas={showDropAreas}
        lockDragAndDrop={lockDragAndDrop}
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
        setIsContextOpen={setIsContextOpen}
        changeContextMenu={changeContextMenu}
      />
    );
  };

  return (
    <div ref={ref} style={{ ...data?.object_properties?.style, opacity, ...hidden }} className={`${selectedNodePreview == data.id ? 'previewed' : ''} base draggable row`}>
      <div className="columns">
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                className={`${lockDragAndDrop ? 'hide-dragdrop' : '' } ${showDropAreas ? 'show-drop-color' : '' } horizontalDrag`}
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length
          }}
          onDrop={handleDrop}
          className={`${lockDragAndDrop ? 'hide-dragdrop' : '' } ${showDropAreas ? 'show-drop-color' : '' } horizontalDrag`}
          isLast
        />
      </div>
    </div>
  );
};
export default Row;
