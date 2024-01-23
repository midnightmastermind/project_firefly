import React, { useState, useEffect } from 'react';
import { InputGroup, FormGroup, Tag, Switch } from '@blueprintjs/core';

const PageForm = ({ callbackFunction, page }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {

    if (page) {
      setIsFullScreen(page.style.height == "90vh" ? true : false);
    }
  }, [page]);

  const handleInputChange = (variable, value) => {
    callbackFunction(variable, value, false)
  };

  const handleSetFullScreen = (isFullScreen) => {
    if (isFullScreen) {
      callbackFunction('height', '90vh', true);
    } else {
      callbackFunction('height', '100%', true);
    }
    setIsFullScreen(isFullScreen);
  }
  return (
    <div>
      <div className="page-form-group">
        <FormGroup label={
          <Tag
            minimal
            className="dynamic-form-label"
          >Title</Tag>}
        >
          <InputGroup
            type="text"
            value={page.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </FormGroup>
        <FormGroup label={
          <Tag
            minimal
            className="dynamic-form-label"
          >Route</Tag>}
          style={{marginLeft: '10px'}}
        >
          <InputGroup
            type="text"
            value={page.route}
            leftIcon={'slash'}
            onChange={(e) => handleInputChange('route', e.target.value)}
          />
        </FormGroup>
      </div>
      <div className="page-form-group">
        <FormGroup label={
          <Tag
            minimal
            className="dynamic-form-label"
          >Published</Tag>}
        >
          <Switch
            checked={page.status}
            onChange={() => handleInputChange('status', !page.status)}
          />
        </FormGroup>
        <FormGroup label={
                <Tag
                    minimal
                    className="dynamic-form-label"
                >Set Full Height</Tag>}
            >
                <Switch
                    checked={isFullScreen}
                    onChange={() => handleSetFullScreen(!isFullScreen)}
                />
            </FormGroup>
      </div>
    </div>
  );
};

export default PageForm;
