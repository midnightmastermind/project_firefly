import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
// import GlobalSiteStyleMenu from '../components/style/SiteGlobalStyleMenu';

const adminSettingsMenu = [{
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

const AdminSettings = () => {
    const pageContainerTheme = useSelector((state) => state.theme.page_container);
    return (
        <div>
            <Tabs id="site_settings"
                animate={true}  
                >
                { adminSettingsMenu.map(adminSettingsMenuObject => {
                    return (
                        <Tab
                            key={adminSettingsMenuObject.id}
                            id={adminSettingsMenuObject.id}
                            title={adminSettingsMenuObject.title}
                            panel={adminSettingsMenuObject.panel}
                            style={{color: pageContainerTheme.color}}
                            />
                    )
                    })
                }
            </Tabs>
        </div>
    )
};
export default AdminSettings;
