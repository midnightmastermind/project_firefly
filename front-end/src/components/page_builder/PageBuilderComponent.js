import React, { useState, useEffect, useRef, useMemo } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import "./styles.css";
import PropTypes from "prop-types";
import { Popover, PopoverInteractionKind, Position, Button, Menu, MenuItem, FormGroup, Tag, Switch, Divider, Collapse, Tab } from "@blueprintjs/core";
import Footer from "components/navigation/Footer";
import TextElement from "./components/TextElement";
import VideoElement from "./components/VideoElement";
import ImageElement from "./components/ImageElement";
import ListElement from "./components/ListElement";
import CogButton from "./CogButton";
import PageForm from "./PageForm";
import { v4 as uuidv4 } from 'uuid';
import ComponentHeader from "./component_settings/ComponentHeader";

const PageBuilderComponent = (props) => {
    const ReactGridLayout = useMemo(() => WidthProvider(RGL, []));
    const [items, setItems] = useState([]);

    const [draggedItemType, setDraggedItemType] = useState(null);

    const updatedLayout = useRef([]);
    const [editable, setEditable] = useState(false);
    const [newCounter, setNewCounter] = useState(0);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [currentData, setCurrentData] = useState(null);
    const [isToolboxOpen, setIsToolboxOpen] = useState(false);
    const [isPageSettingsOpen, setIsPageSettingsOpen] = useState(false);

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
        }
    }, [props.layout])

    const onInputChange = (variable, value, isStyle) => {
        let editedData = structuredClone(currentData);
        if (isStyle) {
            editedData.style[variable] = value;
        } else {
            editedData[variable] = value;
        }

        setCurrentData(editedData);
    }

    const handleTabChange = () => {

    }

    const editComponent = (i, variable, value, isStyle) => {
        console.log(i);
        console.log(variable);
        console.log(value);
        console.log(isStyle);
        let editedData = structuredClone(items);
        console.log(editedData);
        let editedComponent = editedData.find(item => item.i == i);
        console.log(editedComponent);
        let index = editedData.findIndex(item => item.i == i);
        console.log(index);
        if (isStyle) {
            editedComponent.style[variable] = value;
        } else {
            editedComponent[variable] = value;
        }

        editedData[index] = editedComponent;

        setItems(editedData);
    }

    const createElement = (el, isNew) => {
        if (!el.i) {
            el.i = uuidv4();
        }

        return (
            <div
                className={`test component ${isNew ? 'droppable-element toolbox-item' : ''}`}
                key={el.i}
                draggable={isNew}
                data-grid={el ? el : null}
                style={{ position: "relative", height: "100%" }}
                unselectable={true}
                onDragStart={(event) => {onDragStart(event, el.type)}}
            >
                <ComponentHeader />
                {el.type === "text" || !el.type ? (
                    <TextElement editComponent={editComponent} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "image" ? (
                    <ImageElement editComponent={editComponent} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "video" ? (
                    <VideoElement editComponent={editComponent} style={{ height: "100%" }} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "container" ? (
                    <ListElement editComponent={editComponent} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : null}
            </div>
        );
    };

    const onSavePage = () => {
        let updated_page = { ...currentData, layout: updatedLayout.current };
        props.savePage(updated_page);
    }

    const onAddItemType = (type, element) => {
        const cols = 12;
        const currentLayout = items;
        console.log(element);
        const newItem = {
            i: element.i,
            x: element.x,
            y: element.y,
            h: element.h,
            w: element.w,
            type: type,
            style: {}
        };

        setItems([...items, newItem]);
        setNewCounter(newCounter + 1);
    };

    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint);
    };

    const onRemoveItem = (id) => {
        const updatedItems = _.reject(items, { id: id });
        setItems(updatedItems);
    };

    const onAddItemClick = (itemType) => {
        onAddItemType(itemType);
    };

    const changeLayout = (layout) => {
        console.log(layout);
        console.log("layout");
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
        console.log(type);
        if (event.target.classList.contains('droppable-element')) {
            event.dataTransfer.setData("type", type);
        }
        // event.stopPropagation();
		// event.preventDefault();
    };

    const onDrop = (layout, layoutItem, _event) => {
        const type = _event.dataTransfer.getData("type");
        // console.log(type);
        // if (type !== "") {
            onAddItemType(type, layoutItem);
        // }

        //console.log(`Dropped element type: ${type}`);
        console.log(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
    };
    return (
        <div className="grid page-builder-app">
            <div className="page-builder-header-topbar">
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
                <Collapse className="page-settings" isOpen={isPageSettingsOpen}>
                    {currentData && (<PageForm callbackFunction={onInputChange} page={{ name: currentData.name, route: currentData.route, status: currentData.status, style: currentData.style }} />)}
                    <Divider vertical={true} />
                </Collapse>
                <Collapse className="page-toolbox" isOpen={isToolboxOpen}>
                    {createElement({ type: 'text' }, true)}
                    {createElement({ type: 'video' }, true)}
                    {createElement({ type: 'image' }, true)}
                    {createElement({ type: 'container' }, true)}
                </Collapse>
            </div>
            {currentData && (<div className="grid-layout-container">
                <ReactGridLayout
                    onLayoutChange={changeLayout}
                    isDraggable={true}
                    isResizable={true}
                    isDroppable={true}
                    {...props}
                    cols={12}
                    droppingItem={{i: uuidv4(), w: 1, h: 2}}
                    onDrop={onDrop}
                    // onDropDragOver={(event) => {return {w:2, h:2}}}
                    style={{ height: (currentData.style ? currentData.style.height : '100%') }}
                >
                    {items && _.map(items, (el) => createElement(el, false))}
                </ReactGridLayout>
            </div>)}
        </div>
    );
};

PageBuilderComponent.propTypes = {
    className: PropTypes.string,
    rowHeight: PropTypes.number,
    cols: PropTypes.object,
    initialLayout: PropTypes.array,
    compactType: PropTypes.string,
    portalContainer: PropTypes.element,
    usePortal: PropTypes.bool,
    preventCollision: PropTypes.bool,
    margin: PropTypes.array,
    containerPadding: PropTypes.array
};

PageBuilderComponent.defaultProps = {
    className: "layout",
    rowHeight: 60,
    cols: 12,
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