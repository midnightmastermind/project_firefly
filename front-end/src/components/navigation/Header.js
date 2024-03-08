import logo from 'logo.png';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageAuth from "common/PageAuth";
import {
    Navbar, NavbarHeading, NavbarGroup, Menu, MenuDivider, DrawerSize,
    NavbarDivider, Button, Alignment, ButtonGroup, MenuItem, Collapse, Popover, Dialog, Classes
} from "@blueprintjs/core";

import {
    Drawer,
    Position,
    Intent,
    Icon,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { logout } from "slices/auth/auth";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import message from 'slices/notification/message';

const DialogContainer = ({ menuItem, headerTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Dialog
                isOpen={isOpen}
                onClose={handleCloseDialog}
                title={menuItem.label}
                className={Classes.DARK}
            >
                <div className={Classes.DIALOG_BODY}>
                    {menuItem.content}
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={handleCloseDialog}>Close</Button>
                    </div>
                </div>
            </Dialog>
            <Button
                className="bp5-minimal"
                icon={menuItem.icon}
                text={menuItem.label}
                onClick={handleOpenDialog}
                css={css`color: ${headerTheme.color}; !important`}
            />
        </>
    );
};
const addButtonOrDropdown = [
    {
        type: 'dropdown',
        icon: 'plus',
        label: 'Add Item',
        children: [
            {
                type: 'dialog',
                icon: '',
                label: 'Link',
                content: <div>Add Link</div>
            },
            {
                type: 'dialog',
                icon: '',
                label: 'Dropdown',
                content: <div>Add Dropdown</div>
            }
        ]
    }
];

const addButton = [
    {
        type: 'dialog',
        icon: '',
        label: 'Link',
        content: <div>Add Link</div>
    },
]



const Header = (props) => {
    // const headerTheme = useSelector((state) => state.theme.header);
    const [headerTheme, useHeaderTheme] = useState({});
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { current_site: currentSite } = useSelector((state) => state.site);
    const dispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const [collapseKey, setCollapseKey] = useState(null);

    const toggleCollapse = (key) => {
        setCollapseKey(collapseKey === key ? null : key);
    };

    useEffect(() => {
        if (props.editMenu) {
            props.headerMenu.push(addButtonOrDropdown);
            props.userLoggedInMenu.push(addButtonOrDropdown);
            props.userLoggedOutMenu.push(addButtonOrDropdown);
        }
    }, [props]);
    const displayMenu = (menuItems, props, key) => {
        if (props.editMenu) {
            menuItems.push(addButton);
        }
        
        return (
            <Menu key={key}>
                {menuItems.map(menuItem => (
                    menuItem.type === 'panel' ? (
                        <Button
                            key={menuItem.id + key}
                            className="bp5-minimal"
                            icon={menuItem.icon}
                            onClick={() => menuItem.onClickHandler(menuItem.panel)}
                            text={menuItem.label}
                            css={css`color: ${headerTheme.color}; !important`}

                        />
                    ) : menuItem.type === 'label' ? (
                        <MenuDivider className="bp5-minimal" key={menuItem.id + key} title={menuItem.label} css={css`color: ${headerTheme.color}; !important`}
                        />
                    ) : menuItem.type === 'onClick' ? (
                        <Button key={menuItem.id + key} css={css`color: ${headerTheme.color}; !important`}
                            className="bp5-minimal" icon={menuItem.icon} text={menuItem.label} onClick={menuItem.onClickHandler} />
                    ) : menuItem.type === 'link' ? (
                        <Button key={menuItem.id + key} css={css`color: ${headerTheme.color}; !important`}
                            className="bp5-minimal" icon={menuItem.icon} text={menuItem.label} onClick={() => navigate(menuItem.link)} />
                    ) : menuItem.type === 'dropdown' ? (
                        <Popover className={Classes.POPOVER_DISMISS} popoverClassName={Classes.POPOVER_DISMISS} key={menuItem.id + key} content={<Menu>{displayMenu(menuItem.children, props, menuItem.id)}</Menu>} placement="bottom">
                            <Button key={menuItem.id + key} className="bp5-minimal" icon={menuItem.icon} rightIcon="caret-down" text={menuItem.label} css={css`color: ${headerTheme.color}; !important`} />
                        </Popover>
                    ) : menuItem.type === 'dialog' ? (
                        <DialogContainer key={menuItem.id + key} menuItem={menuItem} headerTheme={headerTheme} />
                    ) : menuItem.type === 'collapse' ? (
                        <div key={menuItem.id + key} className="mobile-header-collapse">
                            <Button onClick={() => toggleCollapse(menuItem.id + key)} className="bp5-minimal" icon={menuItem.icon} rightIcon="caret-down" text={menuItem.label} css={css`color: ${headerTheme.color}; !important`} />
                            <Collapse key={menuItem.id + key} isOpen={menuItem.id + key === collapseKey} children={<Menu className="mobile-header-collapse-menu">{displayMenu(menuItem.children, props, menuItem.id)}</Menu>} >
                            </Collapse>
                        </div>
                    )
                        : null
                ))}
            </Menu>
        );
    };

    const changeDropdownToCollapse = (menu) => {
        return menu.map((item) => {
          const newItem = { ...item };
      
          if (item.type === 'dropdown') {
            newItem.type = 'collapse';
            console.log("hit2");
          }
      
          if (item.children) {
            newItem.children = changeDropdownToCollapse(item.children);
          }
      
          return newItem;
        });
      };

    return (
        <Navbar className="header-nav" css={css`
            background-color: ${headerTheme.backgroundColor};
            color: ${headerTheme.color};
        `}>
            <div css={css`margin: 0 auto; max-width: 1000px; height: 100%;`}>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading className="header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </NavbarHeading>
                    <NavbarDivider />
                    <ButtonGroup minimal={true}>
                        {displayMenu(props.headerMenu, props, 'header-menu')}
                    </ButtonGroup>
                </NavbarGroup>
                <Navbar.Group className={'desktop-menu'} align={Alignment.RIGHT}>
                    {!currentUser && (
                        <ButtonGroup minimal={true}>
                            {displayMenu(props.userLoggedOutMenu, props, 'user-logged-out')}
                        </ButtonGroup>
                    )}
                    {currentUser && (
                        <ButtonGroup minimal={true}>
                            {displayMenu(props.userLoggedInMenu, props, 'user-logged-in')}
                        </ButtonGroup>
                    )}
                </Navbar.Group>
                <Navbar.Group className={'mobile-menu'} align={Alignment.RIGHT}>
                    <Button
                        key={'mobile-menu'}
                        className="bp5-minimal"
                        icon="menu"
                        onClick={handleDrawerOpen}
                        css={css`color: ${headerTheme.color}; !important`}

                    />
                </Navbar.Group>
                {isDrawerOpen && <Drawer
                    className={'mobile-menu'}
                    isOpen={isDrawerOpen}
                    position={Position.RIGHT}
                    onClose={handleDrawerClose}
                    size={DrawerSize.SMALL}
                >
                    <div className={Classes.DRAWER_BODY}>
                        <div className={Classes.DRAWER_HEADER}>
                            <h4 className={Classes.HEADING}>Menu</h4>
                        </div>
                        <div className="menu-container">
                            {!currentUser && (
                                <ButtonGroup minimal={true}>
                                    {displayMenu(props.userLoggedOutMenu, props, 'user-logged-out-mobile')}
                                </ButtonGroup>
                            )}
                            {currentUser && (
                                <ButtonGroup minimal={true}>
                                    {displayMenu(changeDropdownToCollapse(props.userLoggedInMenu), props, 'user-logged-in-mobile')}
                                </ButtonGroup>
                            )}
                        </div>
                    </div>
                </Drawer>
                }
            </div>
        </Navbar>
    );
}

export default Header;
