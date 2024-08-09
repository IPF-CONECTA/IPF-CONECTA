import React, { useEffect } from "react";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <div className="w-50 overflow-y-auto pt-5">
      <div className="w-100 d-flex flex-column flex-grow-1 align-items-center">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
