import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Overlay2, Button, Intent
} from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const CustomOverlay = (props) => {
    const pageContainerTheme = useSelector((state) => state.theme.page_container);
    return (
        <Overlay2 usePortal={true} hasBackdrop={true} isOpen={props.isOverlayOpen || false}>
            <div className="overlay-container">
                <div className="close-button">
                    <Button intent={Intent.DANGER} onClick={() => props.setIsOverlayOpen(false)} style={{ margin: "" }}>
                        X
                    </Button>
                </div>
                {props.children}
            </div>
        </Overlay2>
    );
}

export default CustomOverlay;