import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import 'App.css';
// import 'css/App.css';
import 'css/global.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import Header from 'components/navigation/Header';
import Footer from "components/navigation/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import LoadingBar from "./components/common/LoadingBar";
import PageAuth from "./common/PageAuth";
import { login, logout } from "./slices/auth/auth";
import { getAll as getAllFiles } from "slices/storage/file";
import { getAll as getAllFolders } from "slices/storage/folder";
import { getByName, create as createSite, getAll as getAllSites } from "./slices/site/site";
import { getAllForUser as getAllEnrollmentsForUser, getAllForSite as getAllEnrollmentsForSite, getAll as getAllEnrollments } from "./slices/scheduling/enrollment";
import { getAllForSite as getAllProductPermissionsForSite, getAll as getAllProductPermissions } from "./slices/ecommerce/product_permissions";
import { getAllForSite as getAllProductsForSite, getAll as getAllProducts, create as createProduct } from "./slices/ecommerce/product";
import { getAll as getAllSiteProductAvailabilities } from "./slices/site/site_product_availability";
import { create as createUser, getAll as getAllUsers, getAllForSite as getAllUsersForSite, getSuperUsers } from "./slices/auth/user";
import { getAll as getAllUserSiteAvailabilities } from "./slices/site/user_site_availability";
import { getAll as getAllSitePermissions } from "./slices/auth/site_permissions";
import { getAll as getAllSessions } from "./slices/scheduling/session";
import { getAll as getAllSiteObjects } from "./slices/site_building/site_object";
import SettingsDrawer from 'components/settings/SettingsDrawer';
import CustomOverlay from 'components/elements/CustomOverlay';
import { Menu, MenuDivider, Tab, Tree, Position, DrawerSize, Overlay, MenuItem } from '@blueprintjs/core';
import PageTester from "REVIEW/new/PageTester";
import EventBus from "common/EventBus";
import ProductList from "components/ecommerce/ProductList";
import Calendar from "components/scheduling/Calendar";
import Blog from "components/blog/Blog";
import Post from "components/blog/Post";
import User from "components/user/User";
import Product from "components/ecommerce/Product";
import UserBoard from "components/user/UserBoard";
import MarkdownEditor from "components/tools/markdown_editor/MarkdownEditor";
import HeaderBuilder from 'components/page_builder/HeaderBuilder';
import PageBuilder from 'components/page_builder/PageBuilder';
import UserList from 'REVIEW/new/UserList';
import FileManager from 'components/storage/NewFileManager';
import ProductManagementDashboard from 'components/ecommerce/ProductManagement';
import ChatComponent from 'components/chat/ChatComponent';
import Form from 'components/form/Form';
import PostManager from './components/blog/PostManager';


function App() {
  const globalTheme = useSelector((state) => state.theme.global);
  const { current_site: currentSite } = useSelector((state) => state.site);
  const { fetching: fetchingSite } = useSelector((state) => state.site);
  const { fetched: fetchedSite } = useSelector((state) => state.site);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [overlayContent, setOverlayContent] = useState(null);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getGlobalAdminData = () => {
    if (PageAuth.globalAdminAuth(currentUser)) {
      dispatch(getAllProducts());
      dispatch(getAllSiteProductAvailabilities());
      dispatch(getAllSites());
      dispatch(getAllEnrollments());
      dispatch(getAllProductPermissions());
      dispatch(getAllUserSiteAvailabilities());
      dispatch(getAllUsers());
      dispatch(getAllSitePermissions());
      dispatch(getAllSessions());
      dispatch(getAllSiteObjects());
      dispatch(getAllFiles());
      dispatch(getAllFolders());
      //needs all users
      //needs all products
      //needs all sites
      //needs all enrollments
      //needs all product permissions
      //needs all site product availabilities
      //needs all user site availabilities
      //needs all site permissions
    }
  }
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user && !user.includes("undefined")) {
      login(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    EventBus.on("logout", () => {
      dispatch(logout());
    });
    return function cleanup() {
      EventBus.remove("logout");
    }
  });

  useEffect(() => {
    let subdomain = window.location.host.split(".")[0];

    if (subdomain.includes("localhost")) {
      subdomain = "main";
    }

    dispatch(getByName({ name: subdomain }));
    if (currentUser) {
      // getUserData();
      // getSuperUserData();
      // getSiteAdminData();
      getGlobalAdminData();
    } else {
      dispatch(getAllProductsForSite());
      dispatch(getSuperUsers());
    }

  }, [currentUser]);
  const setPanel = (panel) => {
    setOverlayContent(panel);
    setIsDrawerOpen(false);
    setIsOverlayOpen(true);
  }

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const userLoggedInMenu = [
    {
      type: 'dropdown',
      id: 'inbox',
      label: 'Inbox',
      icon: 'box',
      hasCaret: true,
      children: [
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'chat',
          label: 'Chat',
          icon: 'chat',
          hasCaret: false,
          panel: <ChatComponent />, // Placeholder for the actual component
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'messages',
          label: 'Messages',
          icon: 'envelope',
          hasCaret: false,
          panel: <div>Messages</div>,
        },
      ],
    },
    {
      type: 'dropdown',
      id: 'settings',
      label: 'Settings',
      icon: 'cog',
      hasCaret: true,
      children: [
          {
            type: 'label',
            id: 'style',
            label: 'style',
          },
          {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'styling',
          label: 'Styling',
          icon: 'style',
          panel: <div>Main Styling</div>,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'global_styles',
          label: 'Global Styling',
          icon: 'globe',
          panel: <div>Global Styling</div>,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'pages',
          label: 'Site Layout',
          hasCaret: false,
          icon: 'document',
          panel: <PageBuilder />, // Placeholder for the actual component
        },
        {
          type: 'label',
          id: 'admin',
          label: 'admin',
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'site_information',
          label: 'Site Info',
          icon: 'info-sign',
          panel: <div>Site Information</div>,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'users',
          label: 'Users',
          icon: 'people',
          panel: <UserList />, // Placeholder for the actual component
        },
        {
          type: 'label',
          id: 'ecommerce',
          label: 'ecommerce',
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'product_management',
          label: 'Products',
          icon: 'shopping-cart',
          panel: <ProductManagementDashboard />, // Placeholder for the actual component
        },
        {
          type: 'label',
          id: 'scheduling',
          label: 'scheduling',
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'calendar',
          label: 'Calendar',
          icon: 'calendar',
          panel: <div>Calendar</div>,
        },
        {
          type: 'label',
          id: 'content',
          label: 'content'
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'posts',
          label: 'Posts',
          icon: 'book',
          panel: <PostManager />,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'file_manager',
          label: 'File Manager',
          icon: 'folder-close',
          panel: <FileManager />, // Placeholder for the actual component
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'example form',
          label: 'Example Form',
          icon: 'form',
          panel: <Form />, // Placeholder for the actual component
        },
        {
          type: 'label',
          id: 'marketing',
          label: 'marketing'
        }],
    },
    {
      type: 'dropdown',
      id: 'store',
      label: 'Store',
      icon: 'shopping-cart',
      hasCaret: true,
      children: [
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'cart',
          label: 'Cart',
          icon: 'shopping-cart',
          panel: '<div>Cart</div>',
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'saved-items',
          label: 'Saved Items',
          icon: 'bookmark',
          panel: '<div>Saved Items</div>',
        },
      ],
    },
    {
      type: 'dropdown',
      id: 'profile',
      label: 'Profile',
      icon: 'user',
      hasCaret: true,
      children: [
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'profileInfo',
          label: 'Profile Info',
          icon: 'info-sign',
          panel: '<div>Profile Information</div>',
        },
        {
          type: 'onClick',
          id: 'logout',
          label: 'Logout',
          icon: 'logout',
          onClickHandler: () => logOut()
        },
        // Add more user sub-items as needed
      ],
    },
    // ... Add more items as needed
  ];
  const userLoggedOutMenu = [
    {
      type: 'onClick',
      id: 'signup',
      label: 'Signup',
      icon: 'mugshot',
      onClickHandler: () => setIsRegisterOpen(true),
    },
    {
      type: 'onClick',
      id: 'login',
      label: 'Login',
      icon: 'login',
      onClickHandler: () => setIsLoginOpen(true),
    },
    // ... Add more items as needed
  ];

  const headerMenu = [
    {
      type: 'link',
      icon: 'home',
      label: 'Home',
      link: '/'
    },
    {
      type: 'link',
      icon: 'shop',
      label: 'Store',
      link: '/products'
    },
    {
      type: 'link',
      icon: 'user',
      label: 'Users',
      link: '/users'
    },
    {
      type: 'link',
      icon: 'calendar',
      label: 'Calendar',
      link: '/calendar'
    },
    {
      type: 'link',
      icon: 'edit',
      label: 'Markdown',
      link: '/markdown'
    },
    // {
    //   type: 'link',
    //   icon: 'edit',
    //   label: 'Header Builder',
    //   link: '/header'
    // },
  ];

  return (
    <Router>
      <div className="App" css={css`
        background-color: ${globalTheme.backgroundColor};
        color: ${globalTheme.color}
    `}>
        <Header headerMenu={headerMenu} userLoggedInMenu={userLoggedInMenu} userLoggedOutMenu={userLoggedOutMenu} setOverlayContent={setOverlayContent} setIsOverlayOpen={setIsOverlayOpen} setIsRegisterOpen={setIsRegisterOpen} setIsLoginOpen={setIsLoginOpen} setIsDrawerOpen={setIsDrawerOpen} />
        <SettingsDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} setOverlayContent={setOverlayContent} setIsOverlayOpen={setIsOverlayOpen} />
        <CustomOverlay isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen}>{overlayContent}</CustomOverlay>
        {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} />}
        <CustomOverlay isOverlayOpen={isRegisterOpen} setIsOverlayOpen={setIsRegisterOpen}><Register /></CustomOverlay>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<PageTester />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user-board" element={<UserBoard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/markdown" element={<MarkdownEditor />} />
          <Route path="/header" element={<HeaderBuilder />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


