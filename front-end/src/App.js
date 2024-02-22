import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react"

import { BlueprintProvider, Classes, Overlay2 } from '@blueprintjs/core';
import { login, logout } from "slices/auth/auth";
import { getAll as getAllFiles } from "slices/storage/file";
import { getAll as getAllFolders } from "slices/storage/folder";
import { getByName, create as createSite, getAll as getAllSites } from "slices/site/site";
import { getAllForUser as getAllEnrollmentsForUser, getAllForSite as getAllEnrollmentsForSite, getAll as getAllEnrollments } from "slices/scheduling/enrollment";
import { getAllForSite as getAllProductPermissionsForSite, getAll as getAllProductPermissions } from "slices/ecommerce/product_permissions";
import { getAllForSite as getAllProductsForSite, getAll as getAllProducts, create as createProduct } from "slices/ecommerce/product";
import { getAll as getAllSiteProductAvailabilities } from "slices/site/site_product_availability";
import { create as createUser, getAll as getAllUsers, getAllForSite as getAllUsersForSite, getSuperUsers } from "slices/auth/user";
import { getAll as getAllUserSiteAvailabilities } from "slices/site/user_site_availability";
import { getAll as getAllSitePermissions } from "slices/auth/site_permissions";
import { getAll as getAllSessions } from "slices/scheduling/session";
import { getAll as getAllCartItems } from "slices/ecommerce/cart_item";
import { getAll as getAllPages } from "slices/site_building/page";
import { getAll as getAllPosts } from "slices/blog/post";
// import SettingsDrawer from 'components/settings/SettingsDrawer';
import CustomOverlay from 'components/elements/CustomOverlay';

import Header from 'components/navigation/Header';
import Footer from "components/navigation/Footer";

import PageAuth from "common/PageAuth";
import EventBus from "common/EventBus";

import PageComponent from "components/navigation/PageComponent";

// import ChatContainer from "components/chat/new_chat/ChatContainer";
// import ChatComponent from "components/chat/ChatComponent";
// import ChatComponent from "components/chat/ChatComponent";
import ChatComponent from "components/chat/ChatComponent";
import Toast from "components/notifications/Toast";
import ProductComponent from "components/ecommerce/ProductComponent";
// import ChatService from "components/chat/test/ChatService";
import socket from "common/socketConfig";



import {
  createUserLoggedInMenu,
  createUserLoggedOutMenu,
  createHeaderMenu,
  createFooterMenu,
} from 'config/header_menus';

import { main_routes } from "config/main_routes";


function App() {
  const globalTheme = useSelector((state) => state.theme.global);
  const { current_site: currentSite } = useSelector((state) => state.site);
  const { fetching: fetchingSite } = useSelector((state) => state.site);
  const { fetched: fetchedSite } = useSelector((state) => state.site);
  const { user: currentUser } = useSelector((state) => state.auth);

  const [overlayContent, setOverlayContent] = useState(null);
  const { message } = useSelector((state) => state.message);
  const { pages } = useSelector((state) => state.page);
  const [routes, setRoutes] = useState([...main_routes]);
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
      dispatch(getAllPages());
      dispatch(getAllFiles());
      dispatch(getAllFolders());
      dispatch(getAllCartItems());
      dispatch(getAllPosts());

      dispatch({ type: 'server/fetchChats', data: currentUser.id });


      // dispatch(fetchChats());
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
      socket.on('connect', () => {
        const userId = currentUser.id; // Replace with the actual user ID
        socket.emit('setUserId', userId);
      });

    }

  }, []);

  useEffect(() => {
    if (pages) {
      const customRoutes = pages.map((page) => {
        return { path: page.route, element: <PageComponent page={page} /> }
      });
      setRoutes([...main_routes, ...customRoutes]);
    }
  }, [pages]);

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
  }

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const closePanel = () => {
    setOverlayContent(null);
  }
  const userLoggedInMenu = createUserLoggedInMenu(setPanel, logOut, currentUser);
  const userLoggedOutMenu = createUserLoggedOutMenu(setPanel, closePanel);
  const headerMenu = createHeaderMenu(setPanel, logOut);
  const footerMenu = createFooterMenu(setPanel, logOut);


  return (
    <Router>
      <BlueprintProvider>
        <div className="App">
          {/* //   css={css`
    //     background-color: ${globalTheme.backgroundColor};
    //     color: ${globalTheme.color}
    // `}> */}
          <Header headerMenu={headerMenu} userLoggedInMenu={userLoggedInMenu} userLoggedOutMenu={userLoggedOutMenu} setOverlayContent={setOverlayContent} />
          {/* <div><CustomOverlay isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen}>{overlayContent}</CustomOverlay></div> */}
          <Overlay2 onClose={() => { setOverlayContent(null) }} className={`${Classes.OVERLAY_SCROLL_CONTAINER}`} usePortal={true} isOpen={overlayContent != null} children={(
            <div className={`overlay-container ${Classes.CARD} ${Classes.ELEVATION_4}`}>
              {overlayContent}
            </div>
          )} />
          {/* <div className="overlay-container">
                <div className="close-button">
                    <Button intent={Intent.DANGER} onClick={() => props.setIsOverlayOpen(false)} style={{ margin: "" }}>
                        X
                    </Button>
                </div> */}

          {/* </div> */}
          <div className="page-container">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
          {currentUser && <ChatComponent currentUser={currentUser} />}
          <Footer footerMenu={footerMenu} />
          {/* <Toast /> */}
        </div>
      </BlueprintProvider>
    </Router>
  );
}

export default App;
