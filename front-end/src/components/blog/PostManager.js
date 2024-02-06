import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { create as createPost, update as updatePost, getAll as getAllPosts } from 'slices/blog/post.js';
import { Tabs, Tab, Button, Card, InputGroup, Tag, FormGroup } from '@blueprintjs/core';

import MarkdownEditor from 'components/tools/markdown_editor/MarkdownEditor';

const newPost = {
  type: 'post',
  parent_id: null,
  title: 'Untitled Post',
  content: '',
  children: [],
  status: false,
};

const PostManager = () => {
  const [currentSiteId, setCurrentSiteId] = useState(false);
  const postTime = new Date().toLocaleString();

  const [allPosts, setAllPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = useSelector((state) => state.post.posts);
  const { user: currentUser } = useSelector((state) => state.auth);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts) {
      // if (selectedPost) {
      //   const updated_post = posts.find((post) => post._id == selectedPost._id);
      //   setSelectedPost(updated_post);
      // }
      setAllPosts(posts);
    }
  }, [posts]);

  const addNewPost = (post) => {
    const new_post = post;
    new_post.site_id = currentSiteId;
    new_post.author = currentUser.id;

    dispatch(createPost(new_post))
      .unwrap()
      .then((data) => {
        dispatch(getAllPosts());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const savePost = (post) => {
    const new_post = post;

    dispatch(updatePost({ id: post._id, data: new_post }))
      .unwrap()
      .then((data) => {
        dispatch(getAllPosts());
        setSelectedPost(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const goToPost = (post) => {
    navigate(`/post/${post?._id}`);
  };

  const toggleContentEditor = (post) => {
    setSelectedPost(post);
  };

  const PostEditor = ({ post }) => {
    const [editedTitle, setEditedTitle] = useState(post.title ? post.title : '');
    const [content, setContent] = useState(post.content ? post.content : '');

    const updateContent = (updated_content) => {
      setContent(updated_content);
    }
    console.log(content);
    return (
      <div className="post-editor">
        {/* Sidebar for editing post details */}
        <div className="post-editor-header">
          <FormGroup label={
            <Tag
              minimal
              className="dynamic-form-label"
            >Title:</Tag>
          }
          >
            <InputGroup
              large
              placeholder="Enter post title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </FormGroup>
          {/* Add any other editing components related to post details */}
        </div>
        {/* Toolbar with "Edit Post" and "Save" buttons */}
        <div className="post-toolbox">
          <Button text="Save" onClick={() => savePost({ ...post, title: editedTitle, content: content })} />
          <Button text="View Post" onClick={() => goToPost(post)} />
        </div>
        {/* Markdown editor (displayed only when isEditing is true) */}
        <div className="markdown-editor-container">
          <Card className="markdown-editor" elevation={4}>
            <MarkdownEditor content={content} updateContent={updateContent} />
          </Card>
        </div>
      </div>
    );
  };

  const PostPreview = ({ post }) => {
    return (
      <div key={post._id} className="post-preview-block" onClick={() => toggleContentEditor(post)}>
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      </div>
    );
  };

  console.log(selectedPost);
  return (
    <div className="post-manager-container">
      <div className="post-manager-header">
        <h4>Post Manager</h4>
      </div>
      {!selectedPost && (
        <div className="post-manager-post-selection">
          <div className="posts-toolbox">
            <Button
              icon="plus"
              text="New Post"
              className="post-manager-plus-button"
              onClick={() => addNewPost(newPost)}
            />
          </div>
          <Tabs id="toolbox-tabs" renderActiveTabPanelOnly={true}>
            <Tab
              id="published-tab"
              title="Published Posts"
              panel={
                <div className="post-manager-posts-container">
                  {allPosts &&
                    allPosts.map((post) => (
                      <PostPreview post={post} key={post._id} />
                    ))}
                </div>
              }
            />
            <Tab
              id="draft-tab"
              title="Drafts"
              panel={
                <div className="post-manager-posts-container">
                  {allPosts &&
                    allPosts.map((post) => (
                      <PostPreview post={post} key={post._id} />
                    ))}
                </div>
              }
            />
            <Tab
              id="templates-tab"
              title="Templates"
              panel={
                <div className="post-manager-posts-container">
                  {allPosts &&
                    allPosts.map((post) => (
                      <PostPreview post={post} key={post._id} />
                    ))}
                </div>
              }
            />
          </Tabs>
        </div>
      )}
      {selectedPost && <PostEditor post={selectedPost} />}
    </div>
  );
};

export default PostManager;
