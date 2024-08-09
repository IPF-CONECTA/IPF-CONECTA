import React, { useEffect } from "react";
import PostList from "../components/PostList";
import RecomendedAccounts from "../components/RecomendedAccounts";

const Feed = () => {
  useEffect(() => {});
  return (
    <main>
      <PostList />
      <RecomendedAccounts />
    </main>
  );
};

export default Feed;
