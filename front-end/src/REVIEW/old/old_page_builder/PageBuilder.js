import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as CustomComponents from "./CustomPageBuilderComponents.js";
import { create as createSiteObject, update as updateSiteObject, getAll as getAllSiteObjects } from 'slices/site_building/site_object.js';
import { Tabs, Tab, Button } from "@blueprintjs/core";
import Example from "./example";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import initialData from "./initial-data";
import "./styles.css";
import { DEFAULT_STYLES } from "./constants";
const newPageObject = {
  type: "page",
  parent_id: null,
  object_properties: {
    name: "Untitled 1",
    route: "",
    style: DEFAULT_STYLES['page']
  },
  children: [],
  status: false
};

const PageBuilder = ({ hideSiteMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSiteId, setCurrentSiteId] = useState(false);
  const [highlightedObject, setHighlightedObject] = useState(null);
  const [currentSiteObjects, setCurrentSiteObjects] = useState([]);

  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;

  const site_objects = useSelector(state => state.site_object.site_objects);
  const current_site = useSelector(state => state.site.current_site);
  const dispatch = useDispatch();


  useEffect(() => {
    if (current_site) {
      setCurrentSiteId(current_site._id);
    }

    setCurrentSiteObjects(site_objects.filter(obj => obj.type === "page"));
  }, [site_objects, current_site]);


  const findObject = object_id => {
    return currentSiteObjects.find(obj => obj._id === object_id);
  };

  const toggleModal = (modal_type, object_id) => {
    setIsModalOpen(prevState => !prevState);
    setHighlightedObject(object_id);
  };

  const addNewObject = object => {
    const new_object = object;
    new_object.site_id = currentSiteId;

    dispatch(createSiteObject(new_object))
      .unwrap()
      .then(data => {
        dispatch(getAllSiteObjects());
      })
      .catch(e => {
        console.log(e);
      });
  };

  const savePage = object => {
    const new_object = object;

    new_object.site_id = currentSiteId;

    dispatch(updateSiteObject({id: object._id, data: new_object}))
      .unwrap()
      .then(data => {
        dispatch(getAllSiteObjects());
      })
      .catch(e => {
        console.log(e);
      });
  };


  const PagePreview = ({ siteObject }) => {
    return (
      <div key={siteObject._id} className="page-preview-block" onClick={() => toggleModal("page-editor", siteObject._id)}>
        <div>
          <h3>{siteObject.title}</h3>
          <p>{siteObject.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="page-builder-container">
      <div><h4>Page Builder</h4></div>
      {!isModalOpen && (
        <div className="page-builder-page-selection">
          <div className="pages-toolbox">
            <Button icon="plus" text="New Draft"
              className="page-builder-plus-button"
              onClick={() => addNewObject(newPageObject)}
            ></Button>
          </div>
          <Tabs id="toolbox-tabs" renderActiveTabPanelOnly={true}>
            <Tab
              id="published-tab"
              title="Published Pages"
              panel={

                <div className="page-builder-pages-container">
                  {currentSiteObjects &&
                    currentSiteObjects.map(siteObject => (
                      <PagePreview siteObject={siteObject} key={siteObject._id} />
                    ))}
                </div>
              }
            />
            <Tab
              id="draft-tab"
              title="Drafts"
              panel={
                <div className="page-builder-pages-container">
                  {currentSiteObjects &&
                    currentSiteObjects.map(siteObject => (
                      <PagePreview siteObject={siteObject} key={siteObject._id} />
                    ))}
                </div>
              }
            />
            <Tab
              id="templates-tab"
              title="Templates"
              panel={
                <div className="page-builder-pages-container">
                  {currentSiteObjects &&
                    currentSiteObjects.map(siteObject => (
                      <PagePreview siteObject={siteObject} key={siteObject._id} />
                    ))}
                </div>
              }
            />
          </Tabs>
        </div>
      )}
      {isModalOpen && highlightedObject && (
        <DndProvider backend={Backend}>
          <Example page={currentSiteObjects.find(obj => obj._id === highlightedObject)} savePage={savePage} />
        </DndProvider>
      )}
    </div>
  );
};

export default PageBuilder;
