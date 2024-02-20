import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, update, remove } from "slices/auth/user";
import { useParams } from "react-router-dom";
import PageAuth from "common/PageAuth";
import ToolBar from "components/tools/ToolBar";
import User from "components/user/User";

const UserPage = (props) => {
    const initialUserState = {
        first_name: null,
        last_name: null,
        description: null
    };
    const [showAdminTools, setShowAdminTools] = useState(false);
    const [currentUserSelected, setCurrentUserSelected] = useState(initialUserState);
    const [toolList, setToolList] = useState(null);
    const [message, setMessage] = useState("");
    const { user_id } = useParams();
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const getUser = id => {
        dispatch(get({ id }))
            .unwrap()
            .then((data) => {
                setCurrentUserSelected({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    description: data.description
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(user_id);
        if (currentUser) {
            setShowAdminTools(PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser));
        }
    }, [user_id]);

    useEffect(() => {
        const toolList = [
            {
                type: "button",
                text: "Edit User",
                class: "add-new-button",
                callBackOrLink: () => setShowAdminTools(true) // Set to true to show the Toolbar
            },
            {
                type: "button",
                class: "remove-button",
                text: "Delete User",
                callBackOrLink: removeUser
            }
        ];

        setToolList(toolList);
    }, []);

    const removeUser = () => {
        dispatch(remove(currentUserSelected.id))
            .unwrap()
            .then(() => {
                props.history.push("/global");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="component-container">
            <h4>User</h4>
            {showAdminTools && <ToolBar toolList={toolList} />}
            <User user={currentUserSelected} />
        </div>
    );
};

export default UserPage;
