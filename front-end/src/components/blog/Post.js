import React from 'react';

const Post = ({ post }) => {
  // Placeholder data for time and author
  const postTime = new Date().toLocaleString();
  const author = 'John Doe';

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-details">
        <p>Time: {postTime}</p>
        <p>Author: {author}</p>
      </div>
    </div>
  );
};

export default Post;
