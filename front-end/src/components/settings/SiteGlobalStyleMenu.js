import React, { useState, useEffect } from 'react';
import { Menu, MenuDivider, Slider } from '@blueprintjs/core';
import { setThemeProperty } from '../../slices/style/theme'; // Assuming setThemeProperty is the action for updating global CSS
import { useDispatch, useSelector } from "react-redux";
import { ChromePicker } from 'react-color';
import { Card, CardList, Section, SectionCard } from "@blueprintjs/core";
import _ from 'lodash';

const GlobalSiteStyleMenu = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState({}); // Set the initial state to the values from the database
  const loadedTheme = useSelector(state => state.theme.global);


  useEffect(() => {
    setTheme(loadedTheme);
  }, [loadedTheme]);

  const handleColorChange = (color, property) => {
    const updatedTheme = { ...theme, [property]: color };
    setTheme(updatedTheme);
    // Dispatch an action to update the global CSS in the Redux store
    dispatch(setThemeProperty({ property, value: color }));
  };

  const handleSliderChange = (value, property) => {
    const updatedTheme = { ...theme, [property]: value };
    setTheme(updatedTheme);
    // Dispatch an action to update the global CSS in the Redux store
    dispatch(setThemeProperty({ property, value }));
  };

  const renderInput = (property) => {
    if (property === 'backgroundColor' || property === 'textColor') {
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
      <Menu>
        <Section title="Global CSS Settings">
          <SectionCard padded={false}>
            <CardList bordered={false}>
              {Object.keys(theme).map((property) => (
                <Card key={property} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '10px' }}>{_.startCase(property)}</div>
                  <Popover
                    enforceFocus={false}
                    placement="bottom-end"
                    interactionKind={interactionKind}
                    content={renderInput}
                    // tslint:disable-next-line jsx-no-lambda
                    renderTarget={({ isOpen, ...p }) => (
                      <Button icon="edit" {...p} active={isOpen} rightIcon="caret-down" text="Profile settings" />
                    )}
                  />
                </Card>
              ))}
            </CardList>
          </SectionCard>
        </Section>
      </Menu>
    </div>
  );
};

export default GlobalSiteStyleMenu;

