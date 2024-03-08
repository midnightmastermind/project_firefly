// /**
//  * This code is a functional react component that renders a toolbar.
//  * The toolbar consists of either buttons or a select dropdown, which are determined by the 'type' key in the props.
//  * If the type is 'button', then a Link is rendered within a button.
//  * If the type is 'select', then a select drop
//  */
// import React from 'react';
// import { Link } from "react-router-dom";

// // useEffect(() => {
// //     const toolList = [
// //         {
// //             type: "button",
// //             text: "Create New User",
// //             icon: "fa-plus",
// //             class: "add-new-button",
// //             callBackOrLink: "/user/new"
// //         }
// //     ];
// //     console.log(props);
// //     if (!props.site_id) {
// //         toolList.push({
// //             type: "select",
// //             text: "All Sites",
// //             callBackFunction: onChangeSite,
// //             options: sites,
// //             textIndex: "title"
// //         });
// //     }

// //     setToolList(toolList);
// // }, [sites]);

// const ToolBar = (props) => {
//     return (
//     <div className="list-tools">
//         <div className="list-tools-title">Tools: </div>
//         {props && props.toolList.length > 0 &&
//             props.toolList.map((tool, index) => {
//                 if (tool.type == "button") {
//                     return (
//                         <div key={index}>
//                             <button className={`${tool.class} badge badge-primary`}>
//                                 <Link
//                                     className="link"
//                                     to={typeof tool.callBackOrLink == "function" ? "" : tool.callBackOrLink}
//                                     onClick={typeof tool.callBackOrLink == "function" ? (() => tool.callBackOrLink()) : ""}
//                                 >
//                                     {tool.icon && (<i className={`fa-solid ${tool.icon}`}></i>)}
//                                     {`${tool.text}`}
//                                 </Link>
//                             </button>
//                         </div>
//                     )
//                 } else if (tool.type == "select") {
//                     return (
//                         <div key={index} className="select-container">
//                             <select onChange={(e) => tool.callBackFunction(e.target.value)}>
//                                 <option key={'all_sites'} value="All">{tool.text}</option>
//                                 {
//                                     tool.options.map((option, index) => (
//                                         <option key={index} value={option._id}>{option[tool.textIndex]}</option>
//                                     ))
//                                 }
//                             </select>
//                         </div>
//                     )
//                 }
//             })
//         }
//     </div>
// );
//     }

// export default ToolBar;



import React from 'react';
import { Button, Popover, Menu, MenuItem } from "@blueprintjs/core";
import { Link } from "react-router-dom";

const ToolBar = (props) => {
    return (
        <div className="list-tools">
            <div className="list-tools-title">Tools: </div>
            {props && props.toolList.length > 0 &&
                props.toolList.map((tool, index) => {
                    if (tool.type === "button") {
                        return (
                            <div key={index}>
                                <Button
                                    className={`${tool.class} bp3-intent-primary`}
                                >
                                    <Link
                                        className="link"
                                        to={typeof tool.callBackOrLink === "function" ? "" : tool.callBackOrLink}
                                        onClick={typeof tool.callBackOrLink === "function" ? (() => tool.callBackOrLink()) : undefined}
                                    >
                                        {tool.icon && <i className={`fa-solid ${tool.icon}`}></i>}
                                        {`${tool.text}`}
                                    </Link>
                                </Button>
                            </div>
                        );
                    } else if (tool.type === "select") {
                        return (
                            <div key={index} className="select-container">
                                <Popover
                                    content={
                                        <Menu>
                                            <MenuItem key={'all_sites'} text={tool.text} onClick={() => tool.callBackFunction('All')} />
                                            {
                                                tool.options.map((option, index) => (
                                                    <MenuItem key={index} text={option[tool.textIndex]} onClick={() => tool.callBackFunction(option._id)} />
                                                ))
                                            }
                                        </Menu>
                                    }
                                >
                                    <Button text={tool.text} />
                                </Popover>
                            </div>
                        );
                    }
                    return null; // or handle other tool types if needed
                })
            }
        </div>
    );
};

export default ToolBar;
