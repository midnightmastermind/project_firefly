import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import {
    Section, Button, Alignment, Position, DrawerSize, Menu, MenuItem
} from "@blueprintjs/core";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Settings from "components/settings/SettingsDrawer";
import CustomDrawer from "components/elements/CustomDrawer";

const PageTester = (props) => {
    const myRef = useRef();
    console.log(myRef.current);
    const pageContainerTheme = useSelector((state) => state.theme.page_container);
    const [isOpen, setIsOpen] = useState(false);
    const [reference, setReference] = useState(null);

    useEffect(() => {
        setReference(myRef.current)
    },[myRef]);

    return (
        <div className="page-wrapper" style={{minHeight: '900px', height: '100%', width: '100%'}}>
            <CustomDrawer
                isOpen={isOpen}
                setIsDrawerOpen={setIsOpen}
                usePortal={true}
                portalContainer={reference}
                title={'Settings'}
                hasBackdrop={false}
                position={Position.LEFT}
                size={DrawerSize.SMALL}
                closedDrawerContent={null}
            >
                <div style={{ display: 'block', width: 250, marginLeft: 100, minHeight: '900px' }}>
                    {props.drawerContent}
                </div>
            </CustomDrawer>
            <Section id="page-container" className="page-container" ref={myRef} css={css`
                background-color: ${pageContainerTheme.backgroundColor};
                color: ${pageContainerTheme.color} !important;
                width: 900px;
                margin: 25px auto;
                height: 100%;
                min-height: 600px;
                border: 2px solid gray;
                border-radius: 0.3rem;
                display: flex;
        `}>
            <div className="side-menu-closed">
                <Button icon='menu' onClick={() => setIsOpen(true)}></Button>
            </div>
            <div className="page-container-content">
                {props.children}
            </div>
            </Section>
        </div>
    );
}

export default PageTester;