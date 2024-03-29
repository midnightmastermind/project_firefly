import React from "react";
import PropTypes from "prop-types";
import RGL, { WidthProvider } from "react-grid-layout";
import TextElement from "components/page_builder/components/TextElement";
import ImageElement from "components/page_builder/components/ImageElement";
import VideoElement from "components/page_builder/components/VideoElement";
import ListElement from "components/page_builder/components/ListElement";
import CardElement from "components/page_builder/components/CardElement";
import NavElement from "components/page_builder/components/NavElement";

const ReactGridLayout = WidthProvider(RGL);

const PageComponent = (props) => {
  const createElement = (el) => {
    const custom_element = { ...el };

    return (
      <div
        className="test non-draggable"
        key={custom_element.i}
        draggable={false}
        unselectable="true"
        data-grid={custom_element}

        style={{ position: "relative", height: "100%", pointerEvents: el.type == "text" ? 'none' : "" }}
      >
        {/* <span className={`react-grid-dragHandleExample`}>[DRAG HERE]</span> */}
        {el.type === "text" || !custom_element.type ? (
          <TextElement element={custom_element} style={custom_element.style} />
        ) : el.type === "image" ? (
          <ImageElement element={custom_element} style={custom_element.style} />
        ) : el.type === "video" ? (
          <VideoElement style={{ height: "100%", ...custom_element.style }} element={custom_element} />
        ) : el.type === "list" ? (
          // <ShowcaseLayout iteration={iteration + 1} onLayoutChange={props.onLayoutChange} />
          <ListElement element={custom_element} style={custom_element.style} />
        ) : el.type === "nav" ? (
          <NavElement element={custom_element} style={custom_element.style} />
        ) : el.type === "card" ? (
          <CardElement style={{ height: "100%", ...custom_element.style }} element={custom_element} />
        ) : null}
      </div>
    );
  };

  return (
    <div className="page-component" >
    <div className="page-grid-container">
      {props.page.layout &&
      <div className="grid-layout-container">
        <ReactGridLayout
          disabled={false}
          isDraggable={false}
          isResizable={false}
          draggableCancel=".non-draggable"
          draggable={false}
          cols={12}
          layout={props.page.layout}
          isDroppable={false}
          autoSize={true}
          {...props}
          // style={{ height: (props.page.style ? props.page.style.height : '100%') }}
        >
          {props.page.layout.map((element) => createElement(element))}
        </ReactGridLayout>
      </div>
      }
    </div>
    </div>
  );
};

PageComponent.propTypes = {
  className: PropTypes.string,
  rowHeight: PropTypes.number,
  cols: PropTypes.object,
  initialLayout: PropTypes.array,
  verticalCompact: PropTypes.bool,
  compactType: PropTypes.string,
  portalContainer: PropTypes.element,
  usePortal: PropTypes.bool,
  preventCollision: PropTypes.bool,
  margin: PropTypes.array,
  containerPadding: PropTypes.array
};

PageComponent.defaultProps = {
  className: "layout",
  rowHeight: 60,
  cols: 12,
  verticalCompact: false,
  compactType: null,
  usePortal: true,
  margin: [0, 0],
  containerPadding: [0, 0],
  preventCollision: true,
  allowOverlap: true,
  autoSize: true,
  initialLayout: [{ i: "text-0", x: 0, y: 0, w: 2, h: 1, static: false }],
};

export default PageComponent;
