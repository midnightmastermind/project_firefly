import React, { useState } from 'react';
import { Popover, Button, FormGroup, HTMLSelect, InputGroup, Slider, ChromePicker } from '@blueprintjs/core';
import renderNumericInput from './renderNumericInput';
import renderColorPicker from './renderColorPicker';
const BorderPopover = ({ ref, handleInputChange, elementStyle }) => {
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
                   {renderNumericInput('Border Width', 'borderWidth', elementStyle, handleInputChange)}
                    {renderColorPicker('Border Color', 'borderColor', elementStyle, handleInputChange)}
                    {/* Rest of the code */}
                    <FormGroup label="Border Type">
                        <HTMLSelect
                            value={elementStyle.borderStyle}
                            onChange={(e) => handleInputChange('borderStyle', e.target.value)}
                        >
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                            <option value="double">Double</option>
                            {/* Add more options as needed */}
                        </HTMLSelect>
                    </FormGroup>
                </div>
            }
            interactionKind="click"
        >
            <Button icon="small-square" onClick={() => setIsOpen(!isOpen)}>
            </Button>
        </Popover>
    );
};

export default BorderPopover;
