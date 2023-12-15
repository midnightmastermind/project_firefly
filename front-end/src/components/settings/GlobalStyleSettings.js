import React, { useState, useEffect } from 'react';
import { Menu, MenuDivider, Slider } from '@blueprintjs/core';
import { setThemeProperty } from '../../slices/style/theme'; // Assuming setThemeProperty is the action for updating global CSS
import { useDispatch, useSelector } from "react-redux";
import { ChromePicker } from 'react-color';
import { Button, Card, CardList, Section, SectionCard, Popover} from "@blueprintjs/core";
import _ from 'lodash';

const GlobalStyleSettings = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState({}); // Set the initial state to the values from the database
  const loadedTheme = useSelector(state => state.theme.global);
  const pageContainerTheme = useSelector(state => state.theme.page_container);

  useEffect(() => {
    setTheme(loadedTheme);
  }, [loadedTheme]);

  const handleColorChange = (color, property) => {
    console.log(color);
    console.log(property);
    const updatedTheme = { ...theme, [property]: color.hex };
    setTheme(updatedTheme);
    // Dispatch an action to update the global CSS in the Redux store
    dispatch(setThemeProperty({ section: 'global', property, value: color.hex }));
  };

  const handleSliderChange = (value, property) => {
    const updatedTheme = { ...theme, [property]: value };
    setTheme(updatedTheme);
    // Dispatch an action to update the global CSS in the Redux store
    dispatch(setThemeProperty({ section: 'global', property, value }));
  };

  const renderInput = (property) => {
    if (property === 'backgroundColor' || property === 'color') {
      return (
        <ChromePicker color={theme[property]} onChange={(color) => handleColorChange(color, property)} />
      );
    } else if (property === 'padding') {
      return (
        <Slider
          min={0}
          max={50}
          stepSize={1}
          labelStepSize={10}
          value={theme[property]}
          onChange={(value) => handleSliderChange(value, property)}
        />
      );
    }
    return null;
  };

  return (
    <div>
    <Section title="Global Style Settings" style={{backgroundColor: 'transparent'}}>
        <CardList bordered={false} title="Site Style">
            {Object.keys(theme).map((property) => (
            <Card key={property} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
                <div style={{ marginRight: '10px' }}>{_.startCase(property)}</div>
                <Popover
                enforceFocus={false}
                placement="bottom-end"
                content={renderInput(property)}
                interactionKind="click"
                // tslint:disable-next-line jsx-no-lambda
                renderTarget={({ isOpen, ...p }) => (
                    <Button icon="edit" {...p} active={isOpen} style={{backgroundColor: theme[property]}} />
                )}
                />
            </Card>
            ))}
        </CardList>
    </Section>
    </div>
  );
};

export default GlobalStyleSettings;