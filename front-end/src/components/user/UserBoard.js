/**
 * This code imports the React, useState, and useEffect hooks, as well as the ProductList, ContentService, and EventBus components.
 * It creates a UserBoard functional component that renders a list of products that the user is enrolled in.
 */
import React, { useState, useEffect } from "react";
import EventBus from "common/EventBus";

const UserBoard = () => {
  const [content, setContent] = useState("");

//   useEffect(() => {
//     ContentService.getUserBoard().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setContent(_content);

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );
//   }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default UserBoard;
