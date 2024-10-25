import { RecommendedAccounts } from "../components/RecommendedAccounts";
import { PostList } from "../posts/components/PostList";

import { HomeNav } from "../components/HomeNav";

import styles from "../../../../public/css/feed.module.css";
export const FeedPage = () => {
  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <PostList />
        <div className={`${styles.asideContainer}`}>
          <RecommendedAccounts />
        </div>
      </main>
    </>
  );
};
