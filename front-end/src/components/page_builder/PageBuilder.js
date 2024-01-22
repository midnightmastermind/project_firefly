import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as CustomComponents from "./CustomPageBuilderComponents.js";
import { create as createPage, update as updatePage, getAll as getAllPages } from 'slices/site_building/page.js';

import TestMarkdown from "../tools/markdown_editor/MarkdownEditor";
import PageBuilderComponent from "./PageBuilderComponent";
import { Tabs, Tab, Button } from "@blueprintjs/core";
import PageForm from "./PageForm";
import { DEFAULT_STYLES } from "./constants";
import WebPagePreview from "components/common/WebpagePreview";
import { v4 as uuidv4 } from 'uuid';

const PageBuilder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [layout, setLayout] = useState([]);
  const [currentSite, setCurrentSite] = useState(false);
  const [currentPages, setCurrentPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  const pages = useSelector(state => state.page.pages);
  const current_site = useSelector(state => state.site.current_site);
  const dispatch = useDispatch();

  useEffect(() => {
    if (current_site) {
      setCurrentSite(current_site);
    }

    if (pages) {
      setCurrentPages(pages);

      if (currentPage) {
        const updatedPage = pages.find((page)=> page._id == currentPage._id);
        setCurrentPage(updatedPage);
      }
    }
  }, [pages, current_site]);

  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  const addPage = () => {
    const new_page = {
      name: `Untitled`,
      route: uuidv4(), 
      layout: [],
      status: false,
      style: { height: '90vh'}
    };
    new_page.site_id = currentSite._id;

    dispatch(createPage(new_page))
      .unwrap()
      .then(data => {
        dispatch(getAllPages());
      })
      .catch(e => {
        console.log(e);
      });
  };


  const savePage = page => {
    const updated_page = page;

    updated_page.site_id = currentSite._id;

    dispatch(updatePage({ id: page._id, data: updated_page }))
      .unwrap()
      .then(data => {
        dispatch(getAllPages());
      })
      .catch(e => {
        console.log(e);
      });
  };

  const toggleModal = (page) => {
    setIsModalOpen(prevState => !prevState);
    setCurrentPage(page);
  };

  const PagePreview = ({ siteObject }) => {
    return (
      <div key={siteObject._id} className="page-preview-block" onClick={() => toggleModal(siteObject)}>
        <WebPagePreview url={`${currentSite.domain == 'main' ? '' : currentSite.domain}/${siteObject.route}`} /> 
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
                onClick={() => addPage()}
              ></Button>
            </div>
            <Tabs id="toolbox-tabs" renderActiveTabPanelOnly={true}>
              <Tab
                id="published-tab"
                title="Published Pages"
                panel={
                  <div className="page-builder-pages-container">
                    {currentPages &&
                      currentPages.map(siteObject => (
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
                    {currentPages &&
                      currentPages.map(siteObject => (
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
                    {currentPages &&
                      currentPages.map(siteObject => (
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
        isModalOpen && currentPage && (
        <div className="app-site-builder">
          <PageBuilderComponent savePage={savePage} page={currentPage} layout={currentPage.layout} />
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