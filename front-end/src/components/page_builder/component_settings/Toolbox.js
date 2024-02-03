import React from "react";
import DraggableElement from "./DraggableElement";

const Toolbox = ({ onAddItemType }) => {
  return (
    <div className="toolbox">
      <DraggableElement type="video" label="Video" onAddItemType={onAddItemType} />
      {/* Draggable Text Element */}
            <DraggableElement type="text" label="Text" onAddItemType={onAddItemType} element={{}} />

            {/* Draggable Image Element */}
            <DraggableElement type="image" label="Image" onAddItemType={onAddItemType} element={{}} />

            {/* Draggable Video Element */}
            <DraggableElement type="video" label="Video" onAddItemType={onAddItemType} element={{}} />

            {/* Draggable Container Element */}
            <DraggableElement type="container" label="Container" onAddItemType={onAddItemType} element={{}} />
      {/* Add other DraggableElement components here */}
    </div>
  );
};

export default Toolbox;