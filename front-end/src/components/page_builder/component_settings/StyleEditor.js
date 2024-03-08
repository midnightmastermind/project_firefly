import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  Slider,
  Popover,
  Button,
  InputGroup,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  TabPanel,
} from '@blueprintjs/core';
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';

import {
  create as createStyle,
  update as updateStyle,
  getAll as getAllStyles,
} from 'slices/site/style.js';

const StyleEditor = ({ element, styleCategory, editComponent }) => {
  const [elementStyle, setElementStyle] = useState(element.style || {});
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState('font'); // Default to the 'font' tab
  const dispatch = useDispatch();

  useEffect(() => {
    if (element.style) {
      setElementStyle(element.style);
    }
  }, [element.style]);

  useEffect(() => {
    const extractStylesFromElement = () => {
      console.log(element.style);
      if (selectedTab === 'font') {
        return {
          color: element.style?.color || 'white',
          fontFamily: element.style?.fontFamily || 'Arial, sans-serif',
          fontSize: element.style?.fontSize || 16,
        };
      } else if (selectedTab === 'border') {
        return {
          borderWidth: element.style?.borderWidth || 1,
          borderWidthRight: element.style?.borderWidthRight || 0,
          borderWidthTop: element.style?.borderWidthTop || 0,
          borderWidthBottom: element.style?.borderWidthBottom || 0,
          borderWidthLeft: element.style?.borderWidthLeft || 0,
          borderColor: element.style?.borderColor || 'white',
          borderColorRight: element.style?.borderColorRight || '',
          borderColorTop: element.style?.borderColorTop || '',
          borderColorBottom: element.style?.borderColorBottom || '',
          borderColorLeft: element.style?.borderColorLeft || '',
          borderStyle: element.style?.borderStyle || 'solid',
          borderStyleTop: element.style?.borderStyleTop || '',
          borderStyleBottom: element.style?.borderStyleBottom || '',
          borderStyleRight: element.style?.borderStyleRight || '',
          borderStyleLeft: element.style?.borderStyleLeft || '',
          borderRadius: element.style?.borderRadius || 0,
        };
      } else if (selectedTab === 'size') {
        return {
          width: element.style?.width || '100%',
          height: element.style?.height || '100%',
        };
      } else if (selectedTab === 'spacing') {
        return {
          marginRight: element.style?.marginRight || 0,
          marginTop: element.style?.marginTop || 0,
          marginBottom: element.style?.marginBottom || 0,
          marginLeft: element.style?.marginLeft || 0,
          paddingRight: element.style?.paddingRight || 0,
          paddingTop: element.style?.paddingTop || 0,
          paddingBottom: element.style?.paddingBottom || 0,
          paddingLeft: element.style?.paddingLeft || 0,
          margin: element.style?.margin || 0,
          padding: element.style?.padding || 10,
        };
      } else if (selectedTab === 'color') {
        return {
          opacity: element.style?.opacity || 1,
          backgroundColor: element.style?.backgroundColor || 'rgba(0, 0, 0, 0)',
        };
      }

      return {};
    };
    const initialStyles = extractStylesFromElement();
    setElementStyle(initialStyles);
  }, [selectedTab, element.style]);

  const handleColorChange = (color, property) => {
    editComponent(element, property, color.hex, true);
  };

  const handleInputChange = (property, value) => {
    console.log(element.i);
    editComponent(element, property, value, true);
    const editedStyle = {...elementStyle};
    editedStyle[property] = value;
    setElementStyle(editedStyle);
  };

  // const handlePopoverInteraction = (nextOpenState) => {
  //   // Close the popover when it loses focus
  //   setPopoverOpen(nextOpenState);
  // };

  const handlePopoverInteraction = (event) => {
    // Stop the event propagation to prevent closing the parent popover
    event.stopPropagation();
  };


  const renderFontFamilyMenu = () => {
    return (
      <Popover
        // isOpen={isPopoverOpen}
        placement="bottom-end"
        onClose={handlePopoverInteraction}
        usePortal={false}
        content={
          <div>
            <Menu>
              <MenuItem
                text="Arial, sans-serif"
                onClick={() => handleInputChange('fontFamily', 'Arial, sans-serif')}
              />
              <MenuItem
                text="Times New Roman, serif"
                onClick={() => handleInputChange('fontFamily', 'Times New Roman, serif')}
              />
              <MenuItem
                text="Courier New, monospace"
                onClick={() => handleInputChange('fontFamily', 'Courier New, monospace')}
              />
            </Menu>
          </div>
        }
      >
        <Button icon="font">
          {`Font Family: ${elementStyle.fontFamily}`}
        </Button>
      </Popover>
    );
  };


  const renderBorderStyle = () => {
    return (
      <Popover
        // isOpen={isPopoverOpen}
        placement="bottom-end"
        onClose={handlePopoverInteraction}
        usePortal={false}
        content={
          <div>
            <Menu>
              <MenuItem
                text="solid"
                onClick={() => handleInputChange('borderStyle', 'solid')}
              />
              <MenuItem
                text="dotted"
                onClick={() => handleInputChange('borderStyle', 'dashed')}
              />
              <MenuItem
                text="Courier New, monospace"
                onClick={() => handleInputChange('borderStyle', 'dotted')}
              />
            </Menu>
          </div>
        }
      >
        <Button icon="font">
          {`Border Style: ${elementStyle.borderStyle}`}
        </Button>
      </Popover>
    );
  };

  const renderColorPicker = (property, label) => {
    return (
      <Popover
        // isOpen={isPopoverOpen}
        // enforceFocus={false}
        placement="bottom-end"
        onInteraction={handlePopoverInteraction}
        usePortal={false}
        content={
          <div>
            <ChromePicker
              color={elementStyle[property]}
              onChange={(color) => handleColorChange(color, property)}
            />
            <div
              style={{
                backgroundColor: elementStyle[property],
                width: '50px',
                height: '20px',
                marginTop: '10px',
              }}
            />
          </div>
        }
      >
        <Button icon="edit">{label}</Button>
      </Popover>
    );
  };

  const renderSliderInput = (label, property, min, max, stepSize, labelStepSize) => {
    return (
      <FormGroup label={label} labelFor={`${property}-slider`} key={`${property}-slider`}>
        <Slider
          min={min}
          max={max}
          stepSize={stepSize}
          autoFocus={true}
          labelStepSize={labelStepSize}
          value={Number(elementStyle[property])}
          onChange={(value) => handleInputChange(property, value)}
        />
      </FormGroup>
    );
  };

  return (
    <Tabs
      id="styleTabs"
      selectedTabId={selectedTab}
      onChange={(newTab) => setSelectedTab(newTab)}
    >
      <Tab id="font" title="Font" panel={
        <div className="font-category">
          <div className="category">
            {renderColorPicker('color', 'Text Color')}
            {renderFontFamilyMenu()}
          </div>
          <div className="category">
            {renderSliderInput('Font Size', 'fontSize', 0, 50, 1, 10)}
          </div>
        </div>
      } />

      <Tab id="border" title="Border" panel={
        <div className="border-category">
          <div className="category">
            {renderColorPicker('borderColor', 'Border Color')}
            {renderBorderStyle()}
          </div>
          <div className="category">
            {renderSliderInput('Border Size', 'borderWidth', 0, 10, 1, 1)}
            {renderSliderInput('Border Radius', 'borderRadius', 0, 20, 1, 2)}
          </div>
        </div>
      } />

      <Tab id="size" title="Size" panel={
        <div className="size-category">
          <div className="category">
            {renderSliderInput('Width', 'width', 100, 300, 10, 50)}
            {renderSliderInput('Height', 'height', 50, 200, 10, 50)}
          </div>
        </div>
      } />

      <Tab id="spacing" title="Spacing" panel={
        <div className="spacing-category">
          <div className="category">
            {renderSliderInput('Margin', 'margin', 0, 50, 1, 10)}
            {renderSliderInput('Margin Top', 'marginTop', 0, 50, 1, 10)}
            {renderSliderInput('Margin Right', 'marginRight', 0, 50, 1, 10)}
            {renderSliderInput('Margin Bottom', 'marginBottom', 0, 50, 1, 10)}
            {renderSliderInput('Margin Left', 'marginLeft', 0, 50, 1, 10)}
          </div>
          <div className="category">
            {renderSliderInput('Padding', 'padding', 0, 50, 1, 10)}
            {renderSliderInput('Padding Top', 'paddingTop', 0, 50, 1, 10)}
            {renderSliderInput('Padding Right', 'paddingRight', 0, 50, 1, 10)}
            {renderSliderInput('Padding Bottom', 'paddingBottom', 0, 50, 1, 10)}
            {renderSliderInput('Padding Left', 'paddingLeft', 0, 50, 1, 10)}
          </div>
        </div>
      } />

      <Tab id="color" title="Color" panel={
        <div className="color-category">
          <div className="category">
            {renderSliderInput('Background Opacity', 'opacity', 0, 1, 0.1, 0.2)}
            {renderColorPicker('backgroundColor', 'Background Color')}
          </div>
        </div>
      } />

    </Tabs>
  );
};

export default StyleEditor;
