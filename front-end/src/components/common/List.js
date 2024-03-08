import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Overlay2, ButtonGroup, Button, Card, Classes, PanelStack2 } from "@blueprintjs/core";
import LoadingBar from "components/common/LoadingBar";
import SearchBar from "components/common/SearchBar";
import Pagination from "components/common/Pagination";
import CustomTable from "components/elements/CustomTable";
import ListTable from "components/elements/ListTable";

import PageAuth from "common/PageAuth";
import { Divider } from "@blueprintjs/core";
import ToolBar from "components/tools/ToolBar";


const PageSize = 35;

const List = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showLoadingBar, setShowLoadingBar] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [toolList, setToolList] = useState(null);
    const [listType, setListType] = useState('list-view')
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentSite, setCurrentSite] = useState(null);
    const [currentPanelStack, setCurrentPanelStack] = useState([]);
    const [showPanel, setShowPanel] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { enrollments } = useSelector((state) => state.enrollment);
    const site_permissions = useSelector((state) => state.site_permissions.site_permissions);
    const { sites, current_site: site } = useSelector((state) => state.site);
    const { users } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const { scalingFactor, items, listHeader, siteAvailability, gridViewItem, listViewItem, filterFunction, itemPermissions, mode, overlayComponent, searchFields, isPanel, adminOverlay } = props;

    console.log(items);
    useEffect(() => {
        if (currentUser) {
            setIsAdmin(PageAuth.superUserAuth(currentUser) || PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser));
        }

        if (items) {
            let filtered = [];
            if (mode === "enrolled" || mode === "student") {
                filtered = filterFunction(items, enrollments, currentUser.id, 'user_id');
                setFilteredItems(filtered);
                setSearchData(filtered);
            } else if (mode === "admin" || mode === "global_admin") {
                setFilteredItems(items);
                setSearchData(items);
            } else {
                setFilteredItems(items);
                setSearchData(items);
            }
        }
        setShowLoadingBar(false);
    }, [items, itemPermissions, currentUser, mode, filterFunction]);

    const currentItemList = useMemo(() => {
        console.log("hit");
        if (filteredItems !== null) {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return filteredItems.slice(firstPageIndex, lastPageIndex);
        }
    }, [currentPage, filteredItems]);

    // useEffect(() => {
    //     if (filteredItems !== null && fetchedUsers) {
    //         setShowLoadingBar(false);
    //     }
    // }, [filteredUsers, fetchedUsers]);

    const openItemOverlay = (item) => {
        setSelectedItem(item);

        if (isPanel) {
            setShowOverlay(false);
            setShowPanel(true);

            if (isAdmin) {
                addToPanelStack({
                    renderPanel: () => adminOverlay(item),
                });

            } else {
                addToPanelStack({
                    renderPanel: () => overlayComponent(item),
                });
            }
        }
    };

    const closeOverlay = () => {
        setSelectedItem(null);
        setShowOverlay(false);
        setShowPanel(false);
        setCurrentPanelStack([]);
    };

    // const openFormOverlay = () => {
    //     setSelectedItem(false);
    //     setIsFormOpen(true);
    // };

    const onChangeSite = (site) => {
        console.log(site);
        if (site !== "All") {
            setCurrentSite(site);
            let filtered = filterFunction(items, siteAvailability, site);
            setFilteredItems(filtered);
            setSearchData(filtered);
        } else {
            setCurrentSite(null);
            setFilteredItems(users);
            setSearchData(users);
        }
    }

    useEffect(() => {

        const toolList = [
            {
                type: "button",
                text: "Create New User",
                icon: "fa-plus",
                class: "add-new-button",
                callBackFunction: openItemOverlay
            }
        ];
        console.log(props);
        if (!props.site_id) {
            toolList.push({
                type: "select",
                text: "All Sites",
                callBackFunction: onChangeSite,
                options: sites,
                textIndex: "title"
            });
        }

        setToolList(toolList);
    }, [sites]);

    const ItemPanelStack = () => {
        const handleBackClick = () => {
            removeFromPanelStack(); // Remove the top panel from the stack
            setSelectedItem(null); // Clear the selected item
        };

        return (
            // <div>
            //   <PanelStack2
            //     className="docs-panel-stack-example"
            //     onOpen={addToPanelStack}
            //     onClose={removeFromPanelStack}
            //     renderActivePanelOnly={true}
            //     stack={currentPanelStack}
            //   />
            //   <div className={Classes.DIALOG_FOOTER}>
            //     <Button onClick={removeFromPanelStack}>Back to List</Button>
            //   </div>
            // </div>
            <PanelStack2
                className="item-panel-stack"
                // onOpen={addToPanelStack}
                onClose={handleBackClick}
                renderPanelHeader={true}
                renderActivePanelOnly={true}
                stack={currentPanelStack}
            />
        );
    };
    const addToPanelStack = (panel) => {
        setCurrentPanelStack((prevStack) => [...prevStack, panel]);
    };

    const removeFromPanelStack = () => {
        setCurrentPanelStack((prevStack) => prevStack.slice(0, -1));
    };

    // const handleItemPanelClick = (item) => {
    //     console.log(item);
    //     console.log("hit");
    //     setSelectedItem(item);
    //     addToPanelStack({
    //         renderPanel: () => formComponent(item),
    //     });
    // };
    console.log(scalingFactor);
    return (
        <div style={{ transform: `scale(${scalingFactor})` }} className="list-component">
            {/* Main content */}
            <div className="item-list-component-container">
                <div className="item-list-component-nav-bar">
                    <div className="item-list-header">
                        <div>{listHeader}</div>
                        <Divider />
                    </div>
                    <div className="list-component-nav">
                        <SearchBar callBackFunction={filterFunction} fields={searchFields} data={searchData} />
                        <div className="list-component-nav-type">
                            <ButtonGroup>
                                <Button className={listType == 'list-view' ? 'selected' : ''} icon="th-list" onClick={() => setListType('list-view')} />
                                <Button className={listType == 'grid-view' ? 'selected' : ''} icon="grid-view" onClick={() => setListType('grid-view')} />
                                <Button className={listType == 'table-view' ? 'selected' : ''} icon="th" onClick={() => setListType('table-view')} />
                            </ButtonGroup>
                        </div>
                    </div>
                </div>

                {/* {(showSuperUserTools || showSiteAdminTools || showGlobalAdminTools) &&
                    <ToolBar toolList={toolList} />
                } */}

                {showLoadingBar ? <LoadingBar /> : (
                    <div className="item-list-container">
                        <div className="item-list">
                            {listType == 'list-view' ? (
                                <div className="list-view-item-list">
                                    {currentItemList.length > 0 ? (
                                        currentItemList.map((item, index) => (
                                            // Adjust the Card component according to your item structure
                                            <Card key={item._id} className="list-view-card-container" element={item}>
                                                {listViewItem(item)}
                                                {adminOverlay && <div className="view-button">
                                                    <Button onClick={() => openItemOverlay(item)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                                        View
                                                    </Button>
                                                </div>
                                                }
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="no-results">No Items Found</div>
                                    )}
                                </div>
                            ) : listType === 'list-table-view' ? (
                                <div className="list-table-view">
                                    <ListTable data={filteredItems} />
                                </div>
                            ) : listType == 'grid-view' ? (
                                <div className="grid-view-item-list">
                                    {currentItemList.length > 0 ? (
                                        currentItemList.map((item, index) => (
                                            // Adjust the Card component according to your item structure
                                            <Card key={item._id} className="grid-view-card-container" element={item} onClick={() => openItemOverlay(item)}>
                                                {gridViewItem(item)}
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="no-results">No Items Found</div>
                                    )}
                                </div>
                            ) : listType == 'table-view' && (
                                <div className="item-table-container">

                                    <CustomTable data={filteredItems} />
                                    <div>
                                        {/* {currentItemList && (
                                                <div className="item-selection-container">
                                                    <img class="profile-img-card" src={`${currentItemList.profile_image}`} alt="superUser photo"></img>
                                                    <div className="item-info">
                                                        <div>
                                                            <div>item information</div>
                                                            <div className="item-tag">
                                                                <div className="item-description">
                                                                    <div>{`${currentItemList.first_name} ${currentItemList.last_name}`}</div>
                                                                    <div>{currentItemList.description}</div>
                                                                    <div>{currentItemList.gender}</div>
                                                                </div>
                                                                <div className="item-contact">
                                                                    <div>{currentItemList.email}</div>
                                                                    <div>{currentItemList.phone}</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-controls">
                                                                <button onClick={() => addToSite(currentItemList._id, site_id)} class="add-to-site-card">Add To Site</button>
                                                                <select id="permission_select" value="" onChange={(e) => addSitePermission(e, props.site_id, currentItemList._id)}>
                                                                    <option value="">---Select Permission--</option>
                                                                    <option value="item">User</option>
                                                                    <option value="superUser">SuperUser</option>
                                                                    <option value="site_admin">Site Admin</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )} */}
                                    </div>
                                </div>)
                            }
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={filteredItems.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                )}
            </div>

            <Overlay2
                isOpen={!!selectedItem || showPanel}
                onClose={closeOverlay}
                className={`${Classes.OVERLAY_SCROLL_CONTAINER}`}
            >
                <div className={`${Classes.ELEVATION_4} overlay-container `}>
                    {isAdmin && adminOverlay ? (adminOverlay(selectedItem)) : (overlayComponent(selectedItem))}
                </div>
            </Overlay2>

            {selectedItem && showPanel && <ItemPanelStack />}
            {/* 
            {
                toolList && toolList.length > 0 && (
                    <div className="toolbar">
                        {toolList.map((tool, index) => (
                            <button key={index} onClick={tool.callBackFunction}>
                                {tool.text}
                            </button>
                        ))}
                    </div>
                )
            } */}
        </div >
    );
};

export default List;
