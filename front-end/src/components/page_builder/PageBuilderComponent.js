import React, { useState, useEffect, useRef, memo } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import PropTypes from "prop-types";
import { Popover, PopoverInteractionKind, Position, Button, Menu, MenuItem, FormGroup, Tag, Switch, Divider, Collapse, Tab } from "@blueprintjs/core";
import Footer from "components/navigation/Footer";
import TextElement from "./components/TextElement";
import VideoElement from "./components/VideoElement";
import ImageElement from "./components/ImageElement";
import ListElement from "./components/ListElement";
import NavElement from "./components/NavElement";
import CardElement from "./components/CardElement";

import CogButton from "./component_settings/CogButton";
import PageForm from "./PageForm";
import { v4 as uuidv4 } from 'uuid';
import ComponentHeader from "./component_settings/ComponentHeader";

const ReactGridLayout = WidthProvider(RGL);

const scalingArray = [.11, .11, .24, .36, .48, .60, .73, .85, .97, 1, 1, 1, 1];

const PageBuilderComponent = memo((props) => {
    const [items, setItems] = useState([]);
    const [mouseDownTime, setMouseDownTime] = useState(0);
    const [mouseUpTime, setMouseUpTime] = useState(0);
    const [draggedItemType, setDraggedItemType] = useState(null);
    const updatedLayout = useRef([]);
    const [editable, setEditable] = useState(false);
    const [newCounter, setNewCounter] = useState(0);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [currentData, setCurrentData] = useState(null);
    const [isToolboxOpen, setIsToolboxOpen] = useState(false);
    const [isPageSettingsOpen, setIsPageSettingsOpen] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        if (props.page) {
            setCurrentData(props.page);
        }
    }, [props.page]);

    useEffect(() => {
        if (props.layout) {
            setItems(props.layout);
            setNewCounter(props.layout.length)
            updatedLayout.current = props.layout;
            // setScalingFactors(props.layout);
        }
    }, [props.layout]);

    useEffect(() => {
        const handleScroll = () => {
          const topbar_element = document.querySelector('.page-builder-header-topbar');
          const toolbox_element = document.querySelector('.page-toolbox');
          const settings_element = document.querySelector('.page-settings');

          if (topbar_element.getBoundingClientRect().top >= 0) {
            topbar_element.style.position = 'absolute';
            topbar_element.style.top = '0px';
          }
    
          if (topbar_element.getBoundingClientRect().top < 0) {
            topbar_element.style.position = 'fixed';
            topbar_element.style.top = '0px';
          }
          console.log("hit2");
          console.log(toolbox_element.getBoundingClientRect().top);
          if (toolbox_element.getBoundingClientRect().top >= 32) {
            toolbox_element.style.position = 'absolute';
            toolbox_element.style.top = '32px';
            settings_element.style.position = 'absolute';
            settings_element.style.top = '32px';
          }
    
          if (toolbox_element.getBoundingClientRect().top < 0) {
            toolbox_element.style.position = 'fixed';
            toolbox_element.style.top = '32px';
            settings_element.style.position = 'fixed';
            settings_element.style.top = '32px';
          }
        };
    
        // Replace '.scrollable-container' with the actual class of your scrollable container
        const scrollableContainer = document.querySelector('#root');

        if (scrollableContainer) {
          scrollableContainer.addEventListener('scroll', handleScroll);
    
          // Clean up the event listener when the component unmounts
          return () => {
            scrollableContainer.removeEventListener('scroll', handleScroll);
          };
        }
      }, []); // The empty dependency array ensures the effect runs only once on mount


    const onInputChange = (variable, value, isStyle) => {
        let editedData = structuredClone(currentData);
        if (isStyle) {
            editedData.style[variable] = value;
        } else {
            editedData[variable] = value;
        }

        setCurrentData(editedData);
    }


    const editComponent = (element, variable, value, isStyle) => {
        setItems(prevItems => {
            const editedData = [...prevItems]; // Create a new array to avoid mutating the state
    
            let editedComponent = editedData.find(item => item.i === element.i);
            const index = editedData.findIndex(item => item.i === element.i);
    
            if (editedComponent.w !== element.w || editedComponent.h !== editedComponent.h) {
                editedComponent = {...editedComponent, w: element.w};
                editedComponent = {...editedComponent, h: element.h};
            }
            if (isStyle) {
                editedComponent.style[variable] = value;
            } else {
                editedComponent[variable] = value;
            }
    
            editedData[index] = editedComponent;
            console.log(editedData[index]);
            return editedData;
        });
    };
    
    const createElement = (el, isNew) => {
        if (!el.i) {
            el.i = uuidv4();
            el.style = {}
        }

        return (
            <div
                className={`test component ${isNew ? 'droppable-element toolbox-item' : ''}`}
                key={el.i}
                draggable={isNew}
                data-grid={el ? el : null}
                style={{ position: "relative", height: "100%" }} // Include the component's style
                unselectable="true"
                // onMouseDown={onMouseDown}
                // onMouseUp={onMouseUp}
                onDragStart={(event) => {
                    onDragStart(event, el.type);
                }}
            >
                <ComponentHeader element={el} onRemoveItem={onRemoveItem} editComponent={editComponent} />
                {el.type === "text" || !el.type ? (
                    <TextElement
                        editComponent={editComponent}
                        onAddItemType={onAddItemType}
                        element={el}
                        style={el.style} // Pass the style to the component
                    />
                ) : el.type === "image" ? (
                    <ImageElement
                        editComponent={editComponent}
                        onAddItemType={onAddItemType}
                        element={el}
                        style={el.style} // Pass the style to the component
                    />
                ) : el.type === "video" ? (
                    <VideoElement
                        editComponent={editComponent}
                        style={{ height: "100%", ...el.style }} // Include additional styling if needed
                        onAddItemType={onAddItemType}
                        element={el}
                    />
                ) : el.type === "list" ? (
                    <ListElement
                        editComponent={editComponent}
                        onAddItemType={onAddItemType}
                        layout={updatedLayout.current}
                        element={el}
                        style={el.style} // Pass the style to the component
                    />
                ) : el.type === "nav" ? (
                    <NavElement
                        editComponent={editComponent}
                        onAddItemType={onAddItemType}
                        element={el}
                        style={el.style} // Pass the style to the component
                    />
                ) : el.type === "card" ? (
                    <CardElement
                        editComponent={editComponent}
                        onAddItemType={onAddItemType}
                        element={el}
                        data={currentUser}
                        style={el.style} // Pass the style to the component
                    />
                ) : null}
            </div>
        );
    };

    const onSavePage = () => {
        let updated_page = { ...currentData, layout: updatedLayout.current };
        props.savePage(updated_page);
    }

    const onAddItemType = (type, element) => {
        const newItem = {
            i: element.i,
            x: element.x,
            y: element.y,
            h: element.h,
            w: element.w,
            type: type,
            style: {},
            content: ""
        };

        const old_item = updatedLayout.current.find((item) => item.i === newItem.i);
        if (old_item) {
            Object.assign(old_item, newItem);
        }

        setItems(updatedLayout.current);
        setNewCounter(newCounter + 1);
    };

    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint);
    };

    const onRemoveItem = (i, event) => {
        event.stopPropagation();
        event.preventDefault(); // Add preventDefault to stop any default button behavior
        const updatedItems = _.reject(updatedLayout.current, { i: i });

        updatedLayout.current = updatedItems;
        setItems(updatedItems);
    };

    const onAddItemClick = (itemType) => {
        onAddItemType(itemType);
    };

    const changeLayout = (layout) => {
        if (layout.length > 0) {
            const new_layout = layout.map(object => {
                const current_item = items.find(item => item.i == object.i);
                return { ...current_item, ...object }
            });

            updatedLayout.current = new_layout;
        }
    }

    // const onDragStart = (event) => {
    //     event.dataTransfer.setData("text/plain", "");
    //     // setDraggedItemType(type);
    //     // console.log(type);
    //     const pointerType = event.pointerType || 'mouse';
    //     console.log("Pointer Type:", pointerType);

    //     console.log("onDragStart");
    // };

    // const onDrop = (event) => {
    //     console.log("onDrop");
    //     event.preventDefault();
    //     // if (draggedItemType) {
    //     //     onAddItemType(draggedItemType);
    //     //     setDraggedItemType(null);
    //     // }
    // };

    // const onDragOver = (event) => {
    //     console.log("onDragOver");
    //     event.preventDefault();
    // };

    // const onDrag = (event, { element, x, y }) => {
    //     const updatedItems = items.map((item) => {
    //         if (item.i === element.i) {
    //             // Update the x and y positions of the dragged element
    //             return { ...item, x, y };
    //         }
    //         return item;
    //     });

    //     setItems(updatedItems);
    // };

    // ...

    const onDragStart = (event, type) => {
        event.dataTransfer.setData("text/plain", "");

        if (event.target.classList.contains('droppable-element')) {
            event.dataTransfer.setData("type", type);
        }

        // event.stopPropagation();
        // event.preventDefault();
    };

    const onDrop = (layout, layoutItem, _event) => {
        const type = _event.dataTransfer.getData("type");

        if (type !== "") {
            onAddItemType(type, layoutItem);
        }
    };

    const onResizeStop = (layout, item) => {
      console.log(layout);  
      console.log(item);

      const updatedItem = layout.find((object) => (object.i == item.i));
      console.log(updatedItem);
    //   editComponent(updatedItem, 'scalingFactor', calculateScalingFactor(updatedItem.w));
    };

    const onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
        changeLayout(layout);
    };

    const onMouseDown = () => {
        setMouseDownTime(Date.now());
    };

    const onMouseUp = () => {
        setMouseUpTime(Date.now());
        const timeDifference = mouseUpTime - mouseDownTime;

        // Adjust the threshold as needed, here set to 200 milliseconds
        if (timeDifference < 200) {
            // Treat it as a click, prevent the drag event
            setMouseUpTime(0);
            setMouseDownTime(0);
        }
    };

    const calculateScalingFactor = (width) => {
        return scalingArray[width];
    }
    
    return (
        <div className="grid page-builder-app">
            {/* <div className="page-builder-header-topbar">
                <div className="page-builder-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button icon="add" onClick={() => { setIsToolboxOpen(!isToolboxOpen); setIsPageSettingsOpen(false); }} >
                        Add Item
                    </Button>
                    <Button icon="cog" onClick={() => { setIsPageSettingsOpen(!isPageSettingsOpen); setIsToolboxOpen(false); }}>
                        Settings
                    </Button>
                    <Button icon="save" onClick={() => onSavePage()}>Save</Button>
                </div>
                <Divider vertical={true} />
                <Collapse className="page-settings" isOpen={isPageSettinsOpen}>
                    {currentData && (<PageForm callbackFunction={onInputChange} page={{ name: currentData.name, route: currentData.route, status: currentData.status, style: currentData.style }} />)}
                    <Divider vertical={true} />
                </Collapse>
                <Collapse className="page-toolbox" isOpen={isToolboxOpen}>
                    {createElement({ type: 'text' }, true)}
                    {createElement({ type: 'video' }, true)}
                    {createElement({ type: 'image' }, true)}
                    {createElement({ type: 'container' }, true)}
                    {createElement({ type: 'header' }, true)}
                </Collapse>
            </div>
            {currentData && (<div className="grid-layout-container"> */}
            <div className="page-builder-header-topbar">
                <div className="page-builder-header">
                    <Button icon="add" onClick={() => { setIsToolboxOpen(!isToolboxOpen); setIsPageSettingsOpen(false); }}>
                        Add Item
                    </Button>
                    <Button icon="cog" onClick={() => { setIsPageSettingsOpen(!isPageSettingsOpen); setIsToolboxOpen(false); }}>
                        Settings
                    </Button>
                    <Button icon="save" onClick={() => onSavePage()}>Save</Button>
                </div>
                <Divider />
            </div>
            <Collapse className="page-settings" isOpen={isPageSettingsOpen}>
                {currentData && (
                    <div>
                        <PageForm callbackFunction={onInputChange} page={{ name: currentData.name, route: currentData.route, status: currentData.status, style: currentData.style }} />
                        <Divider />
                    </div>
                )}
            </Collapse>
            <Collapse className="page-toolbox" isOpen={isToolboxOpen}>
                <div className="page-drag-elements">
                    {createElement({ type: 'text' }, true)}
                    {createElement({ type: 'video' }, true)}
                    {createElement({ type: 'image' }, true)}
                    {createElement({ type: 'list' }, true)}
                    {createElement({ type: 'nav' }, true)}
                    {createElement({ type: 'card' }, true)}

                </div>
                <Divider />
            </Collapse>
            {currentData && (
                <div className="grid-layout-container">
                    <ReactGridLayout
                        layout={updatedLayout.current}
                        onLayoutChange={(layout, currentLayout) => {
                            console.log("Layout changed:", layout);
                            changeLayout(layout);
                        }}
                        isDraggable={true}
                        draggableCancel={'.component-header'}
                        isResizable={true}
                        onDragStop={onDragStop}
                        onResizeStop={onResizeStop}
                        isDroppable={true}
                        {...props}
                        // onResize={handleResize}
                        cols={12}
                        droppingItem={{ i: uuidv4(), w: 1, h: 2 }}
                        onDrop={onDrop}
                        // onDropDragOver={(event) => {return {w:2, h:2}}}
                        // style={{ height: (currentData.style ? currentData.style.height : '100%') }}
                        autoSize={true}
                    >
                        {items && _.map(items, (el) => createElement(el, false))}
                    </ReactGridLayout>
                </div>)}
        </div>
    );
});

PageBuilderComponent.defaultProps = {
    className: "layout",
    rowHeight: 60,
    cols: { lg: 12 },
    compactType: null,
    usePortal: true,
    margin: [0, 0],
    containerPadding: [0, 0],
    preventCollision: true,
    allowOverlap: true,
    autoSize: true,
    initialLayout: [{ i: "text-0", x: 0, y: 0, w: 2, h: 1, static: false }],
};

export default PageBuilderComponent;