import React from "react";
import { Tab, Tabs } from "@blueprintjs/core";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Carousel from "components/elements/Carousel";
import Calendar from "components/scheduling/Calendar";
import UserForm from "./UserForm";

const User = ({ user }) => {
    const imagesArray = [];
    imagesArray[0] = {
        type: 'image',
        src: user.profile_image
    };

    const image = (
        <div className="user-preview-image"><Carousel settings={{ showThumbs: false }} items={imagesArray} /></div>
    );

    const tabsData = [
        { id: 'info', title: 'Info', content: <UserForm data={user} /> },
        { id: 'calendar', title: 'Calendar', content: <div className="user-preview-calendar"><Calendar /></div> },
        { id: 'products', title: 'Products', content: 'Products Content Goes Here' },
    ];

    return (
        <div className="user-preview">
            <div className="user-preview-header-box">
                {image}
                <div className="user-preview-info">
                    <div className="user-preview-username-container">{user.username}</div>
                    <div className="user-preview-name-container">{user.first_name} {user.last_name}</div>
                    <div className="user-preview-description-container">{user.description}</div>
                </div>
            </div>

            <div className="user-preview-tabs-container">
                <Tabs id="user-preview-tabs" defaultSelectedTabId={tabsData[1].id}>
                    {tabsData.map((tab) => (
                        <Tab key={tab.id} id={tab.id} title={tab.title} panel={tab.content} />
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default User;

