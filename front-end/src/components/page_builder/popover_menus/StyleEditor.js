import React, { useState, useEffect } from 'react';
import { FormGroup, Slider, Popover, Button, InputGroup, Menu, MenuItem } from '@blueprintjs/core';
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector } from "react-redux";

import { create as createStyle, update as updateStyle, getAll as getAllStyles } from 'slices/site/style.js';

const StyleEditor = ({ element, styleCategory, style, setStyle, editComponent }) => {
  console.log(setStyle);
  const [elementStyle, setElementStyle] = useState(style);


  const [selectedPopover, setSelectedPopover] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setElementStyle(element.style);
  }, [element.style])
  // useEffect(() => {
  //   // Set initial style based on the styleCategory prop
  //   if (styleCategory === 'font') {
  //     setElementStyle({
  //       color: 'red',
  //       fontFamily: 'Arial, sans-serif',
  //       fontSize: 16,
  //     });
  //   } else if (styleCategory === 'border') {
  //     setElementStyle({
  //       borderSize: '2',
  //       borderSizeRight: '2',
  //       borderSizeTop: '2',
  //       borderSizeBottom: '2',
  //       borderSizeLeft: '2',
  //       borderColor: 'red',
  //       borderColorRight: 'red',
  //       borderColorTop: 'red',
  //       borderColorBottom: 'red',
  //       borderColorLeft: 'red',
  //       borderType: 'solid',
  //       borderTypeTop: 'solid',
  //       borderTypeBottom: 'solid',
  //       borderTypeRight: 'solid',
  //       borderTypeLeft: 'solid',
  //       borderRadius: '5',
  //     });
  //   } else if (styleCategory === 'size') {
  //     setElementStyle({
  //       width: 200,
  //       height: 100,
  //     });
  //   } else if (styleCategory === 'spacing') {
  //     setElementStyle({
  //       margin: '10',
  //       marginRight: '10',
  //       marginTop: '10',
  //       marginBottom: '10',
  //       marginLeft: '10',
  //       padding: '20',
  //       paddingRight: '20',
  //       paddingTop: '20',
  //       paddingBottom: '20',
  //       paddingLeft: '20',
  //     });
  //   } else if (styleCategory === 'color') {
  //     setElementStyle({
  //       opacity: 1,
  //       backgroundColor: 'red',
  //     });
  //   }
  // }, [styleCategory]);

  const handleColorChange = (color, property) => {
    editComponent(element._id, property, color.hex, true)
    //setStyle({ ...elementStyle, [property]: color.hex });
  };

  const handleInputChange = (property, value) => {
    console.log("hit editor");
    editComponent(element._id, property, value, true)

    //setStyle({ ...elementStyle, [property]: value });
  };

  // const addNewStyle = (style) => {
  //   let new_style = style;
  //   new_style.object_id = element.id;

  //   dispatch(createStyle(new_style))
  //     .unwrap()
  //     .then(data => {
  //       dispatch(getAllStyles());
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const editStyle = (style) => {
  //   let updated_style = style;
  //   updated_style.object_id = element.id;

  //   console.log(updated_style);
  //   // dispatch(editStyle(updated_style))
  //   //   .unwrap()
  //   //   .then(data => {
  //   //     dispatch(getAllStyles());
  //   //   })
  //   //   .catch(e => {
  //   //     console.log(e);
  //   //   });
  // };

  const renderFontFamilyMenu = () => {
    return (
      <Popover
        content={
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
            {/* Add more font families as needed */}
          </Menu>
        }
        isOpen={selectedPopover === 'fontFamily'}
        onInteraction={(state) => setSelectedPopover(state ? 'fontFamily' : null)}
        interactionKind="click"
      >
        <Button icon="font" onClick={() => setSelectedPopover('fontFamily')}>
          {`Font Family: ${elementStyle.fontFamily}`}
        </Button>
      </Popover>
    );
  };

  const renderColorPicker = (property, label) => {
    return (
      <Popover
       isOpen={selectedPopover === property}
        onInteraction={(state) => setSelectedPopover(state ? property : null)}
        enforceFocus={false}
        placement="bottom-end"
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
        interactionKind="click"
      >
        <Button icon="edit">{label}</Button>
      </Popover>
    );
  };

  const renderSliderInput = (label, id, min, max, stepSize, labelStepSize, property) => {
    return (
      <FormGroup label={label} labelFor={id} key={id}>
        <Slider
          min={min}
          max={max}
          stepSize={stepSize}
          labelStepSize={labelStepSize}
          value={Number(elementStyle[property])}
          onChange={(value) => handleInputChange(property, value.toString())}
        />
      </FormGroup>
    );
  };

  return (
    <div>
      {styleCategory === 'font' && (
        <div className="font-category">
        {
          renderColorPicker('color', 'Text Color')}
          {renderFontFamilyMenu()}
          {renderSliderInput('Font Size', 'fontSize-slider', 12, 24, 1, 2, 'fontSize')}
        </div>
      )}

      {styleCategory === 'border' && (
        <div className="border-category">
        {renderSliderInput('Border Size', 'borderSize-slider', 0, 10, 1, 2, 'borderSize')}
          {renderColorPicker('borderColor', 'Border Color')}
          <FormGroup label="Border Type">
            <InputGroup
              value={elementStyle.borderType}
              onChange={(e) => handleInputChange('borderType', e.target.value)}
            />
          </FormGroup>
          {renderSliderInput('Border Radius', 'borderRadius-slider', 0, 20, 1, 2, 'borderRadius')}

          {/* Individual Border Properties */}
          {renderSliderInput('Border Size Right', 'borderSizeRight-slider', 0, 10, 1, 2, 'borderSizeRight')}
          {renderColorPicker('borderColorRight', 'Border Color Right')}
          <FormGroup label="Border Type Right">
            <InputGroup
              value={elementStyle.borderTypeRight}
              onChange={(e) => handleInputChange('borderTypeRight', e.target.value)}
            />
          </FormGroup>
          {renderSliderInput('Border Size Top', 'borderSizeTop-slider', 0, 10, 1, 2, 'borderSizeTop')}
          {renderColorPicker('borderColorTop', 'Border Color Top')}
          <FormGroup label="Border Type Top">
            <InputGroup
              value={elementStyle.borderTypeTop}
              onChange={(e) => handleInputChange('borderTypeTop', e.target.value)}
            />
          </FormGroup>
          {renderSliderInput('Border Size Bottom', 'borderSizeBottom-slider', 0, 10, 1, 2, 'borderSizeBottom')}
          {renderColorPicker('borderColorBottom', 'Border Color Bottom')}
          <FormGroup label="Border Type Bottom">
            <InputGroup
              value={elementStyle.borderTypeBottom}
              onChange={(e) => handleInputChange('borderTypeBottom', e.target.value)}
            />
          </FormGroup>
          {renderSliderInput('Border Size Left', 'borderSizeLeft-slider', 0, 10, 1, 2, 'borderSizeLeft')}
          {renderColorPicker('borderColorLeft', 'Border Color Left')}
          <FormGroup label="Border Type Left">
            <InputGroup
              value={elementStyle.borderTypeLeft}
              onChange={(e) => handleInputChange('borderTypeLeft', e.target.value)}
            />
          </FormGroup>
        </div>
      )}

      {styleCategory === 'size' && (
        <div className="size-category">
        {renderSliderInput('Width', 'width-slider', 100, 300, 10, 50, 'width')}
          {renderSliderInput('Height', 'height-slider', 50, 200, 10, 50, 'height')}
        </div>
      )}

      {styleCategory === 'spacing' && (
        <div className="spacing-category">
          {renderSliderInput('Margin', 'margin-slider', 0, 50, 1, 10, 'margin')}
          {renderSliderInput('Margin Right', 'marginRight-slider', 0, 50, 1, 10, 'marginRight')}
          {renderSliderInput('Margin Bottom', 'marginBottom-slider', 0, 50, 1, 10, 'marginBottom')}
          {renderSliderInput('Margin Left', 'marginLeft-slider', 0, 50, 1, 10, 'marginLeft')}
          {renderSliderInput('Padding', 'padding-slider', 0, 50, 1, 10, 'padding')}
          {renderSliderInput('Padding Right', 'paddingRight-slider', 0, 50, 1, 10, 'paddingRight')}
          {renderSliderInput('Padding Top', 'paddingTop-slider', 0, 50, 1, 10, 'paddingTop')}
          {renderSliderInput('Padding Left', 'paddingLeft-slider', 0, 50, 1, 10, 'paddingLeft')}
        </div>
      )}

      {styleCategory === 'color' && (
        <div className="color-category">
        {renderSliderInput('Opacity', 'opacity-slider', 0, 1, 0.1, 0.2, 'opacity')}
          {renderColorPicker('backgroundColor', 'Background Color')}
        </div>
      )}

      <div
        style={{
          border: `${elementStyle.borderSize}px ${elementStyle.borderType} ${elementStyle.borderColor}`,
          borderRadius: `${elementStyle.borderRadius}px`,
          margin: `${elementStyle.margin}px ${elementStyle.marginRight}px ${elementStyle.marginBottom}px ${elementStyle.marginLeft}px`,
          padding: `${elementStyle.padding}px ${elementStyle.paddingRight}px ${elementStyle.paddingTop}px ${elementStyle.paddingLeft}px`,
          width: `${elementStyle.width}px`,
          height: `${elementStyle.height}px`,
          opacity: elementStyle.opacity,
          backgroundColor: elementStyle.backgroundColor,
        }}
      />
    </div>
  );
};

export default StyleEditor;
