import { HomeNav } from "../../../ui/components";
import { RecommendedAccounts } from "../../components/RecommendedAccounts";
import styles from "../../../../../public/css/feed.module.css";
import { Post } from "../components/Post";
import { useNavigate, useParams } from "react-router-dom";
import { Comments } from "../components/Comments";

export const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <div
          className="d-flex flex-column align-items-center border"
          style={{ width: "38%" }}
        >
          <div className="w-100 border-bottom d-flex align-items-center">
            <span
              onClick={() => navigate(-1)}
              className="material-symbols-outlined fw-semibold p-3"
            >
              arrow_back
            </span>
            <span className="fs-4 fw-semibold">Post</span>
          </div>
          <Post postId={postId} details={true} />
          <Comments postId={postId} />
        </div>
        <div className={`${styles.asideContainer}`}>
          <RecommendedAccounts />
        </div>
      </main>
    </>
  );
};
