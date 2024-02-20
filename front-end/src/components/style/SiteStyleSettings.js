import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Classes } from '@blueprintjs/core';

import SettingsDrawer from 'components/navigation/SettingsDrawer'; // Adjust the import path accordingly
import SiteBackgroundStyle from './site_style/SiteBackgroundStyle';
import SiteComponentsStyle from './site_style/SiteComponentsStyle';


const SiteStyleSettings = () => {
  // const [categories, setCategories] = useState([]);
  // const [productList, setProductList] = useState([]);
  // const [templates, setTemplates] = useState([]);
  // const [variations, setVariations] = useState([]);
  // const { products } = useSelector(state => state.product);


  // useEffect(() => {
  //   console.log(products);
  //   if (products) {
  //     setProductList(products);
  //   }
  // }, [products]);

  return (
    <div>
      <SettingsDrawer menuItems={[
         {
          id: 'background_style_settings',
          label: 'Background',
          panel: (
            <Card className={`${Classes.ELEVATION_2} site-style-settings-section`}>
              <SiteBackgroundStyle />
            </Card>
          ),
        },
        {
          id: 'site_components_style_section',
          label: 'Site Components',
          panel: (
            <Card className={`${Classes.ELEVATION_2} site-style-settings-section`}>
              <div className="site-style-settings-section-header">
                <h3>Categories</h3>
              </div>
              <SiteComponentsStyle />
            </Card>
          ),
        },
        // {
        //   id: 'global_colors_section',
        //   label: '',
        //   panel: (
        //     <Card className={`${Classes.ELEVATION_2} site-style-settings-section`}>
        //       <div className="ecommerce-section-header">
        //         <h3>Product Templates</h3>
        //       </div>
        //       <TemplateListWithPanelStack templateList={templates} setTemplates={setTemplates} />
        //     </Card>
        //   ),
        // },
      ]} />
    </div>
  );
};

export default SiteStyleSettings;

/*
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

export default GlobalStyleSettings;*/

/*import React, { useState, useEffect } from 'react';
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
*/