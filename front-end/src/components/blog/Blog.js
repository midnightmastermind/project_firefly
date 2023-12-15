import React, { useState } from 'react';
import { Button, InputGroup, Classes } from '@blueprintjs/core';
import Post from './Post';

const Blog = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder filter function
  const filterPosts = () => {
    // Implement your actual filtering logic here based on searchTerm
    // For simplicity, let's just filter by post title containing the search term
    return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  return (
    <div className="blog">
      <div className="blog-toolbar">
        <InputGroup
          className={Classes.FILL}
          type="search"
          leftIcon="search"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button icon="filter" text="Filter" onClick={() => console.log('Filter button clicked')} />
      </div>
      <div className="blog-posts">
        {filterPosts().map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
