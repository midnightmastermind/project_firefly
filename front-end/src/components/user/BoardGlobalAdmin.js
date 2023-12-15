/**
 * This code is a functional component that renders a list of either sites, products, or users depending on what the user has selected.
 * The selected option is stored in state and when it changes, a different list is rendered.
 */
import React, { useState, useEffect } from "react";
import ProductList from "../../REVIEW/old/components_2/ecommerce/ProductList";
import UserList from "../../REVIEW/old/components_2/common/UserList";
import ContentService from "../../REVIEW/old/services/site/content.service";
import EventBus from "../../common/EventBus";
import SiteList from "../../REVIEW/old/components_2/common/SiteList";

const BoardGlobalAdmin = () => {
    const [content, setContent] = useState("");
    const [selectedOption, setSelectedOption] = useState("sites");

    useEffect(() => {
        ContentService.getGlobalAdminBoard().then(
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

    const handleTypeSelect = e => {
        console.log(e);
        setSelectedOption(e.target.value);
    };
    
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
            <div className="admin-select-container">
                <label htmlFor="admin_select"></label>
                <select id="admin_select" value={selectedOption} onChange={handleTypeSelect}>
                    <option key="sites" value="sites">Sites</option>
                    <option key="products" value="products">Products</option>
                    <option key="users" value="users">Users</option>
                </select>
            </div>
            {selectedOption == "sites" && (<SiteList />)}
            {selectedOption == "products" && (<ProductList mode="global_admin" />)}
            {selectedOption == "users" && (<UserList mode="global_admin" />)}
        </div>
    );
};

export default BoardGlobalAdmin;
