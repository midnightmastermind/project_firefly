import React, { useState, useEffect } from 'react';
import { ButtonGroup, Switch } from '@blueprintjs/core';
import FontPopover from './FontPopover';
import BackgroundPopover from './BackgroundPopover';
import BorderPopover from './BorderPopover';
import SizePopover from './SizePopover';
import SpacingPopover from './SpacingPopover';

const EditorComponent = ({ className, getObjectPropertiesById, updateObjectPropertiesById, page, selectedNode }) => {
    const defaultElementStyle = {
        backgroundColor: 'white',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 0,
        color: 'black',
        fontFamily: 'Arial, sans-serif',
        fontSize: 12,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'center',
        borderRadius: 0,
        width: 200,
        height: 100,
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundImage: ''
    };

    const [elementStyle, setElementStyle] = useState(defaultElementStyle);
    const [hideElement, setHideElement] = useState(false);

    const mergeStyles = (defaultStyle, newStyle) => {
        const mergedStyle = { ...defaultStyle };
        for (const [key, value] of Object.entries(newStyle)) {
            // Check if the value is a numerical string
            if (!isNaN(value) && value !== '' && typeof value !== 'boolean') {
                mergedStyle[key] = parseFloat(value); // Convert the string to a number
            } else {
                mergedStyle[key] = value;
            }
        }
        return mergedStyle;
    };
    
    useEffect(() => {
        if (selectedNode && page) {
            const objectProperties = getObjectPropertiesById(selectedNode);
            console.log(objectProperties);
            if (objectProperties) {
                if (objectProperties.hidden) {
                    setHideElement(true);
                } else {
                    setHideElement(false);
                    const { style } = objectProperties;
                    const mergedStyleObject = mergeStyles(defaultElementStyle, style); // Modify this line
                    setElementStyle(mergedStyleObject);
                }
            }
        }
    }, [selectedNode, page, getObjectPropertiesById]);

    const handleInputChange = (property, value) => {
        let updatedValue = value;
    
        // Convert numerical values to string with 'px' at the end
        if (typeof value === 'number') {
            updatedValue = `${value}px`;
        }
    
        setElementStyle(prevState => ({
            ...prevState,
            [property]: updatedValue
        }));
    
        const updatedProperties = { style: { [property]: updatedValue } };
        updateObjectPropertiesById(selectedNode, updatedProperties);
    };

    const handleHideElement = () => {
        setHideElement(!hideElement);
        const updatedProperties = { hidden: !hideElement};
        updateObjectPropertiesById(selectedNode, updatedProperties);
    }

    return (
        <div className={className}>
        <div className="quick-style">
            <Switch checked={hideElement} label="Hide Container" onClick={() => handleHideElement()}/>
        </div>
        <div className="style-menus">
            <div>Style Menus: </div>
            <ButtonGroup>
                <FontPopover
                    elementStyle={elementStyle}
                    handleInputChange={handleInputChange}
                />
                <BackgroundPopover
                    elementStyle={elementStyle}
                    handleInputChange={handleInputChange}
                />
                <BorderPopover
                    elementStyle={elementStyle}
                    handleInputChange={handleInputChange}
                />
                <SizePopover
                    elementStyle={elementStyle}
                    handleInputChange={handleInputChange}
                />
                <SpacingPopover
                    elementStyle={elementStyle}
                    handleInputChange={handleInputChange}
                />
            </ButtonGroup>
        </div>
        </div>
    );
};

export default EditorComponent;