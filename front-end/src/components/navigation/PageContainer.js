import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Section, Button, Alignment
} from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Settings from "components/settings/SettingsDrawer";

const PageContainer = (props) => {
    const pageContainerTheme = useSelector((state) => state.theme.page_container);
    return (
        <div style={props.modal ? {backgroundColor: "transparent", position: "absolute", zIndex:"100", minHeight: '900px', height: 'auto', width: '100%'} : {minHeight: '900px', height: 'auto', width: '100%'}}>
            <Section id="page-container" css={css`
            background-color: ${pageContainerTheme.backgroundColor};
            color: ${pageContainerTheme.color} !important;
            width: 300px;
            margin: 25px auto;
            height: 100%;
            border: 2px solid gray;
            border-radius: 0.3rem;
        `}>
            {props.children}
            </Section>
        </div>
    );
}

export default PageContainer;