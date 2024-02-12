import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Navbar,
  NavbarHeading,
  NavbarGroup,
  NavbarDivider,
  Button,
  Alignment,
} from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from 'react-router-dom';

const Footer = ({ footerMenu }) => {
  const footerTheme = useSelector((state) => state.theme.footer);

  const navigate = useNavigate();
  
  return (
    <Navbar
      className="footer-nav"
      css={css`
        background-color: ${footerTheme.backgroundColor};
        color: ${footerTheme.color};
        bottom: 0px;
      `}
    >
      <NavbarGroup align={Alignment.LEFT}>
        {footerMenu.map((menuItem, index) => (
          <React.Fragment key={index}>
            <Button
              className="bp3-minimal"
              icon={menuItem.icon}
              text={menuItem.label}
              onClick={() => navigate(menuItem.link)}
            />
          </React.Fragment>
        ))}
      </NavbarGroup>
    </Navbar>
  );
};

export default Footer;
