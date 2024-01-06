/** Card component that takes in props for photo, title, tagline, location, rating, & price (if applicable)
Renders card w/ given style & props */

import React from "react";
import { Button } from '@blueprintjs/core';
import { Link } from "react-router-dom";
const Card = ({content, element}) => {
    console.log(content);
    return (
        <div
            className="card"
            key={element._id}
            >
            {content}
        </div>
    )
}

export default Card;