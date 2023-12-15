import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Navbar, NavbarHeading, NavbarGroup,
    NavbarDivider, Button, Alignment
} from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const Footer = () => {
    const footerTheme = useSelector((state) => state.theme.footer);

    return (
        <Navbar className="footer-nav" css={css`
            background-color: ${footerTheme.backgroundColor};
            color: ${footerTheme.color};
            bottom: 0px;
        `}>
            <div>footer</div>
        </Navbar>
    );
}

export default Footer;