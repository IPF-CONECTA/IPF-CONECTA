import React, { useEffect } from "react";
import PostList from "../components/PostList";
import RecomendedAccounts from "../components/RecomendedAccounts";

const Home = () => {
  useEffect(() => {});
  return (
    <main>
      <PostList />
      <RecomendedAccounts />
    </main>
  );
};

export default Home;
