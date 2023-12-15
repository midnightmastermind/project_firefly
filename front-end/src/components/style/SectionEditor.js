/* Component that takes in props for image & text.
Renders a background image w/ text box overlayed on top. */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { create as createSiteObject, getAll as getAllSiteObjects } from "../../slices/site_building/site_object"


const SectionEditor = ({ findObject, addNewObject, section }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [highlightedObject, setHighlightedObject] = useState(false);
    const [currentSectionObjects, setCurrentSectionObjects] = useState([]);
    const [currentSectionId, setCurrentSectionId] = useState(null);


    // const site_objects = useSelector(( state => state.site_object.site_objects));
    const current_site = useSelector((state) => state.site.current_site);

    const dispatch = useDispatch();

    const newSectionObject = {
        type: "section",
        parent_id: null,
        children: []
    }

    useEffect(() => {     
        console.log(section);   
        //TO filter out everything that isnt a section
        setCurrentSectionObjects(section.children);
        setCurrentSectionId(section._id)
    }, [section]);

    const toggleModal = (modal_type, object_id) => {
        setIsModalOpen(!isModalOpen);
        
        const object = findObject(object_id);
        setHighlightedObject(object);
    }

    const addNewSection = (object) => {
        const new_object = object;
        new_object.parent_id = currentSectionId;

        addNewObject(new_object);
    }

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
        <div className="section-editor-container">
            {/* <div className="section-editor-header">Section 1</div> */}
            <div className="section-editor">
                {/* <div className="relative m-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <img src={section.src} alt="browarrayse products" className="bg-img hover:scale-105 transition duration-500" />
                        <div style={divStyle} className="m-7 md:m-32 translate-y-16 translate-x-12 md:-translate-y-8 md:-translate-x-10 border-dark-blue">
                            <h3 className="text-3xl text-center text-dark-blue">{section.title}</h3>
                        </div>
                </div> */}
                <div className="section-editor-toolbox-container">
                    <div className="section-editor-plus-button" onClick={() => addNewSection(newSectionObject)}></div>
                </div>
                <div className="section-editor-sections-container">
                    {currentSectionObjects && currentSectionObjects.map(sectionObject => {
                        if(sectionObject.type == "section") {
                            return (<div key={sectionObject._id} className="section-preview-block" onClick={() => toggleModal("section-editor", sectionObject._id)}></div>);
                        }
                    })}
                </div>
            </div>
            {isModalOpen &&
                <div className="section-editor-container">
                </div> 
            }
        </div>
    )
}

export default SectionEditor;