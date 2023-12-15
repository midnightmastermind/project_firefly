import React, { useMemo, useState, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "./styles.css";
import PropTypes from "prop-types";
import { Popover, PopoverInteractionKind, Position, Button, Menu, MenuItem } from "@blueprintjs/core";
import UserList from "REVIEW/new/UserList";
import Header from "components/navigation/Header";
import Footer from "components/navigation/Footer";
import FooterElement from "./components/FooterElement";
import HeaderElement from "./components/HeaderElement";
import TextElement from "./components/TextElement";
import VideoElement from "./components/VideoElement";
import ImageElement from "./components/ImageElement";
import ListElement from "./components/ListElement";

const PageBuilderComponent = (props) => {
    const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

    const [items, setItems] = useState([]);

    const [editable, setEditable] = useState(false);
    const [newCounter, setNewCounter] = useState(0);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [lockGrid, setLockGrid] = useState(false);
    console.log(lockGrid);
    const createElement = (el, onRemoveItem, onAddItemType) => {
        const handleMouseEnter = (e) => {
            const cogsIcon = document.getElementById(`cogs-icon-${el.i}`);
            if (cogsIcon) {
                cogsIcon.style.visibility = "visible";
            }
        };

        const handleMouseLeave = (e) => {
            const cogsIcon = document.getElementById(`cogs-icon-${el.i}`);
            if (cogsIcon) {
                cogsIcon.style.visibility = "hidden";
            }
        };

        return (
            <div
                className="test"
                key={el.i}
                data-grid={el}
                style={{ position: "relative", height: "100%" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* <span className={`react-grid-dragHandleExample`}>[DRAG HERE]</span> */}
                {el.type === "text" || !el.type ? (
                    <TextElement setLockGrid={setLockGrid} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "image" ? (
                    <ImageElement setLockGrid={setLockGrid} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "video" ? (
                    <VideoElement setLockGrid={setLockGrid} style={{ height: "100%" }} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "container" ? (
                    // <ShowcaseLayout iteration={iteration + 1} onLayoutChange={props.onLayoutChange} />
                    <ListElement setLockGrid={setLockGrid} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : null}
            </div>
        );
    };
    const handleComponentSelection = (el) => {
        setSelectedComponent(el);
    };
    const handleMouseEnter = (e) => {
        e.currentTarget.querySelector('.cogs-icon').style.visibility = 'visible';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.querySelector('.cogs-icon').style.visibility = 'hidden';
    };

    const printTreeStructure = (el) => {
        console.log(el); // Replace with your desired tree structure print logic
    };

    const onAddItem = () => {
        console.log("adding", "n" + newCounter);
        const cols = props.cols || { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
        const currentLayout = items;
        const newItem = {
            i: "n" + newCounter,
            x: (currentLayout.length * 2) % (cols[currentBreakpoint] || 12),
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 1,
            type: "text", // default to text type
        };
        setItems([...items, newItem]);
        setNewCounter(newCounter + 1);
    };

    const onAddItemType = (type) => {
        console.log("adding", "n" + newCounter);
        const cols = props.cols || { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
        const currentLayout = items;

        const newItem = {
            i: "n" + newCounter,
            x: (currentLayout.length * 2) % (cols[currentBreakpoint] || 12),
            y: currentLayout.length, // puts it at the bottom
            w: 2,
            h: 2,
            type: type,
        };

        if (type === "header" || type === "footer" || type === "container") {
            newItem.w = Infinity;
        }
        if (type === "image" || type === "video") {
            newItem.src = ""; // Provide the source for the image or video here
        }
        setItems([...items, newItem]);
        setNewCounter(newCounter + 1);
    };

    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint);
    };

    const onRemoveItem = (i) => {
        console.log("removing", i);
        const updatedItems = _.reject(items, { i: i });
        setItems(updatedItems);
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const onAddItemClick = (itemType) => {
        onAddItemType(itemType);
    };

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
                            setIsPopoverOpen(false);
                        }}
                    />
                ))}
            </Menu>
        );
    };
    return (
        <div className="grid">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Popover
                content={displayMenu()}
                isOpen={isPopoverOpen}
                onInteraction={(state) => setIsPopoverOpen(state)}
                placement="bottom"
            >
                <Button icon="add" text="Add Item" />
            </Popover>
            {editable ? (<Button onClick={() => setEditable(true)}>Edit</Button>) : (<Button onClick={() => setEditable(false)}>Save</Button>)}
            </div>
            {/* <Header /> */}
            <ResponsiveReactGridLayout
                // onLayoutChange={onLayoutChange}
                onBreakpointChange={onBreakpointChange}
                disabled={editable}
                isDraggable={!lockGrid}
                isResizable={!lockGrid} 
                {...props}
            >
                {items && _.map(items, (el) => createElement(el, onRemoveItem, onAddItemType))}
            </ResponsiveReactGridLayout>
            <Footer />
        </div>
    );
};

PageBuilderComponent.propTypes = {
    onLayoutChange: PropTypes.func.isRequired,
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
    onLayoutChange: function () { },
    cols: { lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 },
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
