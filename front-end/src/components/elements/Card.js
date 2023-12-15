/** Card component that takes in props for photo, title, tagline, location, rating, & price (if applicable)
Renders card w/ given style & props */

import React from "react";
import { Button } from '@blueprintjs/core';
import { Link } from "react-router-dom";
const Card = ({content, key}) => {
    console.log(content.image);
    return (
        <div
            className="card"
            key={key}
            >
                {content.image && <div className="card-image-container"><div className="card-image" style={{backgroundImage: `url(${content.image})`}} /> </div>}
                {content.header && <div className="card-header">{content.header}</div>}
                {content.info && <div className="card-info">{content.info}</div>}
                {content.link && <Button className="card-info">                <Link
                    className="link"
                    to={content.link.src}
                >
                    {content.link.text}
                </Link>
                </Button>}
        </div>
    )
}

export default Card;