import logo from 'logo.png';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageBuilder from 'components/page_builder/PageBuilder';
import UserList from 'REVIEW/new/UserList';
import FileManager from 'components/storage/FileManager';
import ProductManagementDashboard from 'components/ecommerce/ProductManagement';
import ChatComponent from 'components/chat/ChatComponent';
import PageAuth from "common/PageAuth";
import {
    Navbar, NavbarHeading, NavbarGroup, Menu, MenuDivider,
    NavbarDivider, Button, Alignment, ButtonGroup, MenuItem, Popover
} from "@blueprintjs/core";

import { logout } from "slices/auth/auth";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import message from 'slices/notification/message';
import Form from 'components/form/Form';

const header_buttons = [
    {
        icon: 'home',
        text: 'Home',
        link: '/'
    },
    {
        icon: 'shop',
        text: 'Store',
        link: '/products'
    },
    {
        icon: 'user',
        text: 'Users',
        link: '/users'
    },
    {
        icon: 'calendar',
        text: 'Calendar',
        link: '/calendar'
    },
    {
        icon: 'edit',
        text: 'Markdown',
        link: '/markdown'
    },
    {
        icon: 'edit',
        text: 'Header Builder',
        link: '/header'
    },
]

const settingsMenuItems = [
    {
        id: 'styling',
        label: 'styling',
    },
    {
        id: 'main_styles',
        label: 'Main Styling',
        icon: 'style',
        panel: <div>Main Styling</div>,
    },
    {
        id: 'global_styles',
        label: 'Global Styling',
        icon: 'globe',
        panel: <div>Global Styling</div>,
    },
    {
        id: 'pages',
        label: 'Site Layout',
        hasCaret: false,
        icon: 'document',
        panel: <PageBuilder />,
    },
    {
        id: 'admin',
        label: 'admin',
    },
    {
        id: 'site_information',
        label: 'Site Info',
        icon: 'info-sign',
        panel: <div>Site Information</div>,
    },
    {
        id: 'users',
        label: 'Users',
        icon: 'people',
        panel: <UserList />,
    },
    {
        id: 'ecommerce',
        label: 'ecommerce',
    },
    {
        id: 'product_management',
        label: 'Products',
        icon: 'shopping-cart',
        panel: <ProductManagementDashboard />,
    },
    {
        id: 'scheduling',
        label: 'scheduling',
    },
    {
        id: 'calendar',
        label: 'Calendar',
        icon: 'calendar',
        panel: <div>Calendar</div>,
    },
    {
        id: 'content',
        label: 'content'
    },
    {
        id: 'posts',
        label: 'Posts',
        icon: 'book',
        panel: <div>Posts</div>,
    },
    {
        id: 'file_manager',
        label: 'File Manager',
        icon: 'folder-close',
        panel: <FileManager />,
    },
    {
        id: 'example form',
        label: 'Example Form',
        icon: 'form',
        panel: <Form />,
    },
    {
        id: 'marketing',
        label: 'marketing'
    }
];

const userMenuItems = [
    {
        id: 'profile',
        label: 'Profile',
        icon: 'user',
        hasCaret: true,
        panel: <div>Profile</div>,
    },
    {
        id: 'account_settings',
        label: 'Account',
        icon: 'cog',
        hasCaret: true,
        panel: <div>Account Settings</div>,
    },
    {
        id: 'logout',
        label: 'Logout',
        icon: 'log-out',
    },
];

const ecommerceMenuItems = [
    {
        id: 'cart',
        label: 'Cart',
        icon: 'shopping-cart',
        panel: <div>Cart</div>,
    },
    {
        id: 'saved-items',
        label: 'Saved Items',
        icon: 'bookmark',
        panel: <div>Saved Items</div>,
    },
];

const messageMenuItems = [
    {
        id: 'chat',
        label: 'Chat',
        icon: 'chat',
        hasCaret: false,
        panel: <ChatComponent />,
    },
    {
        id: 'messages',
        label: 'Messages',
        icon: 'envelope',
        hasCaret: false,
        panel: <div>Messages</div>,
    },
];


const Header = (props) => {
    const headerTheme = useSelector((state) => state.theme.header);
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { current_site: currentSite } = useSelector((state) => state.site);
    const dispatch = useDispatch();

    const displaySettingsMenu = () => {
        return (
            <Menu>
                {
                    settingsMenuItems.map(menuItem => {
                        if (menuItem.panel) {
                            return (<MenuItem key={menuItem.id} className="settings-menu-item" icon={menuItem.icon} onClick={() => {props.setOverlayContent(menuItem.panel); props.setIsDrawerOpen(false); props.setIsOverlayOpen(true);}} text={menuItem.label} /> );
                        } else {
                            return (<MenuDivider key={menuItem.id} title={menuItem.label} />);
                        }
                    })
                }
                {/* <Button className="bp5-minimal" icon="settings" text="Settings" onClick={() => props.setIsDrawerOpen(true)} css={css`color: ${headerTheme.color}; !important`} /> */}
            </Menu>
        )
    }
    const displayUserMenu = () => {
        return (
            <Menu>
                {
                    userMenuItems.map(menuItem => {
                        if (menuItem.panel) {
                            return (<MenuItem key={menuItem.id} className="settings-menu-item" icon={menuItem.icon} onClick={() => {props.setOverlayContent(menuItem.panel); props.setIsDrawerOpen(false); props.setIsOverlayOpen(true);}} text={menuItem.label} /> );
                        } else if (menuItem.id == "logout") {
                            return (<MenuItem key={menuItem.id} className="settings-menu-item" icon={menuItem.icon} text={menuItem.label} onClick={() => logOut()} css={css`color: ${headerTheme.color}; !important`} />)
                        } else {
                            return (<MenuDivider key={menuItem.id} title={menuItem.label} />);
                        }
                    })
                }
                {/* <Button className="bp5-minimal" icon="settings" text="Settings" onClick={() => props.setIsDrawerOpen(true)} css={css`color: ${headerTheme.color}; !important`} /> */}
            </Menu>
        )
    }

    const displayEcommerceMenu = () => {
        return (
            <Menu>
                {
                    ecommerceMenuItems.map(menuItem => {
                        if (menuItem.panel) {
                            return (<MenuItem key={menuItem.id} className="settings-menu-item" icon={menuItem.icon} onClick={() => {props.setOverlayContent(menuItem.panel); props.setIsDrawerOpen(false); props.setIsOverlayOpen(true);}} text={menuItem.label} /> );
                        } else {
                            return (<MenuDivider key={menuItem.id} title={menuItem.label} />);
                        }
                    })
                }
                {/* <Button className="bp5-minimal" icon="settings" text="Settings" onClick={() => props.setIsDrawerOpen(true)} css={css`color: ${headerTheme.color}; !important`} /> */}
            </Menu>
        )
    }


    const displayMessagesMenu = () => {
        return (
            <Menu>
                {
                    messageMenuItems.map(menuItem => {
                        if (menuItem.panel) {
                            return (<MenuItem key={menuItem.id} className="settings-menu-item" icon={menuItem.icon} onClick={() => {props.setOverlayContent(menuItem.panel); props.setIsDrawerOpen(false); props.setIsOverlayOpen(true);}} text={menuItem.label} /> );
                        } else {
                            return (<MenuDivider key={menuItem.id} title={menuItem.label} />);
                        }
                    })
                }
                {/* <Button className="bp5-minimal" icon="settings" text="Settings" onClick={() => props.setIsDrawerOpen(true)} css={css`color: ${headerTheme.color}; !important`} /> */}
            </Menu>
        )
    }

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

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
                    {
                        header_buttons.map(header_object => (<Button key={header_buttons.text} className="bp5-minimal" icon={header_object.icon} text={header_object.text} onClick={() => navigate(header_object.link)} css={css`color: ${headerTheme.color}; !important`} />))
                    }
                </NavbarGroup>
                <Navbar.Group align={Alignment.RIGHT}>
                    {
                        !currentUser && 
                            <ButtonGroup minimal={true}>
                                <Button className="bp5-minimal" icon="mugshot" text="Signup" onClick={() => props.setIsRegisterOpen(true)} css={css`color: ${headerTheme.color}; !important`} />
                                <Button className="bp5-minimal" icon="login" text="Login" onClick={() => props.setIsLoginOpen(true)} css={css`color: ${headerTheme.color}; !important`} />
                            </ButtonGroup>
                    }
                    {
                        currentUser && 
                        <ButtonGroup minimal={true}>
                            <Popover content={displayEcommerceMenu()} placement="bottom">
                                 <Button className="bp5-minimal" icon="shopping-cart" iconRight="caret-down" text="Cart" css={css`color: ${headerTheme.color}; !important`}></Button>
                            </Popover>
                            <Popover content={displayMessagesMenu()} placement="bottom">
                                 <Button className="bp5-minimal" icon="box" iconRight="caret-down" text="Inbox" css={css`color: ${headerTheme.color}; !important`}></Button>
                            </Popover>
                            <Popover content={displaySettingsMenu()} placement="bottom">
                                 <Button className="bp5-minimal" icon="settings" iconRight="caret-down" text="Settings" css={css`color: ${headerTheme.color}; !important`}></Button>
                            </Popover>
                            <Popover content={displayUserMenu()} placement="bottom">
                                 <Button className="bp5-minimal" icon="user" iconRight="caret-down" text={currentUser.username} css={css`color: ${headerTheme.color}; !important`}></Button>
                            </Popover>
                        </ButtonGroup>
                    }
                </Navbar.Group>

            </div>
        </Navbar>
    );
}

export default Header;