import React from "react";
import PostList from "../components/PostList";
import RecomendedAccounts from "../components/RecomendedAccounts";
import HomeNav from "../components/HomeNav";
export const FeedPage = () => {
  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <PostList />
        <RecomendedAccounts />
      </main>
    </>
  );
};
