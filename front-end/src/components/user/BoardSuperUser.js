/**
 * This is a BoardSuperUser functional component that renders a list of products and a list of users.
 * It uses the useState and useEffect hooks.
 * When the component mounts, it calls the ContentService to get data and stores it in the content state variable.
 * If there is an error getting the data, it sets
 */
import React, { useState, useEffect } from "react";
import ProductList from "../../REVIEW/old/components_2/ecommerce/ProductList";
import ContentService from "../../REVIEW/old/services/site/content.service";
import EventBus from "../../common/EventBus";
import UserList from "../../REVIEW/old/components_2/common/UserList";

const BoardSuperUser = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        ContentService.getSuperUserBoard().then(
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
            <ProductList mode={"owned"} />\
            <UserList mode={"student"} />
        </div>
    );
};

export default BoardSuperUser;
