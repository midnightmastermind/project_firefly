import React, { useMemo, useState, useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import "./styles.css";
import PropTypes from "prop-types";
import { Popover, PopoverInteractionKind, Position, Button, Menu, MenuItem, FormGroup, Tag, Switch, } from "@blueprintjs/core";
import UserList from "REVIEW/new/UserList";
import Header from "components/navigation/Header";
import Footer from "components/navigation/Footer";
import FooterElement from "./components/FooterElement";
import HeaderElement from "./components/HeaderElement";
import TextElement from "./components/TextElement";
import VideoElement from "./components/VideoElement";
import ImageElement from "./components/ImageElement";
import ListElement from "./components/ListElement";
import PageForm from "./PageForm";

const PageBuilderComponent = (props) => {
    const ReactGridLayout = WidthProvider(RGL);

    const [items, setItems] = useState([]);

    const [editable, setEditable] = useState(false);
    const [newCounter, setNewCounter] = useState(0);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [lockGrid, setLockGrid] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {
        if (props.page) {
            console.log(props.page);
            setCurrentData(props.page);
        }
    }, [props.page]);

    useEffect(() => {
        if (props.layout) {
            console.log("hit");
            console.log(props.layout);
            setItems(props.layout);
            setNewCounter(props.layout.length)
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

    const editComponent = (id, variable, value, isStyle) => {
        console.log("hit builder");
        let editedData = structuredClone(items);
        let editedComponent = editedData.find(item => item._id == id);
        let index = editedData.findIndex(item => item._id == id);
        if (isStyle) {
            editedComponent.style[variable] = value;
        } else {
            editedComponent[variable] = value;
        }

        editedData[editedData] = editedComponent;

        setItems(items);
    }
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
                    <TextElement editComponent={editComponent} setLockGrid={setLockGrid} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "image" ? (
                    <ImageElement editComponent={editComponent} setLockGrid={setLockGrid} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "video" ? (
                    <VideoElement editComponent={editComponent} setLockGrid={setLockGrid} style={{ height: "100%" }} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : el.type === "container" ? (
                    // <ShowcaseLayout iteration={iteration + 1} onLayoutChange={props.onLayoutChange} />
                    <ListElement editComponent={editComponent} setLockGrid={setLockGrid} onAddItemType={onAddItemType} onRemoveItem={onRemoveItem} element={el} />
                ) : null}
            </div>
        );
    };

    const onSavePage = () => {
        let updated_page = { ...currentData, layout: items };
        console.log(updated_page);
        props.savePage(updated_page);
    }
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

    const generateDOM = () => {
        // Generate items with properties from the layout, rather than pass the layout directly
        const layout = this.generateLayout();
        return _.map(layout, function (l) {
            return (
                <div key={l.i} data-grid={l}>
                    <span className="text">{l.i}</span>
                </div>
            );
        });
    }

    const generateLayout = () => {
        const p = this.props;
        return _.map(new Array(p.items), function (item, i) {
            const w = _.random(1, 2);
            const h = _.random(1, 3);
            return {
                x: (i * 2) % 12,
                y: Math.floor(i / 6),
                w: w,
                h: h,
                i: i.toString()
            };
        });
    }

    const onLayoutChange = (layout) => {
        props.onLayoutChange(layout);
      }
    const onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
        // `oldLayoutItem` contains the state of the item before the resize.
        // You can modify `layoutItem` to enforce constraints.

        if (layoutItem.h < 3 && layoutItem.w > 2) {
            layoutItem.w = 2;
            placeholder.w = 2;
        }

        if (layoutItem.h >= 3 && layoutItem.w < 2) {
            layoutItem.w = 2;
            placeholder.w = 2;
        }
    }
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
        // const cols = props.cols || { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
        const cols = 12;
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

    const changeLayout = (layout) => {
        if (layout.length > 0) {
            const new_layout = layout.map(object => {
                const current_item = items.find(item => item.i == object.i);
                return { ...current_item, ...object }
            });

            setItems(new_layout);
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
                            setIsPopoverOpen(false);
                        }}
                    />
                ))}
            </Menu>
        );
    };
    console.log(currentData);
    return (
        <div className="grid">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Popover
                    content={displayMenu()}
                    isOpen={isPopoverOpen}
                    onInteraction={(state) => setIsPopoverOpen(state)}
                    placement="bottom"
                >
                    <Button icon="add" text="Add Item" />
                </Popover>
                <Button onClick={() => onSavePage()}>Save</Button>
            </div>
            {currentData && (<PageForm callbackFunction={onInputChange} page={{ name: currentData.name, route: currentData.route, status: currentData.status, style: currentData.style }} />)}
            {currentData && (<div className="grid-layout-container">
                <ReactGridLayout
                    // onLayoutChange={changeLayout}
                    // onResize={onResize}
                    // onBreakpointChange={onBreakpointChange}
                    disabled={editable}
                    isDraggable={!lockGrid}
                    isResizable={!lockGrid}
                    {...props}
                    style={{ height: (currentData.style ? currentData.style.height : '100%') }}
                >
                    {items && _.map(items, (el) => createElement(el, onRemoveItem, onAddItemType))}
                </ReactGridLayout>
                <Footer />
            </div>)}
        </div>
    );
};

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
