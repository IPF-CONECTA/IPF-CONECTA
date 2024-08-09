import React, { useEffect } from "react";
import { PostList, RecomendedAccounts } from "../components";
export const FeedPage = () => {
  useEffect(() => {});
  return (
    <main>
      <PostList />
      <RecomendedAccounts />
    </main>
  );
};

export default Feed;
