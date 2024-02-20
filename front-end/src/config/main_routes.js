import HomePage from 'pages/HomePage';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import ProductList from 'components/ecommerce/ProductList';
import CheckoutComponent from 'components/ecommerce/CheckoutComponent';
import UserList from 'components/user/UserList';
import Calendar from 'components/scheduling/Calendar';
import ProductComponent from 'components/ecommerce/ProductComponent';
import User from 'components/user/UserPage';
import Post from 'components/blog/Post';
import UserBoard from 'components/user/UserBoard';
import Blog from 'components/blog/Blog';
import MarkdownEditor from 'components/tools/MarkdownEditor';
import HeaderBuilder from 'components/page_builder/HeaderBuilder';
import CsvMappingComponent from 'components/storage/CSVMapper';
import PageBuilder from 'components/page_builder/PageBuilder';
import PostManager from 'components/blog/PostManager';


export const main_routes = [
    { path: "/", element: <HomePage /> },
    { path: "/home", element: <HomePage /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/products", element: <ProductList /> },
    { path: "/checkout", element: <CheckoutComponent />},
    { path: "/users", element: <UserList /> },
    { path: "/calendar", element: <Calendar /> },
    { path: "/product/:id", element: <ProductComponent /> },
    { path: "/user/:id", element: <User /> },
    { path: "/post/:id", element: <Post /> },
    { path: "/user-board", element: <UserBoard /> },
    { path: "/blog", element: <Blog /> },
    { path: "/markdown", element: <MarkdownEditor /> },
    { path: "/header", element: <HeaderBuilder /> },
    { path: "/csvtest", element: <CsvMappingComponent /> },
    { path: "/page-builder", element: <PageBuilder /> },
    { path: "/post-manager", element: <PostManager /> }, 
    { path: "/blog", element: <Blog /> },
  ];