import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
// import GlobalSiteStyleMenu from '../components/style/SiteGlobalStyleMenu';

const accountSettingsMenu = [{
    id: 'site_infornation',
    title: 'Site Information',
    panel: <div>Site Information</div>
},
{
    id: 'main_styles',
    title: 'Main Styling',
    panel: <div>Main Styling</div>
},
{
    id: 'global_styles',
    title: 'Global Styling',
    panel: <div>Global Styling</div>
}]

const AccountSettings = () => {
    const pageContainerTheme = useSelector((state) => state.theme.page_container);
    return (
        <div>
            <Tabs id="site_settings"
                animate={true}  
                >
                { accountSettingsMenu.map(accountSettingsMenuObject => {
                    return (
                        <Tab
                            key={accountSettingsMenuObject.id}
                            id={accountSettingsMenuObject.id}
                            title={accountSettingsMenuObject.title}
                            panel={accountSettingsMenuObject.panel}
                            style={{color: pageContainerTheme.color}}
                            />
                    )
                    })
                }
            </Tabs>
        </div>
    )
};
export default AccountSettings;
