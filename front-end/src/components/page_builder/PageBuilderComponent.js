import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _, { update } from "lodash";
import "./styles.css";
import PropTypes from "prop-types";
import { Popover, PopoverInteractionKind, Position, Button, Menu, MenuItem, FormGroup, Tag, Switch, } from "@blueprintjs/core";
import Footer from "components/navigation/Footer";
import TextElement from "./components/TextElement";
import VideoElement from "./components/VideoElement";
import ImageElement from "./components/ImageElement";
import ListElement from "./components/ListElement";
import PageForm from "./PageForm";
import { v4 as uuidv4 } from 'uuid';

const PageBuilderComponent = React.memo((props) => {
    const ReactGridLayout = WidthProvider(RGL);

    const [items, setItems] = useState([]);

    const updatedLayout = useRef([]);
    const [editable, setEditable] = useState(false);
    const [newCounter, setNewCounter] = useState(0);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [currentData, setCurrentData] = useState(null);

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

    const createElement = (el, onRemoveItem, onAddItemType) => {

        return (
            <div
                className={`test`}
                key={el.i}
                data-grid={el}
                style={{ position: "relative", height: "100%" }}
            >
                {/* <span className={`react-grid-dragHandleExample`}>[DRAG HERE]</span> */}
                {el.type === "text" || !el.type ? (
                    <TextElement editComponent={editComponent} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "image" ? (
                    <ImageElement editComponent={editComponent} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "video" ? (
                    <VideoElement editComponent={editComponent} style={{ height: "100%" }} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "container" ? (
                    // <ShowcaseLayout iteration={iteration + 1} onLayoutChange={props.onLayoutChange} />
                    <ListElement editComponent={editComponent} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : null}
            </div>
        );
    };

    const onSavePage = () => {
        let updated_page = { ...currentData, layout: updatedLayout.current };
        props.savePage(updated_page);
        //setItems((prevItems) => [...prevItems]);
    }

    const onAddItemType = (type) => {
        // const cols = props.cols || { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
        const cols = 12;
        const currentLayout = items;
        console.log(currentLayout);

        const newItem = {
            i: uuidv4(), 
            x: (currentLayout.length * 2) % (cols[currentBreakpoint] || 12),
            y: currentLayout.length, // puts it at the bottom
            w: 2,
            h: 2,
            type: type,
            style: {}
        };

        if (type === "header" || type === "footer" || type === "container") {
            newItem.w = Infinity;
        }
        if (type === "image" || type === "video") {
            newItem.src = ""; // Provide the source for the image or video here
        }
        console.log(newItem);
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
        if (layout.length > 0) {
            const new_layout = layout.map(object => {
                const current_item = items.find(item => item.i == object.i);
                return { ...current_item, ...object }
            });
            console.log(new_layout);
            updatedLayout.current = new_layout;
        }
    }

    const displayMenu = () => {
        const menuItems = [
            { id: "text", label: "Add Text" },
            { id: "image", label: "Add Image" },
            { id: "video", label: "Add Video" },
            { id: "container", label: "Add Container" },
            { id: "footer", label: "Add Footer" },
            { id: "header", label: "Add Header" },
        ];

        return (
            <Menu>
                {menuItems.map((menuItem) => (
                    <MenuItem
                        key={menuItem.id}
                        text={menuItem.label}
                        onClick={() => {
                            onAddItemClick(menuItem.id);
                        }}
                    />
                ))}
            </Menu>
        );
    };

    return (
        <div className="grid">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Popover
                    content={displayMenu()}
                    placement="bottom"
                >
                    <Button icon="add" text="Add Item" />
                </Popover>
                <Button onClick={() => onSavePage()}>Save</Button>
            </div>
            {currentData && (<PageForm callbackFunction={onInputChange} page={{ name: currentData.name, route: currentData.route, status: currentData.status, style: currentData.style }} />)}
            {currentData && (<div className="grid-layout-container">
                <ReactGridLayout
                    onLayoutChange={changeLayout}
                    // onResize={onResize}
                    // onBreakpointChange={onBreakpointChange}
                    disabled={editable}
                    isDraggable={true}
                    isResizable={true}
                    {...props}
                    style={{ height: (currentData.style ? currentData.style.height : '100%') }}
                >
                    {items && _.map(items, (el) => createElement(el, onRemoveItem, onAddItemType))}
                </ReactGridLayout>
                <Footer />
            </div>)}
        </div>
    );
});

PageBuilderComponent.propTypes = {
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

PageBuilderComponent.defaultProps = {
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


export default PageBuilderComponent;
