
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import ProductManagementDashboard from 'components/ecommerce/ProductManagement';
import ProductForm from 'components/ecommerce/ProductForm';
import Calendar from 'components/scheduling/Calendar';
import FileManager from 'components/storage/FileManager';
import Form from 'components/form/Form';
import Profile from 'components/auth/Profile';
import Cart from 'components/ecommerce/Cart';
import SavedItems from 'components/ecommerce/SavedItems';
import SiteStyleSettings from 'components/style/SiteStyleSettings';
import SiteAdminSettings from 'components/settings/SiteAdminSettings';
import UserForm from 'components/user/UserForm';
import PostManager from 'components/blog/PostManager';

const createUserLoggedInMenu = (setPanel, logOut, currentUser, toggleChat) => [
    {
      type: 'onClick',
      id: 'chat',
      label: 'Chat',
      icon: 'chat',
      hasCaret: false,
      mobileView: true,
      onClickHandler: toggleChat, // Placeholder for the actual component
    },
    {
      type: 'dropdown',
      id: 'settings',
      label: 'Settings',
      icon: 'cog',
      hasCaret: true,
      mobileView: true,
      children: [
        {
          type: 'label',
          id: 'admin',
          label: 'admin',
          mobileView: true,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'site_admin_settings',
          label: 'Site Admin Settings',
          icon: 'info-sign',
          mobileView: true,
          panel: <SiteAdminSettings />,
          // panel: <SiteAdminSettings data={currentSite} />,

        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'site_styles',
          label: 'Site Styling',
          icon: 'globe',
          mobileView: true,
          panel: <SiteStyleSettings />,
        },
        {
          type: 'label',
          id: 'ecommerce',
          label: 'ecommerce',
          mobileView: true,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'product_management',
          label: 'Products',
          icon: 'shopping-cart',
          mobileView: true,
          panel: <ProductManagementDashboard />, // Placeholder for the actual component
        },
        // {
        //   type: 'panel',
        //   onClickHandler: setPanel,
        //   id: 'product_form',
        //   label: 'Product Form Test',
        //   icon: 'shopping-cart',
        //   mobileView: true,
        //   panel: <ProductForm />
        //   //onUpdateProduct={() => { console.log("test")}} />, // Placeholder for the actual component
        // },
        {
          type: 'label',
          id: 'scheduling',
          label: 'scheduling',
          mobileView: true,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'calendar',
          label: 'Calendar',
          icon: 'calendar',
          panel: <Calendar />,
          mobileView: true,
        },
        {
          type: 'label',
          id: 'content',
          label: 'content',
          mobileView: true,
        },
        // {
        //   type: 'panel',
        //   onClickHandler: setPanel,
        //   id: 'posts',
        //   label: 'Posts',
        //   icon: 'book',
        //   panel: <PostManager />,
        // },
        {
          type: 'link',
          icon: 'book',
          label: 'Posts',
          link: '/post-manager',
          mobileView: true,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'file_manager',
          label: 'File Manager',
          icon: 'folder-close',
          mobileView: true,
          panel: <FileManager />, // Placeholder for the actual component
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'example form',
          label: 'Example Form',
          icon: 'form',
          mobileView: true,
          panel: <Form />, // Placeholder for the actual component
        },
        {
          type: 'label',
          id: 'marketing',
          mobileView: true,
          label: 'marketing'
        },
        {
          type: 'label',
          id: 'analytics',
          mobileView: true,
          label: 'analytics'
        }],

    },
    {
      type: 'dropdown',
      id: 'store',
      label: 'Cart',
      icon: 'shopping-cart',
      mobileView: true,
      hasCaret: true,
      children: [
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'cart',
          label: 'Cart',
          mobileView: true,
          icon: 'shopping-cart',
          panel: <Cart hasCheckoutButton={true} /> //hasCheckoutButton={true} isEditable={true} title={'Shopping Cart'} />,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'saved-items',
          mobileView: true,
          label: 'Saved Items',
          icon: 'bookmark',
          panel: <SavedItems />,
        },
      ],
    },
    {
      type: 'dropdown',
      id: 'profile',
      label: currentUser?.username,
      icon: 'user',
      mobileView: true,
      hasCaret: true,
      children: [
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'profileInfo',
          label: 'Profile',
          icon: 'info-sign',
          mobileView: true,
          panel: <Profile />,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'userInfo',
          label: 'User Info',
          mobileView: true,
          icon: 'info-sign',
          panel: <UserForm data={currentUser} />,
        },
        {
          type: 'panel',
          onClickHandler: setPanel,
          id: 'calendar',
          mobileView: true,
          label: 'Calendar',
          icon: 'calendar',
          panel: <Calendar />,
        },
        {
          type: 'onClick',
          id: 'logout',
          mobileView: true,
          label: 'Logout',
          icon: 'log-out',
          onClickHandler: () => logOut()
        },
        // Add more user sub-items as needed
      ],
    },
    // ... Add more items as needed
  ];

  const createUserLoggedOutMenu = (setPanel, closeCallback) => [
    {
      type: 'panel',
      id: 'signup',
      label: 'Signup',
      onClickHandler: setPanel,
      icon: 'mugshot',
      panel: <Register />
    },
    {
      type: 'panel',
      id: 'login',
      onClickHandler: setPanel,
      label: 'Login',
      icon: 'log-in',
      panel: <Login closeCallback={closeCallback} />
    },
    // ... Add more items as needed
  ];

  const createHeaderMenu = (setPanel, logOut) => [
    {
      type: 'link',
      icon: 'home',
      label: 'Home',
      link: '/',
      id: 'home'
    },
    {
      type: 'link',
      icon: 'shop',
      label: 'Store',
      link: '/products',
      id: 'store'
    },
    {
      type: 'link',
      icon: 'user',
      label: 'Users',
      link: '/users',
      id: 'users'
    },
    // {
    //   type: 'link',
    //   icon: 'calendar',
    //   label: 'Calendar',
    //   link: '/calendar'
    // },
    {
      type: 'link',
      icon: 'edit',
      label: 'Page Builder',
      link: '/page-builder',
      id: 'page-builder'
    },
    // {
    //   type: 'link',
    //   icon: 'edit',
    //   label: 'Header Builder',
    //   link: '/header'
    // },
  ];

  const createFooterMenu = (setPanel, logOut) => [
    {
      type: 'link',
      icon: 'home',
      label: 'Home',
      link: '/'
    },
    {
      type: 'link',
      icon: 'shop',
      label: 'Products',
      link: '/products'
    },
    {
      type: 'link',
      icon: 'shopping-cart',
      label: 'Checkout',
      link: '/checkout'
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
      icon: 'user',
      label: 'User Board',
      link: '/user-board'
    },
    {
      type: 'link',
      icon: 'book',
      label: 'Markdown',
      link: '/markdown'
    },
    {
      type: 'link',
      icon: 'book',
      label: 'Header Builder',
      link: '/header'
    },
    {
      type: 'link',
      icon: 'book',
      label: 'CSV Upload',
      link: '/csvtest'
    },
    {
      type: 'link',
      icon: 'book',
      label: 'Page Builder',
      link: '/page-builder'
    },
    {
      type: 'link',
      icon: 'book',
      label: 'Post Manager',
      link: '/post-manager'
    },
    {
      type: 'link',
      icon: 'book',
      label: 'Blog',
      link: '/blog'
    },
  ];

  export {
    createUserLoggedInMenu,
    createUserLoggedOutMenu,
    createHeaderMenu,
    createFooterMenu,
  };