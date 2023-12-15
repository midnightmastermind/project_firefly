import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as CustomComponents from "./CustomPageBuilderComponents.js";
import { create as createSiteObject, update as updateSiteObject, getAll as getAllSiteObjects } from 'slices/site_building/site_object.js';

import TestMarkdown from "../tools/markdown_editor/MarkdownEditor";
import PageBuilderComponent from "./PageBuilderComponent";
import { Tabs, Tab, Button } from "@blueprintjs/core";
import { DEFAULT_STYLES } from "./constants";
const newPageObject = {
  type: "page",
  parent_id: null,
  object_properties: {
    name: "Untitled 1",
    route: "",
  },
  children: [],
  status: false
};

const PageBuilder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [layout, setLayout] = useState([]);
  const [currentSiteId, setCurrentSiteId] = useState(false);
  const [currentSiteObjects, setCurrentSiteObjects] = useState([]);
  const [highlightedObject, setHighlightedObject] = useState(null);

  const site_objects = useSelector(state => state.site_object.site_objects);
  const current_site = useSelector(state => state.site.current_site);
  const dispatch = useDispatch();

  useEffect(() => {
    if (current_site) {
      setCurrentSiteId(current_site._id);
    }

    setCurrentSiteObjects(site_objects.filter(obj => obj.type === "page"));
  }, [site_objects, current_site]);

  const onLayoutChange = (layout) => {
    setLayout(layout);
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

    dispatch(updateSiteObject({ id: object._id, data: new_object }))
      .unwrap()
      .then(data => {
        dispatch(getAllSiteObjects());
      })
      .catch(e => {
        console.log(e);
      });
  };

  const toggleModal = (modal_type, object_id) => {
    setIsModalOpen(prevState => !prevState);
    setHighlightedObject(object_id);
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

  function stringifyLayout() {
    return layout.map(function (l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      );
    });
  }

  return (
    <div className="page-builder-container" >
      <div><h4>Page Builder</h4></div>
      {
        !isModalOpen && (
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
        )
      }
      {
        isModalOpen && highlightedObject && (
        <div className="app-site-builder">
          <div className="layoutJSON">
            Displayed as <code>[x, y, w, h]</code>:
            <div className="columns">{stringifyLayout()}</div>
          </div>
          <PageBuilderComponent onLayoutChange={onLayoutChange} />
        </div>
        )
      }
    </div >
  );
}

// const contentDiv = document.getElementById("root");
// const gridProps = window.gridProps || {};
// ReactDOM.render(React.createElement(ExampleLayout, gridProps), contentDiv);
export default PageBuilder;