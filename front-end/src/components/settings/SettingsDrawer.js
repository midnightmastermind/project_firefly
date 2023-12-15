import React, { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
// import GlobalSiteStyleMenu from '../components/style/SiteGlobalStyleMenu';
import SiteSettings from "components/settings/SiteSettings"
import { Menu, MenuDivider, Tab, Tree, Position, DrawerSize, Overlay, MenuItem } from '@blueprintjs/core';
import PageContainer from "components/navigation/PageContainer";
import CustomDrawer from "components/elements/CustomDrawer";
import _ from "lodash";
import UserList from "REVIEW/new/UserList";
import PageBuilder from "components/page_builder/PageBuilder";
const menuItems = [
    {
        id: 'account_settings',
        label: 'Account Settings',
        icon: 'cog',
        hasCaret: false,
        panel: <div>Account Settings</div>,
    },
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
        label: 'Site Information',
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
        label: 'Product Management',
        icon: 'shopping-cart',
        panel: <div>User Management</div>,
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
        panel: <div>File Manager</div>,
    },
];
const SettingsDrawer = (props) => {
    return (
        <>
            <CustomDrawer
                isOpen={props.isDrawerOpen || false}
                setIsDrawerOpen={props.setIsDrawerOpen}
                usePortal={false}
                portalContainer={null}
                title={'Settings'}
                position={Position.LEFT}
                size={DrawerSize.SMALL}
                closedDrawerContent={null}
            >
                <div style={{ display: 'block', width: 250, marginLeft: 100, minHeight: '900px' }}>
                    <Menu className="settings-menu" style={{backgroundColor: "transparent", color: "white"}}>
                        {
                            menuItems.map(menuItem => {
                                if (menuItem.panel) {
                                    return (<MenuItem key={menuItem.id} className="settings-menu-item" icon={menuItem.icon} onClick={() => {props.setOverlayContent(menuItem.panel); props.setIsDrawerOpen(false); props.setIsOverlayOpen(true);}} text={menuItem.label} /> );
                                } else {
                                    return (<MenuDivider key={menuItem.id} title={menuItem.label} />);
                                }
                            })
                        }
                    </Menu>
                </div>
            </CustomDrawer>
        </>
    );
};


export default SettingsDrawer;


