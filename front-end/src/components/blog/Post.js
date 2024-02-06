import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Card, Divider } from '@blueprintjs/core';
import { useParams } from "react-router-dom";

const Post = ({ post_prop }) => {
  // Placeholder data for time and author
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', author: null, timestamp: '1900-01-01' });
  const posts = useSelector((state) => state.post.posts);
  const users = useSelector((state) => state.user.users);

  useEffect((post_prop) => {
    let post_id = post_prop ? post_prop : id;

    if (posts) {
      const retrieved_post = retrievePost(post_id, posts);

      if (retrieved_post) {
        setPost(retrieved_post);
      }
    }
  }, [post_prop, posts]);

  const retrievePost = (post_id, posts) => {
    const found_post = posts.find((post_object) => post_object._id == post_id);
    const author = users.find((user) => user._id == post.author);

    return { ...found_post, author_name: (`${author.first_name} ${author.last_name}`)};
  };

  const generatePost = () => {
    if (post) {
      return (
          <Card className="post" elevation={3}>
            <div className="post-title"><h1>{post.title}</h1></div>
            <Divider />
            <div className="post-content">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
            <Divider />
            <div className="post-details">
              <p>Time: {post.timestamp}</p>
              <p>Author: {post.author_name}</p>
            </div>
          </Card >
      )
    }
    return null;
  }

  return (
    <div className="post-container">
      {post &&
        generatePost()
      }
    </div>
  );
};

export default Post;
