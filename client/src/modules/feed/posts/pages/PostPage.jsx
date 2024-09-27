import { HomeNav } from "../../../ui/components";

import { RecomendedAccounts } from "../../components/RecomendedAccounts";
import { PostInfo } from "../components/PostInfo";

import styles from "../../../../../public/css/feed.module.css";
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
