/**
 * This code is a react component that renders a list of users.
 * The list can be filtered by mode, which can be either student, superUser, admin, or global_admin.
 * The code also includes a search bar that allows the user to search for a specific user by first name, last name, or description
 */
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Overlay2, Classes } from "@blueprintjs/core";
import { create as createSitePermissions, update as updateSitePermissions, remove as removeSitePermissions } from "slices/site/user_site_availability";
import { create as createUserSiteAvailability, remove as removeUserSiteAvailability } from "slices/site/user_site_availability";
import { Link } from "react-router-dom";
import PageAuth from "common/PageAuth";
import { filterUsers, filterStudents, filterUsersBySite } from "common/User";
import { belongsToSite } from "common/Site";
import LoadingBar from "components/common/LoadingBar";
import Hero from "components/elements/Hero"
import SearchBar from "components/common/SearchBar";
import Pagination from "components/common/Pagination";
import ToolBar from "components/tools/ToolBar";
import Card from "components/elements/Card";
import User from "./User";

const PageSize = 18;

const heroPageInfo = {
    page: 'contact',
    heading: 'Browse SuperUsers',
    search: false
};

const searchFields = ["first_name", "last_name", "description"];
const UserList = (props) => {
    const [showLoadingBar, setShowLoadingBar] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [showSiteAdminTools, setShowSiteAdminTools] = useState(false);
    const [showGlobalAdminTools, setShowGlobalAdminTools] = useState(false);
    const [showSuperUserTools, setShowSuperUserTools] = useState(false);
    const [toolList, setToolList] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null)

    const [currentSite, setCurrentSite] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    const { users } = useSelector(state => state.user);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { enrollments } = useSelector((state) => state.enrollment);
    const { product_permissions } = useSelector((state) => state.product_permissions);
    const { fetched: fetchedUsers } = useSelector((state) => state.user);

    const { sites, current_site: site } = useSelector((state) => state.site);
    const { user_site_availability } = useSelector((state) => state.user_site_availability);
    const site_permissions = useSelector((state) => state.site_permissions.site_permissions);
    const dispatch = useDispatch();


    useEffect(() => {
        if (currentUser) {
            setShowSuperUserTools(PageAuth.superUserAuth(currentUser));
            setShowSiteAdminTools(PageAuth.adminAuth(currentUser));
            setShowGlobalAdminTools(PageAuth.globalAdminAuth(currentUser));
        }

        if (users) {
            let filtered = [];
            if (props.mode == "student") {

                //filter to only enrolled
                filtered = filterStudents(users, enrollments, product_permissions, currentUser);
                setFilteredUsers(filtered);
                setSearchData(filtered);
            } else if (props.mode == "superUser") {

                if (currentUser && (PageAuth.superUserAuth(currentUser) || PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser))) {
                    filtered = filterUsers(users, product_permissions);
                    setFilteredUsers(filtered);
                    setSearchData(filtered);
                } else {
                    setFilteredUsers(users);
                    setSearchData(users);
                }
            } else if (props.mode == "admin") {

                setFilteredUsers(users);
                setSearchData(users);
            } else if (props.mode == "global_admin") {

                setFilteredUsers(users);
                setSearchData(users);
            } else {
                setFilteredUsers(users);
                setSearchData(users);
            }
        }

    }, [dispatch, users, enrollments, product_permissions, sites, site_permissions]);


    useEffect(() => {
        const toolList = [
            {
                type: "button",
                text: "Create New User",
                icon: "fa-plus",
                class: "add-new-button",
                callBackOrLink: "/user/new"
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


    const findByName = (users) => {
        setFilteredUsers(users);
        setCurrentPage(1);
    };

    const addSitePermission = (e, site_id, user_id) => {
        dispatch(createSitePermissions({ user_id: user_id, site_id: site_id, role: e.target.value }))
            .unwrap()
            .then(() => {
                //props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateSitePermission = (e, site_permission_id) => {
        dispatch(updateSitePermissions(site_permission_id, { role: e.target.value }))
            .unwrap()
            .then(() => {
                //props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };


    const addToSite = (user_id, site_id) => {
        if (!site_id) {
            site_id = currentSite
        }
        dispatch(createUserSiteAvailability({ user_id: user_id, site_id: site_id }))
            .unwrap()
            .then(() => {
                //props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeFromSite = (user_id, site_id, site_permission_id) => {
        if (!site_id) {
            site_id = currentSite;
        }
        dispatch(removeUserSiteAvailability({ user_id: user_id, site_id: site_id })
            .unwrap()
            .then(() => {
                dispatch(removeSitePermissions(site_permission_id)
                    .unwrap()
                    .then(() => {
                        //props.history.push("/users");
                    })
                    .catch(e => {
                        console.log(e);
                    }))
            })
            .catch(e => {
                console.log(e);
            })
        )
    };

    const onChangeSite = (site) => {
        console.log(site);
        if (site !== "All") {
            setCurrentSite(site);
            let filtered = filterUsersBySite(users, user_site_availability, site);
            setFilteredUsers(filtered);
            setSearchData(filtered);
        } else {
            setCurrentSite(null);
            setFilteredUsers(users);
            setSearchData(users);
        }
    }

    return (
        <div className="user-page-container">
            <SearchBar callBackFunction={findByName} fields={searchFields} data={searchData} />
            {/* {(showSuperUserTools || showSiteAdminTools || showGlobalAdminTools) &&
                <ToolBar toolList={toolList} />
            } */}
            <div className="user-list-container">
                {showLoadingBar ? (<LoadingBar />) :
                    (
                        currentUserList &&
                        <>
                            <div className="user-list">
                                {
                                    currentUserList.length > 0 ? (
                                        currentUserList.map((user, index) => (

                                            <Card element={user} onClickCallback={() => setSelectedUser(user)} content={{ image: user.profile_image, header: `${user.first_name} ${user.last_name}`, info: user.description, link: { src: `/user/${user._id}`, text: "View User" } }} />

                                        ))
                                    ) : (<div class="no-results">No Users Found</div>)
                                }
                            </div>
                            <div className="d-flex justify-content-center align-items-center w-100">
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={currentPage}
                                    totalCount={filteredUsers.length}
                                    pageSize={PageSize}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </div>
                        </>
                    )
                }
            </div>
            {selectedUser && (
                <Overlay2
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                    className={`${Classes.OVERLAY_SCROLL_CONTAINER}` }
                    >
                    <div className={`overlay-container ${Classes.ELEVATION_4}`}>
                        {selectedUser && (
                            <User user={selectedUser} />
                        )}
                    </div>
                </Overlay2>
            )}
        </div>
    );
}

export default UserList;