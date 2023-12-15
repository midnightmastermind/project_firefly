/* Component that takes in props for image & text.
Renders a background image w/ text box overlayed on top. */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import SiteObjectToolbox from './SiteObjectToolbox';

const SiteObjectToolbox = ({ props }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [highlightedObject, setHighlightedObject] = useState(false);
    const [currentSiteObjectToolbox, setCurrentSiteObjectToolbox] = useState([]);


    const toggleModal = (modal_type, id) => {
        setIsModalOpen(!isModalOpen);
        setModalView(modal_type);
        //either set id or find the object in array? decisions decisions
        setHighlightedObject(id);
        //^^^ erase and look up object
        //then in modal, check id or object if its new or not and update site_object_toolbox editor accordingly
    }

    // inner div styling elements
    const divStyle = {
        position: "absolute",
        height: "5rem",
        width: "16rem",
        display: "flex",
        placeItems: "center",
        justifyContent: "center",
        inset: "0",
        border: "2px solid",
        backgroundColor: "white",
        opacity: "0.75",
    }

    return (
        <div className="site_object_toolbox-editor">
            {/* <div className="relative m-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <img src={site_object_toolbox.src} alt="browse products" className="bg-img hover:scale-105 transition duration-500" />
                    <div style={divStyle} className="m-7 md:m-32 translate-y-16 translate-x-12 md:-translate-y-8 md:-translate-x-10 border-dark-blue">
                        <h3 className="text-3xl text-center text-dark-blue">{site_object_toolbox.title}</h3>
                    </div>
            </div> */}
            <div className="site_object_toolbox-editor-header">SiteObjectToolbox Editor</div>
            <div className="plus-button" onClick={() => props.SiteObjectToolboxaddNewObject()}></div>
            <div className="site_object_toolbox-editor-container">
                { //TODO: make sure order is right, store layout somewhere?
                //make reusable components for site_object_toolbox: site_object_toolbox, component, etc.
                currentSiteObjectToolbox.children.map(currentSiteObjectToolboxObject => {
                    if(currentSiteObjectToolboxObject.type == "site_object_toolbox") {
                        return (<div className="site_object_toolbox-object-container" onClick={(currentSiteObject) => toggleModal("site_object_toolbox-editor", currentSiteObjectToolboxObject.id ? currentSiteObjectToolboxObject.id : null)}></div>);
                    }
                })}
            </div>

            {isModalOpen &&
                <div className="site_object-toolbox-container">

                </div> 
            }
        </div>
    )
}

export default SiteObjectToolbox;