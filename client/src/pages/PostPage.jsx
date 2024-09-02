import React from "react";
import RecomendedAccounts from "../components/RecomendedAccounts";
import HomeNav from "../components/HomeNav";
import styles from "../../public/css/feed.module.css";
import PostInfo from "../components/PostInfo";
export const PostPage = () => {
  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <PostInfo />
        <div className={`${styles.asideContainer}`}>
          <RecomendedAccounts />
        </div>
      </main>
    </>
  );
};
