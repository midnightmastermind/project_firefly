import logo from 'logo.png';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageAuth from "common/PageAuth";
import {
    Navbar, NavbarHeading, NavbarGroup, Menu, MenuDivider,
    NavbarDivider, Button, Alignment, ButtonGroup, MenuItem, Popover, Dialog, Classes
} from "@blueprintjs/core";

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
    const headerTheme = useSelector((state) => state.theme.header);
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { current_site: currentSite } = useSelector((state) => state.site);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.editMenu) {
            props.headerMenu.push(addButtonOrDropdown);
            props.userLoggedInMenu.push(addButtonOrDropdown);
            props.userLoggedOutMenu.push(addButtonOrDropdown);
        }
    }, [props])
    const displayMenu = (menuItems, props) => {
        if (props.editMenu) {
            menuItems.push(addButton);
        }
        return (
            <Menu>
                {menuItems.map(menuItem => (
                    menuItem.type === 'panel' ? (
                        <Button
                            key={menuItem.id}
                            className="bp5-minimal"
                            icon={menuItem.icon}
                            onClick={() => menuItem.onClickHandler(menuItem.panel)}
                            text={menuItem.label}
                            css={css`color: ${headerTheme.color}; !important`}

                        />
                    ) : menuItem.type === 'label' ? (
                        <MenuDivider className="bp5-minimal" key={menuItem.id} title={menuItem.label} css={css`color: ${headerTheme.color}; !important`}
                        />
                    ) : menuItem.type === 'onClick' ? (
                        <Button key={menuItem.id} css={css`color: ${headerTheme.color}; !important`}
                            className="bp5-minimal" icon={menuItem.icon} text={menuItem.label} onClick={menuItem.onClickHandler} />
                    ) : menuItem.type === 'link' ? (
                        <Button key={menuItem.id} css={css`color: ${headerTheme.color}; !important`}
                            className="bp5-minimal" icon={menuItem.icon} text={menuItem.label} onClick={() => navigate(menuItem.link)} />
                    ) : menuItem.type === 'dropdown' ? (
                        <Popover key={menuItem.id} content={<Menu>{displayMenu(menuItem.children, props)}</Menu>} placement="bottom">
                            <Button className="bp5-minimal" icon={menuItem.icon} iconRight="caret-down" text={menuItem.label} css={css`color: ${headerTheme.color}; !important`} />
                        </Popover>
                    ) : menuItem.type === 'dialog' ? (
                        <DialogContainer menuItem={menuItem} headerTheme={headerTheme} />
                    )
                        : null
                ))}
            </Menu>
        );
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
                        {displayMenu(props.headerMenu, props)}
                    </ButtonGroup>
                </NavbarGroup>
                <Navbar.Group align={Alignment.RIGHT}>
                    {!currentUser && (
                        <ButtonGroup minimal={true}>
                            {displayMenu(props.userLoggedOutMenu, props)}
                        </ButtonGroup>
                    )}
                    {currentUser && (
                        <ButtonGroup minimal={true}>
                            {displayMenu(props.userLoggedInMenu, props)}
                        </ButtonGroup>
                    )}
                </Navbar.Group>
            </div>
        </Navbar>
    );
}

export default Header;
