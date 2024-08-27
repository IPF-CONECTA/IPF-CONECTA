import React from "react";
import RecomendedAccounts from "../components/RecomendedAccounts";
import HomeNav from "../components/HomeNav";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
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
