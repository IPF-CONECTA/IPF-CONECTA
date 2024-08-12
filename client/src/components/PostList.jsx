import React, { useEffect } from "react";
import PostCard from "./PostCard";
import styles from "../../public/css/feed.module.css";
const PostList = ({ posts }) => {
  return (
    <div className="w-50 overflow-y-auto d-flex flex-column align-items-center">
      <div className="w-100 d-flex justify-content-center p-3">
        <form action="" className={`w-100 d-flex flex-row ${styles.postForm}`}>
          <input
            type="text"
            className="m-0 me-2"
            placeholder="Que estas pensando"
          />
          <div className="h-100 d-flex align-items-center">
            <button className="btn btn-secondary d-flex align-items-center h-100 me-1">
              <span class="material-symbols-outlined">attachment</span>
            </button>
            <button className="btn btn-info text-light px-3 h-100 fw-bold">
              Post
            </button>
          </div>
        </form>
      </div>
      <div className="w-100 d-flex flex-column flex-grow-1 align-items-center">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
