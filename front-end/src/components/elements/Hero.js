/** Hero component containing page title, supporting text, & search bar.
Background image set dynamically based on 'page' prop. */

import React from "react";
import PageDivider from "../style/PageDivider";

const Hero = ({ page }) => {
    // hero styling elements
    const heroStyle = {
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '540px',
        position: 'relative',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(to bottom, rgba(14, 15, 59, 0.4) 10%, rgba(7, 81, 131, 0.4) 40%, rgba(0, 147, 203, 0.4) 70%), url("${page.image}")`,
        backgroundBlendMode: 'multiply',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        opacity: '.6',
        color: 'white'
    };

    // component content
    return (
        <div className={page.className} style={heroStyle}>
            <div className="justify-center text-center md:text-left">
                <div style={{marginTop: '13rem'}} className="my-20">
                    <h1 className="md:pl-14 text-6xl md:text-7xl">{page.heading}</h1>
                    <h2 className="md:pl-14 text-2xl md:text-4xl">{page.secondaryHeading}</h2>
                    {page.search &&
                        <div className="flex items-center justify-center w-full">
                            {/* <SearchBar /> */}
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Hero;