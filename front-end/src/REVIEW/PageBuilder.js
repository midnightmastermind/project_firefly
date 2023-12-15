import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor, Frame } from "@craftjs/core";
import { Typography, Row, Col, Card } from 'antd';
import * as CustomComponents from "elements/CustomPageBuilderComponents";
import Toolbox from 'elements/Toolbox;';
import { SettingsPanel } from 'settings/SettingsPanel';
import { create as createSiteObject, getAll as getAllSiteObjects } from 'slices/site_building/site_object';
const PageBuilder = ({ hideSiteMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSiteId, setCurrentSiteId] = useState(false);
  const [highlightedObject, setHighlightedObject] = useState(null);
  const [currentSiteObjects, setCurrentSiteObjects] = useState([]);

  const site_objects = useSelector(state => state.site_object.site_objects);
  const current_site = useSelector(state => state.site.current_site);
  const dispatch = useDispatch();

  const newPageObject = {
    type: "page",
    parent_id: null,
    children: [],
  };

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

    const object = findObject(object_id);
    setHighlightedObject(object);
    hideSiteMenu(true);
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
  const renderCustomComponents = () => {
    const keys = Object.keys(CustomComponents);
    return keys.map((key, index) => {
      const CustomComponent = CustomComponents[key];
      return <CustomComponent key={index} />;
    });
  };



  const PageEditor = ({ }) => {
    return (
      <div>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          A super simple page editor
        </Typography.Title>
        <Editor resolver={CustomComponents}>
          <Row gutter={[16, 16]}>
            <Col>
              <Frame>
                <div>
                { Object.keys(CustomComponents).map((key, index) => {
                  const CustomComponents = CustomComponents[key];
                   return <CustomComponents key={index} />;
                }) }
                </div>
              </Frame>
            </Col>
            <Col span={6}>
                <div>
                  <Toolbox/>
                  <SettingsPanel/>
                </div>
            </Col>
          </Row>
        </Editor>
      </div>
    );
  };

  return (
    <div className="page-builder-container">
      {!isModalOpen && (
        <div>
          <div className="page-builder-header">Page Builder</div>
          <div className="page-builder">
            <div
              className="page-builder-plus-button"
              onClick={() => addNewObject(newPageObject)}
            ></div>
            <div className="page-builder-pages-container">
              {currentSiteObjects &&
                currentSiteObjects.map(siteObject => (
                  <PagePreview siteObject={siteObject} key={siteObject._id} />
                ))}
            </div>
          </div>
        </div>
      )}
      {isModalOpen && highlightedObject && (
        <PageEditor />
      )}
    </div>
  );
};

export default PageBuilder;
