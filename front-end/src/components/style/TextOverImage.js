/* Component that takes in props for image & text.
Renders a background image w/ text box overlayed on top. */

import React from "react";

const TextOverImage = ({ page }) => {
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

    const divStyleForElements = {
        position: "absolute",
        display: "flex",
        placeItems: "center",
        justifyContent: "center",
        inset: "0",
        border: "2px solid lightblue",
        backgroundColor: "#ffffff30",
        height: '225px',
        width: '460px',
        top: '140px',
        left: '143px'
    }

    return (
        <div>
            <div className="relative m-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <img src={page.src} alt="browse products" className="bg-img hover:scale-105 transition duration-500" />
                    { typeof page.title == 'string' &&
                    <div style={divStyle} className="m-7 md:m-32 translate-y-16 translate-x-12 md:-translate-y-8 md:-translate-x-10 border-dark-blue">
                        <h3 className="text-xl text-center text-dark-blue">{page.title}</h3>
                    </div>
                    }
                    {
                        typeof page.title != 'string' && <div className="text-xl text-center text-dark-blue" style={divStyleForElements}>{page.title}</div>
                    }
            </div>
        </div>
    )
}

export default TextOverImage;