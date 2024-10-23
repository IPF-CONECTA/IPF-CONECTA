import { HomeNav } from "../../../ui/components";

import { RecommendedAccounts } from "../../components/RecommendedAccounts";
import { PostInfo } from "../components/PostInfo";

import styles from "../../../../../public/css/feed.module.css";
export const PostPage = () => {
  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <PostInfo />
        <div className={`${styles.asideContainer}`}>
          <RecommendedAccounts />
        </div>
      </main>
    </>
  );
};
