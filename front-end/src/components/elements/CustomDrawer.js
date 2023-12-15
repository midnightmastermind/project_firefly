import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Drawer,
  DrawerSize,
  Classes,
  Position,
} from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CustomDrawer = (props) => {
  const {
    isOpen = false,
    usePortal = false,
    portalContainer,
    title,
    hasBackdrop,
    icon,
    size = DrawerSize.SMALL,
    position = Position.RIGHT,
  } = props;

  
  const footerTheme = useSelector((state) => state.theme.footer);

  const handleOpen = () => props.setIsDrawerOpen(true);
  const handleClose = () => props.setIsDrawerOpen(false);

  return (
    <div className="custom-drawer-container">
      <Drawer
        size={size}
        hasBackdrop={hasBackdrop}
        icon={icon} // Assuming you want to pass the icon prop here
        onClose={handleClose} // Fixed this.handleClose to handleClose
        usePortal={usePortal}
        portalContainer={portalContainer} // Assuming you want to pass the portalContainer prop here
        title={title} // Assuming you want to pass the title prop here
        isCloseButtonShown={true}
        isOpen={isOpen}
        position={position}
        canOutsideClickClose={true}
        css={css`
          background-color: ${footerTheme.backgroundColor};
          color: ${footerTheme.color};
        `}
      >
        <div className={Classes.DRAWER_BODY}>{props.children}</div>
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
