import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { InputGroup, Classes, Overlay } from "@blueprintjs/core";
import Card from "components/elements/Card";
import Pagination from "components/common/Pagination";
import LoadingBar from "components/common/LoadingBar";
import SearchBar from "components/common/SearchBar";
import Post from "./Post";
import ReactMarkdown from "react-markdown"
import Hero from "components/elements/Hero"; // Adjust the import path accordingly

const PageSize = 18;

const PostPreview = ({ post }) => (
  <div className="post-preview">
    <Hero
      page={{
        image: post.post_image, // Assuming post_image is the image URL
        className: "post-preview-hero", // Add your custom hero class if needed
        heading: post.title,
      }}
    />
    <div className="post-preview-content">
      <ReactMarkdown>{`${post.content.slice(0, 60)}...`}</ReactMarkdown>
    </div>
  </div>
);

const Blog = () => {
  const [showLoadingBar, setShowLoadingBar] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { posts } = useSelector((state) => state.post);
  const { enrollments } = useSelector((state) => state.enrollment);
  const { product_permissions } = useSelector((state) => state.product_permissions);
  const { fetched: fetchedUsers } = useSelector((state) => state.user);

  useEffect(() => {
    if (posts) {
      setFilteredPosts(posts);
      setSearchData(posts);
      setShowLoadingBar(false);
    }
  }, [posts]);

  const currentPostList = useMemo(() => {
    if (filteredPosts !== null) {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return filteredPosts.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, filteredPosts]);

  const findByName = (posts) => {
    setFilteredPosts(posts);
    setCurrentPage(1);
  };

  return (
    <div className="blog">
      <SearchBar callBackFunction={findByName} fields={["title"]} data={searchData} />
      <div className="blog-posts">
        {showLoadingBar ? (
          <LoadingBar />
        ) : (
          currentPostList && (
            <>
              <div className="post-list">
                {currentPostList.length > 0 ? (
                  currentPostList.map((post) => (
                    <PostPreview post={post} key={post._id} />
                  ))
                ) : (
                  <div className="no-results">No Posts Found</div>
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center w-100">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={filteredPosts.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </>
          )
        )}
      </div>
      {selectedPost && (
        <Overlay
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          className={Classes.OVERLAY_SCROLL_CONTAINER}
        >
          <div className={`${Classes.CARD} ${Classes.ELEVATION_4} post-overlay`}>
            {selectedPost && (
              <Post post={selectedPost} />
            )}
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default Blog;