/**
 * This code is the BoardAdmin page.
 * It contains a header and two lists, one for products and one for users.
 * The header contains content that is fetched from the ContentService.
 * The lists are fetched from the ProductList and UserList components.
 */
import React, { useState, useEffect } from "react";
import ProductList from "../../REVIEW/old/components_2/ecommerce/ProductList";
import UserList from "../../REVIEW/old/components_2/common/UserList";
import ContentService from "../../REVIEW/old/services/site/content.service";
import EventBus from "../../common/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    ContentService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <ProductList mode={'admin'}/>
      <UserList mode={'admin'}/>
    </div>
  );
};

export default BoardAdmin;
