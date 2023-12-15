/**
 * This code is a react component that renders a list of users.
 * The list can be filtered by mode, which can be either student, superUser, admin, or global_admin.
 * The code also includes a search bar that allows the user to search for a specific user by first name, last name, or description
 */
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { create as createSitePermissions, update as updateSitePermissions, remove as removeSitePermissions } from "slices/site/user_site_availability";
import { create as createUserSiteAvailability, remove as removeUserSiteAvailability } from "slices/site/user_site_availability";
import { Link } from "react-router-dom";
import PageAuth from "common/PageAuth";
import { filterUsers, filterStudents, filterUsersBySite } from "common/User";
import { belongsToSite } from "common/Site";
import CustomTable from "components/elements/CustomTable";
import SearchBar from "components/tools/SearchBar";

const PageSize = 9;

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
    const [currentUserData, setCurrentUserData] = useState(null);
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
        if (filteredUsers !== null && fetchedUsers) {
            setShowLoadingBar(false);
        }
    }, [filteredUsers, fetchedUsers]);

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

    // const currentUserList = useMemo(() => {
    //     if (filteredUsers != null) {
    //         const firstPageIndex = (currentPage - 1) * PageSize;
    //         const lastPageIndex = firstPageIndex + PageSize;
    //         return filteredUsers.slice(firstPageIndex, lastPageIndex);
    //     }
    // }, [currentPage, filteredUsers]);

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
        <div className="user-list-container">
            <div>User Manifest</div>
            <SearchBar callBackFunction={findByName} fields={searchFields} data={searchData} />
            <CustomTable cellClick={setCurrentUserData} data={filteredUsers} />
            <div>
                {currentUserData && (
                    <div className="user-selection-container">
                        <img class="profile-img-card" src={`${currentUserData.profile_image}`} alt="superUser photo"></img>
                        <div className="user-info">
                            <div>
                                <div>user information</div>
                                <div className="user-tag">
                                    <div className="user-description">
                                        <div>{`${currentUserData.first_name} ${currentUserData.last_name}`}</div>
                                        <div>{currentUserData.description}</div>
                                        <div>{currentUserData.gender}</div>
                                    </div>
                                    <div className="user-contact">
                                        <div>{currentUserData.email}</div>
                                        <div>{currentUserData.phone}</div>
                                    </div>
                                </div>
                                <div className="user-controls">
                                    <button onClick={() => addToSite(currentUserData._id, props.site_id)} class="add-to-site-card">Add To Site</button>
                                    <select id="permission_select" value="" onChange={(e) => addSitePermission(e, props.site_id, currentUserData._id)}>
                                        <option value="">---Select Permission--</option>
                                        <option value="user">User</option>
                                        <option value="superUser">SuperUser</option>
                                        <option value="site_admin">Site Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserList;


