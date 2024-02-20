/**
 * This code is the Site component for the Global Admin page.
 * It renders a form for editing site information, a list of products, and a list of users.
 **/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../slices/site/site";
import { useParams } from "react-router-dom";
import PageAuth from "../../common/PageAuth";
import ProductList from "../ecommerce/ProductList";
import UserList from "../user/UserList";
import ToolBar from "../tools/ToolBar";
import SiteForm from "./SiteForm";

const Site = (props) => {
    const initialSiteState = {
        title: null,
        domain: null
    };

    const contentSchema = {
        site_image: "",
        primary_color: "",
        secondary_color: "",
        front_page_image: "",
        description: ""
    }
    const [showAdminTools, setShowAdminTools] = useState(false);
    const [showSiteEditForm, setShowSiteEditForm] = useState(false);
    const [showContentEditForm, setShowContentEditForm] = useState(false);
    const [contentToolList, setContentToolList] = useState([]);
    const [siteToolList, setSiteToolList] = useState([]);
    const [selectedOption, setSelectedOption] = useState("site");
    const [selectedSecondaryOption, setSelectedSecondaryOption] = useState("users");
    const [currentSite, setCurrentSite] = useState(initialSiteState);
    const [message, setMessage] = useState("");
    const { user: currentUser } = useSelector((state) => state.auth);
    const sites = useSelector(state => state.site.sites);

    const { site_id } = useParams();

    const dispatch = useDispatch();

    const handleTypeSelect = e => {
        console.log(e);
        setSelectedOption(e.target.value);
    };

    const handleSecondaryTypeSelect = e => {
        console.log(e);
        setSelectedSecondaryOption(e.target.value);
    };

    const updateSite = (siteData) => {
        dispatch(update({ id: currentSite.id, data: siteData }))
            .unwrap()
            .then(response => {
                setShowSiteEditForm(false);
            })
            .catch(e => {
                setShowSiteEditForm(false);
                console.log(e);
            });
    };

    const toggleSiteEditForm = () => {
        setShowSiteEditForm(!showSiteEditForm)
    }

    const toggleContentEditForm = () => {
        setShowContentEditForm(!showContentEditForm)
    }

    const updateContent = () => {
        setShowContentEditForm(false);
    }

    useEffect(() => {
        if (currentUser) {
            setShowAdminTools(PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser));
        }

        let current_site_id = props.site_id ? props.site_id : site_id;

        if (current_site_id && sites) {
            sites.forEach((site, index) => {
                if (site._id == current_site_id) {
                    setCurrentSite(site);
                }
            });
        }
    }, [sites, site_id]);

    useEffect(() => {
        const siteToolList = [
        ];

        if (!showSiteEditForm) {
            siteToolList.push({
                type: "button",
                text: "Edit Site",
                class: "add-new-button",
                callBackOrLink: toggleSiteEditForm
            })
        }
        setSiteToolList(siteToolList);

        const contentToolList = [
        ];
        if (!showContentEditForm) {
            contentToolList.push({
                type: "button",
                text: "Edit Content",
                class: "add-new-button",
                callBackOrLink: toggleContentEditForm
            })
        }
        setContentToolList(contentToolList);
    }, [sites, showContentEditForm,  showSiteEditForm]);

    return (
        <div className="component-container">
            {(showAdminTools) &&
                <div className="admin-select-container">
                    <label htmlFor="admin_select"></label>
                    <select id="admin_select" value={selectedOption} onChange={handleTypeSelect}>
                        <option key="site" value="site">Site Info</option>
                        <option key="content" value="content">Content</option>
                        <option key="availabilities" value="availabilities">Availabilities & Permissions</option>
                    </select>
                </div>
            }
            {selectedOption == "site" && (
                <div>
                    {(showAdminTools && !showSiteEditForm) &&
                        <ToolBar toolList={siteToolList} />
                    }
                    {!showSiteEditForm && currentSite && (
                        <div className="site-detail-container">
                            <div>Name: {currentSite.title}</div>
                            <div>Domain: {currentSite.domain}</div>
                        </div>
                    )}
                    {showSiteEditForm && currentSite && (
                        <SiteForm data={currentSite} callBackFunction={updateSite} />
                    )}
                </div>
            )}
            {selectedOption == "content" && (
                <div>
                    <h3>Content</h3>
                    {(showAdminTools && !showContentEditForm) &&
                        <ToolBar toolList={contentToolList} />
                    }
                    {!showContentEditForm && currentSite && (
                        <div className="site-detail-container">
                            <div>Description: {contentSchema.description}</div>
                            <div>Site Image: {contentSchema.site_image}</div>
                            <div>Primary Color: {contentSchema.primary_color}</div>
                            <div>Secondary Color: {contentSchema.secondary_color}</div>
                            <div>Front Page Image: {contentSchema.front_page_image}</div>
                        </div>
                    )}
                    {/* {showContentEditForm && (<SiteForm schema={contentSchema} header={null} callBackFunction={updateContent} />)} */}
                </div>
            )}
            {selectedOption == "availabilities" && (
                <div>
                    <h3>Availabilities</h3>
                    {(showAdminTools) && (
                        <div className="admin-select-container">
                            <label htmlFor="availability_select"></label>
                            <select id="availability_select" value={selectedSecondaryOption} onChange={handleSecondaryTypeSelect}>
                                <option key="products" value="products">Products</option>
                                <option key="users" value="users">Users</option>
                            </select>
                        </div>
                    )}
                    {selectedSecondaryOption == "products" && (<ProductList site_id={site_id} mode="global_admin" />)}
                    {selectedSecondaryOption == "users" && (<UserList site_id={site_id} mode="global_admin" />)}
                </div>
            )}
        </div>
    );
};

export default Site;
