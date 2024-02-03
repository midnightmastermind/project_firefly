import React from "react";
import ComponentHeader from "./component_settings/ComponentHeader";
import TextElement from "./components/TextElement";
import VideoElement from "./components/VideoElement";
import ImageElement from "./components/ImageElement";
import ListElement from "./components/ListElement";

const DraggableComponent = ({ type, label, onAddItemType, onRemoveItem, element }) => {
  const handleClick = () => {
    onAddItemType(type);
  };

  const renderElement = (type, element) => {
    switch (type) {
      case "text":
        return <TextElement onRemoveItem={onRemoveItem} element={element} />;
      case "image":
        return <ImageElement onRemoveItem={onRemoveItem} element={element} />;
      case "video":
        return <VideoElement onRemoveItem={onRemoveItem} element={element} />;
      case "container":
        return <ListElement onRemoveItem={onRemoveItem} element={element} />;
      // Add cases for other types as needed
      default:
        return null;
    }
  };

  return (
    <div className="draggable-element" draggable={true} onClick={handleClick}>
      <ComponentHeader />
      {renderElement(type, element)}
      {label}
    </div>
  );
};

export default DraggableComponent;
