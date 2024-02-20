/**
 * This code imports the React, useState, and useEffect hooks, as well as the ProductList, ContentService, and EventBus components.
 * It creates a BoardUser functional component that renders a list of products that the user is enrolled in.
 */
import React, { useState, useEffect } from "react";
import ProductList from "../../../../../project_attack_of_the_clones/REVIEW/old/components_2/ecommerce/ProductList";
import ContentService from "../../../REVIEW/old/services/site/content.service";
import EventBus from "../../../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    ContentService.getUserBoard().then(
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
      <ProductList mode={"enrolled"} />
    </div>
  );
};

export default BoardUser;
