import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Carousel from "components/elements/Carousel";

const UserPreview = ({user}) => {
    const imagesArray = [];
    imagesArray[0] = {
        type: 'image',
        src: user.profile_image
    };
  
  
    const image = (
      <div className="user-preview-image"><Carousel settings={{showThumbs: false}} items={imagesArray} /></div>//style={{ backgroundImage: `url(${getFieldByName('images')[0]})` }} />
    );
    return (
        <div className="user-preview">
            {image}
            <div className="user-preview-info">
                <div className="user-preview-username-container">{user.username}</div>
                <div className="user-preview-name-container">{user.first_name} {user.last_name}</div>
                <div className="user-preview-description-container">{user.description}</div>
            </div>
        </div>
    );
};

export default UserPreview;
