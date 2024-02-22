import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Overlay2, Button, Intent, Classes
} from "@blueprintjs/core";
// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react"

const CustomOverlay = (props) => {
    const pageContainerTheme = useSelector((state) => state.theme.page_container);
    return (
        <Overlay2 className={`${Classes.OVERLAY_SCROLL_CONTAINER}`} usePortal={true} isOpen={props.isOverlayOpen}>
            {/* <div className="overlay-container">
                <div className="close-button">
                    <Button intent={Intent.DANGER} onClick={() => props.setIsOverlayOpen(false)} style={{ margin: "" }}>
                        X
                    </Button>
                </div> */}
                <div className={`${Classes.CARD} ${Classes.ELEVATION_4}`}>
                    {props.children}
                </div>
            {/* </div> */}
        </Overlay2>
    );
}

export default CustomOverlay;