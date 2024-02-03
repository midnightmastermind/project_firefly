import React, { useEffect, useState, useRef } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import { Button, Divider, Collapse } from "@blueprintjs/core";
import TextElement from "./components/TextElement";
import VideoElement from "./components/VideoElement";
import ImageElement from "./components/ImageElement";
import ListElement from "./components/ListElement";
import ComponentHeader from "./component_settings/ComponentHeader";
import PageForm from "./PageForm";
import { v4 as uuidv4 } from 'uuid';

const ReactGridLayout = WidthProvider(RGL);

const DraggableElement = ({ editComponent, element, onAddItemType }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleElementClick = () => {
        if (!isDragging) {
            onAddItemType(element.type);
        }
    };

    const renderElement = () => {
        switch (element.type) {
            case "text":
                return <TextElement editComponent={editComponent} element={element} />;
            case "image":
                return <ImageElement editComponent={editComponent} element={element} />;
            case "video":
                return <VideoElement editComponent={editComponent} style={{ height: "100%" }} element={element} />;
            case "container":
                return <ListElement editComponent={editComponent} element={element} />;
            default:
                return null;
        }
    };

    return (
        <div
            key={element.i}
            data-grid={element}
            style={{ position: "relative", height: "100%" }}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleElementClick}
            className={`draggable-element component test ${isDragging ? 'dragging' : ''}`}
        >
            <ComponentHeader />
            {renderElement()}
            {element.type}
        </div>
    );
};

const PageBuilderComponent = React.memo((props) => {
    const [items, setItems] = useState([]);
    const updatedLayout = useRef([]);
    const [editable, setEditable] = useState(false);
    const [newCounter, setNewCounter] = useState(0);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [currentData, setCurrentData] = useState(null);
    const [isPageSettingsOpen, setIsPageSettingsOpen] = useState(false);
    const [isToolboxOpen, setIsToolboxOpen] = useState(false);

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

    const handleTabChange = (type, isOpen) => {
        switch (type) {
            case "toolbox":
                setIsToolboxOpen(isOpen);
                if (isPageSettingsOpen) {
                    setIsPageSettingsOpen(false);
                }
            case "page-settings":
                setIsPageSettingsOpen(isOpen);
                if (isToolboxOpen) {
                    setIsToolboxOpen(false);
                }
            default:
                break;
        }
    }

    const editComponent = (i, variable, value, isStyle) => {
        let editedData = structuredClone(items);
        let editedComponent = editedData.find(item => item.i === i);
        let index = editedData.findIndex(item => item.i === i);
        if (isStyle) {
            editedComponent.style[variable] = value;
        } else {
            editedComponent[variable] = value;
        }

        editedData[index] = editedComponent;
        setItems(editedData);
    }

    const Toolbox = () => {
        const onToolboxItemClick = (itemType) => {
            onAddItemType(itemType);
        };

        return (
            <div className="toolbox">
                <DraggableElement key={`toolbox-${uuidv4()}`} type="text" onAddItemType={onToolboxItemClick} />
                <DraggableElement key={`toolbox-${uuidv4()}`} type="image" onAddItemType={onToolboxItemClick} />
                <DraggableElement key={`toolbox-${uuidv4()}`} type="video" onAddItemType={onToolboxItemClick} />
                <DraggableElement key={`toolbox-${uuidv4()}`} type="container" onAddItemType={onToolboxItemClick} />
                {/* Add more DraggableElement components for each type */}
            </div>
        );
    };
    const onSavePage = () => {
        let updated_page = { ...currentData, layout: updatedLayout.current };
        props.savePage(updated_page);
    }

    const onAddItemType = (type) => {
        const cols = 12;
        const currentLayout = items;

        const newItem = {
            i: uuidv4(),
            x: (currentLayout.length * 2) % (cols[currentBreakpoint] || 12),
            y: currentLayout.length,
            w: 2,
            h: 2,
            type: type,
            style: {}
        };

        if (type === "header" || type === "footer" || type === "container") {
            newItem.w = Infinity;
        }
        if (type === "image" || type === "video") {
            newItem.src = "";
        }

        setItems((prevItems) => [...prevItems, newItem]);
        setNewCounter(newCounter + 1);
    };


    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint);
    };

    const onRemoveItem = (id) => {
        const updatedItems = _.reject(items, { id: id });
        setItems(updatedItems);
    };

    const changeLayout = (layout) => {
        // if (layout.length > 0) {
        //     const new_layout = layout.map(object => {
        //         const current_item = items.find(item => item.i === object.i);
        //         return { ...current_item, ...object }
        //     });
        //     updatedLayout.current = new_layout;
        // }
        if (layout.length > 0) {
            const new_layout = layout.map((object) => {
                const current_item = items.find((item) => item.i === object.i);
                return { ...current_item, ...object };
            });
            setItems(new_layout);
            updatedLayout.current = new_layout;
        }
    };


    return (
        <div className="grid page-builder-app">
            <div className="page-builder-header-topbar">
                <div className="page-builder-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button icon="add" text="Add Item" onClick={() => handleTabChange('toolbox', !isToolboxOpen)} />
                    <Button onClick={() => handleTabChange('page-settings', !isPageSettingsOpen)}>
                        Settings
                    </Button>
                    <Button onClick={() => onSavePage()}>Save</Button>
                </div>
                <Divider vertical={true} />
                <Collapse className="page-settings" isOpen={isPageSettingsOpen}>
                    {currentData && (<PageForm callbackFunction={onInputChange} page={{ name: currentData.name, route: currentData.route, status: currentData.status, style: currentData.style }} />)}
                    <Divider vertical={true} />
                </Collapse>
                <Collapse className="page-settings" isOpen={isToolboxOpen}>
                    <Toolbox onAddItemType={onAddItemType} />
                    <Divider vertical={true} />
                </Collapse>
            </div>
            {currentData && (<div className="grid-layout-container">
                <ReactGridLayout
                    onLayoutChange={changeLayout}
                    isDraggable={true}
                    isResizable={true}
                    {...props}
                    style={{ height: (currentData.style ? currentData.style.height : '100%') }}
                >
                    {items.map((el) => (
                        <DraggableElement key={el.i} editComponent={editComponent} element={el} onAddItemType={onAddItemType} />
                    ))}
                </ReactGridLayout>
            </div>)}
        </div>
    );
});

export default PageBuilderComponent;
