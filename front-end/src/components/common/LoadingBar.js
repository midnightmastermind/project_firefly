/**
 * This code renders a loading bar with different colors.
 */
import React from "react";
import { RingLoader } from 'react-spinners';
import { ReactComponent as ExampleSvg } from 'vitruvian-man.svg';

const LoadingBar = () => {

    return (
        <div className="loading-bar-container">
            <div className="loading-bar">
                {<RingLoader color="white" />}
            </div>
            <ExampleSvg className="vitruvian"/>
        </div>
    );
};

export default LoadingBar;