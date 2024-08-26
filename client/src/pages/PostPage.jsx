import React from "react";
import RecomendedAccounts from "../components/RecomendedAccounts";
import HomeNav from "../components/HomeNav";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
export const PostPage = () => {
  const { postId } = useParams();
  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <Post postId={postId} />
        <RecomendedAccounts />
      </main>
    </>
  );
};
