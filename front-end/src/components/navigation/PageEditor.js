import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor, Frame, useEditor, useNode, Canvas } from "@craftjs/core";
import { CustomTextComponent, CustomImageComponent, CustomButtonComponent, CustomCardComponent, CustomInputComponent, CustomSoundComponent, CustomVideoComponent } from "../chat/elements/CustomPageBuilderComponents";

// Page Editor Component
const PageEditor = ({ findObject, addNewObject, page }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { actions } = useEditor();
  const { connect, drag } = useNode();
  const [currentPageId, setCurrentPageId] = useState(null);
  const [highlightedObject, setHighlightedObject] = useState(false);
  const [currentPageObjects, setCurrentPageObjects] = useState([]);

  useEffect(() => {
    setCurrentPageObjects(page.children);
    setCurrentPageId(page._id);
  }, [page]);

  const addNewSection = (object) => {
    const new_object = object;
    new_object.parent_id = currentPageId;
    addNewObject(new_object);
  };

  const toggleModal = (modal_type, object_id) => {
    setIsModalOpen(!isModalOpen);
    const object = findObject(object_id);
    setHighlightedObject(object);
  };

  return (
    <div>
      <header>Some fancy header or whatever</header>

        <Frame>
          <CustomTextComponent text="I'm already rendered here" />
          <CustomButtonComponent />
          <CustomCardComponent />
          <CustomInputComponent />
          <CustomImageComponent />
          <CustomVideoComponent />
          <CustomSoundComponent />
        </Frame>
      <button onClick={() => actions.add()}>Add Component</button>
    </div>
  );
};

export default PageEditor;
