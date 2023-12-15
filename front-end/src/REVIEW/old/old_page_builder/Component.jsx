import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import { Button, ButtonGroup } from "@blueprintjs/core";

const Component = ({ data, selectedNodePreview, components, path, setIsContextOpen, changeContextMenu }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, id: data.id, path },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = data;

  return (
    <div
      ref={ref}
      style={{ ...data?.object_properties?.style, opacity }}
      className={`${selectedNodePreview == data.id ? 'previewed' : 'component draggable'} ${data.id}`}
    >
      {component.content}
    </div>
  );
};
export default Component;
