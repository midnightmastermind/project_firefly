// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { Tab, Tabs } from "@blueprintjs/core";
// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react"
// // import GlobalSiteStyleMenu from '../components/admin/SiteGlobalStyleMenu';

// const adminSettingsMenu = [{
//     id: 'site_infornation',
//     title: 'Site Information',
//     panel: <div>Site Information</div>
// },
// {
//     id: 'main_admins',
//     title: 'Main Styling',
//     panel: <div>Main Styling</div>
// },
// {
//     id: 'global_admins',
//     title: 'Global Styling',
//     panel: <div>Global Styling</div>
// }]

// const AdminSettings = () => {
//     const pageContainerTheme = useSelector((state) => state.theme.page_container);
//     return (
//         <div>
//             <Tabs id="site_settings"
//                 animate={true}  
//                 >
//                 { adminSettingsMenu.map(adminSettingsMenuObject => {
//                     return (
//                         <Tab
//                             key={adminSettingsMenuObject.id}
//                             id={adminSettingsMenuObject.id}
//                             title={adminSettingsMenuObject.title}
//                             panel={adminSettingsMenuObject.panel}
//                             admin={{color: pageContainerTheme.color}}
//                             />
//                     )
//                     })
//                 }
//             </Tabs>
//         </div>
//     )
// };
// export default AdminSettings;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Classes } from '@blueprintjs/core';
import SettingsDrawer from 'components/navigation/SettingsDrawer'; // Adjust the import path accordingly

import UserListTable from 'components/user/UserListTable';
import SiteMainSettings from './SiteMainSettings';
import PageBuilder from 'components/page_builder/PageBuilder';

const SiteAdminSettings = () => {
  // const [categories, setCategories] = useState([]);
  // const [productList, setProductList] = useState([]);
  // const [templates, setTemplates] = useState([]);
  // const [variations, setVariations] = useState([]);
  // const { products } = useSelector(state => state.product);


  // useEffect(() => {
  //   console.log(products);
  //   if (products) {
  //     setProductList(products);
  //   }
  // }, [products]);

  return (
    <div>
      <SettingsDrawer menuItems={[
         {
          id: 'main_site_settings_section',
          label: 'Main Site Settings',
          panel: (
            <Card className={`${Classes.ELEVATION_2} site-admin-settings-section`}>
              <SiteMainSettings />
            </Card>
          ),
        },
        {
          id: 'user_management_section',
          label: 'User Management',
          panel: (
            <Card className={`${Classes.ELEVATION_2} site-admin-settings-section`}>
              <div className="site-admin-settings-section-header">
                <h3>Users</h3>
              </div>
              <UserListTable />
            </Card>
          ),
        },
        {
          id: 'site_layout_section',
          label: 'Site Layout',
          panel: (
            <Card className={`${Classes.ELEVATION_2} site-admin-settings-section`}>
              <div className="site-admin-settings-section-header">
                <h3>Users</h3>
              </div>
              <PageBuilder />
            </Card>
          ),
        },
        // {
        //   id: 'global_colors_section',
        //   label: '',
        //   panel: (
        //     <Card className={`${Classes.ELEVATION_2} site-admin-settings-section`}>
        //       <div className="ecommerce-section-header">
        //         <h3>Product Templates</h3>
        //       </div>
        //       <TemplateListWithPanelStack templateList={templates} setTemplates={setTemplates} />
        //     </Card>
        //   ),
        // },
      ]} />
    </div>
  );
};

export default SiteAdminSettings;



/*
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@blueprintjs/core";
import { css } from "@emotion/react"
import GlobalStyleSettings from './GlobalStyleSettings';
import { UserListTable } from 'components/user/UserListTable';

const siteSettingsMenu = [{
    id: 'site_infornation',
    title: 'Site Information',
    panel: <div>Site Information</div>
},
{
    id: 'main_admins',
    title: 'Main Styling',
    panel: <div>Main Styling</div>
},
{
    id: 'global_admins',
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
*/