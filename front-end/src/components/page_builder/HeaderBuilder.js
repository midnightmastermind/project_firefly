import React, { useState } from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Button,
  Popover,
  Menu,
  MenuItem,
  Dialog,
  Classes,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';

const HeaderBuilder = () => {
  const [headerButtons, setHeaderButtons] = useState([
    // Initial header buttons
    {
      icon: 'home',
      text: 'Home',
      link: '/',
      settings: [], // Array to store settings for each button
    },
    // Add more initial buttons as needed
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('button'); // 'button' or 'option'
  const [dialogIndex, setDialogIndex] = useState(0);
  const [dialogOptionIndex, setDialogOptionIndex] = useState(0);

  const addNewButton = () => {
    const newButton = {
      icon: 'new-icon', // Provide a default icon
      text: 'New Button',
      link: '/new', // Provide a default link
      settings: [], // Array to store settings for the new button
    };

    setHeaderButtons([...headerButtons, newButton]);
  };

  const addNewOption = (index) => {
    const newOption = {
      text: 'New Option',
      settings: [], // Array to store settings for the new option
    };

    const updatedButtons = [...headerButtons];
    updatedButtons[index].settings.push(newOption);

    setHeaderButtons(updatedButtons);
  };

  const openDialog = (type, index, optionIndex) => {
    setDialogType(type);
    setDialogIndex(index);
    setDialogOptionIndex(optionIndex);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const saveDialogSettings = (newText) => {
    const updatedButtons = [...headerButtons];

    if (dialogType === 'button') {
      updatedButtons[dialogIndex].text = newText;
    } else {
      updatedButtons[dialogIndex].settings[dialogOptionIndex].text = newText;
    }

    setHeaderButtons(updatedButtons);
    closeDialog();
  };

  const renderMenu = (buttons, isOption = false, parentIndex) => {
    return (
      <Menu>
        {buttons.map((button, index) => (
          <React.Fragment key={index}>
            <MenuItem
              text={button.text}
              onClick={() => openDialog(isOption ? 'option' : 'button', parentIndex, index)}
            />
            {button.settings && button.settings.length > 0 && (
              <Menu>
                {renderMenu(button.settings, true, index)}
                <MenuItem
                  text="Add New Option"
                  onClick={() => addNewOption(index)}
                />
              </Menu>
            )}
          </React.Fragment>
        ))}
        {!isOption && <MenuItem text="Add New Button" onClick={addNewButton} />}
      </Menu>
    );
  };

  return (
    <div>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Header Preview</NavbarHeading>
          {headerButtons.map((button, index) => (
            <Popover key={index} content={renderMenu([button])} position="bottom">
              <Button icon={button.icon} text={button.text} />
            </Popover>
          ))}
        </NavbarGroup>
      </Navbar>

      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={`Edit ${dialogType === 'button' ? 'Button' : 'Option'}`}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Text">
            <InputGroup
              value={
                dialogType === 'button'
                  ? headerButtons[dialogIndex]?.text
                  : headerButtons[dialogIndex]?.settings[dialogOptionIndex]?.text
              }
              onChange={(e) => saveDialogSettings(e.target.value)}
            />
          </FormGroup>
        </div>
      </Dialog>
    </div>
  );
};

export default HeaderBuilder;
