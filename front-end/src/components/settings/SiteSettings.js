import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import GlobalStyleSettings from './GlobalStyleSettings';

const siteSettingsMenu = [{
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
    panel: <GlobalStyleSettings />
}]

const SiteSettings = () => {
    const pageContainerTheme = useSelector((state) => state.theme.page_container);
    return (
        <div className="site-settings">
            <Tabs id="site_settings"
                animate={true}  
                >
                { siteSettingsMenu.map(siteSettingsMenuObject => {
                    return (
                        <Tab
                            key={siteSettingsMenuObject.id}
                            id={siteSettingsMenuObject.id}
                            title={siteSettingsMenuObject.title}
                            panel={siteSettingsMenuObject.panel}
                            />
                    )
                    })
                }
            </Tabs>
        </div>
    )
};
export default SiteSettings;
