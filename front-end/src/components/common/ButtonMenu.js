import React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';

const ButtonMenu = ({ config }) => {
  const renderButtons = () => {
    return config.map((button, index) => (
      <Button key={index} icon={button.icon} onClick={button.callback}>
        {button.label}
      </Button>
    ));
  };

  return <ButtonGroup>{renderButtons()}</ButtonGroup>;
};

export default ButtonMenu;
