import React, { useState } from 'react';
import { Popover, Button, FormGroup, Slider } from '@blueprintjs/core';
import renderColorPicker from './renderColorPicker';
import renderNumericInput from './renderNumericInput';
const SpacingPopover = ({ ref, elementStyle, handleInputChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover
            isOpen={isOpen}
            onInteraction={setIsOpen}
            usePortal={true}
            portalContainer={ref}
            enforceFocus={true}
            placement="right-end"
            content={
                <div className="editor-content">
                    {renderNumericInput('Top Margin', 'marginTop', elementStyle, handleInputChange)}
                    {renderNumericInput('Bottom Margin', 'marginBottom', elementStyle, handleInputChange)}
                    {renderNumericInput('Left Margin', 'marginLeft', elementStyle, handleInputChange)}
                    {renderNumericInput('Right Margin', 'marginRight', elementStyle, handleInputChange)}
                    {renderNumericInput('Top Padding', 'paddingTop', elementStyle, handleInputChange)}
                    {renderNumericInput('Bottom Padding', 'paddingBottom', elementStyle, handleInputChange)}
                    {renderNumericInput('Left Padding', 'paddingLeft', elementStyle, handleInputChange)}
                    {renderNumericInput('Right Padding', 'paddingRight', elementStyle, handleInputChange)}
                </div>
            }
            interactionKind="click"
        >
            <Button icon="horizontal-inbetween" onClick={() => setIsOpen(!isOpen)}>
            </Button>
        </Popover>
    );
};

export default SpacingPopover;
