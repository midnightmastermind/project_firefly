import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create as createPost, update as updatePost, getAll as getAllPosts } from 'slices/blog/post.js';
import { Tabs, Tab, Button, Card } from '@blueprintjs/core';
import MarkdownEditor from 'components/tools/markdown_editor/MarkdownEditor';

const newPost = {
  type: 'post',
  parent_id: null,
  post_properties: {
    title: 'Untitled Post',
    content: '',
  },
  children: [],
  status: false,
};

const PostManager = () => {
  const [currentSiteId, setCurrentSiteId] = useState(false);
  const [allPosts, setAllPosts] = useState([]); // Renamed allPosts to allPosts
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if(posts) {
      setAllPosts(posts.filter((post) => post.type === 'post'));
    }
  }, [posts]);

  const addNewPost = (post) => {
    const new_post = post;
    new_post.site_id = currentSiteId;

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

    new_post.site_id = currentSiteId;

    dispatch(updatePost({ id: post._id, data: new_post }))
      .unwrap()
      .then((data) => {
        dispatch(getAllPosts());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const toggleContentEditor = (post) => {
    setSelectedPost(post);
  };

  const PostEditor = ({ post }) => {
    return (
      <div className="post-editor">
        {/* Sidebar for editing post details */}
        <div className="sidebar">
          {/* Add your post details editing components here */}
        </div>
        {/* Toolbar with "Edit Post" and "Save" buttons */}
        <div className="post-toolbox">
          <Button text="Save" onClick={() => savePost(post)} />
        </div>
        {/* Markdown editor (displayed only when isEditing is true) */}
        <div className="markdown-editor-container">
          <Card className="markdown-editor" elevation={4}>
            <MarkdownEditor content={post.content} />
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
      {selectedPost && (
        <PostEditor post={selectedPost} />
      )}
    </div>
  );
};

export default PostManager;
