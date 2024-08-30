import React from "react";
import RecomendedAccounts from "../components/RecomendedAccounts";
import HomeNav from "../components/HomeNav";
import PostInfo from "../components/PostInfo";
export const PostPage = () => {
  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <PostInfo />
        <RecomendedAccounts />
      </main>
    </>
  );
};
