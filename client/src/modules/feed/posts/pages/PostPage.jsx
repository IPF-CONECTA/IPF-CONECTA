import { HomeNav } from "../../../ui/components";
import { RecommendedAccounts } from "../../components/RecommendedAccounts";
import styles from "../../../../../public/css/feed.module.css";
import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Comments } from "../components/Comments";
import { getPost } from "../../services/feedServices";

export const PostPage = () => {
  const { postId } = useParams();
  const [write, setWrite] = useState(false);
  const [answersTo, setAnswersTo] = useState(null);
  const navigate = useNavigate();
  const fetchPost = async () => {
    try {
      const res = await getPost(postId);
      if (res.status !== 200) {
        return noti("Hubo un error al obtener la publicación", "error");
      }
      if (res.data.postId) {
        const response = await getPost(res.data.postId);
        setAnswersTo(response.data.profile.names);
      } else {
        setAnswersTo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);
  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <div
          className="d-flex flex-column align-items-center border"
          style={{ width: "38%", minHeight: "100vh" }}
        >
          <div className="w-100 border-bottom d-flex align-items-center">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
              className="material-symbols-outlined fw-semibold p-3"
            >
              arrow_back
            </span>
            <span className="fs-4 fw-semibold">
              {answersTo ? `En respuesta a ${answersTo}` : "Post"}
            </span>
          </div>
          <Post postId={postId} details={true} setWrite={setWrite} />
          <Comments postId={postId} write={write} setWrite={setWrite} />
        </div>
        <div className={`${styles.asideContainer}`}>
          <RecommendedAccounts />
        </div>
      </main>
    </>
  );
};
