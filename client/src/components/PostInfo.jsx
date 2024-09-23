import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../public/css/postById.module.css";
import { getPost, postSvc } from "../services/feedServices";
import PostCard from "./PostCard";

const PostInfo = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [write, setWrite] = useState(false);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    if (write == true) {
      inputRef.current.focus();
    }
  }, [write]);

  const fetchPost = async () => {
    const post = await getPost(postId);
    if (post.message) {
      return noti(post.message, "error");
    }
    setPost(post);
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (progress === 100 || showProgress === false) {
      fetchPost();
    }
  }, [showProgress]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.length == 0 || content.length > 200) return;

    const status = await postSvc(content, postId);
    if (status !== 201) {
      return noti("Hubo un error al publicar el post", "error");
    }
    setShowProgress(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i > 100) {
        clearInterval(interval);
        setShowProgress(false);
        setContent("");
      } else {
        setProgress(i);
        i++;
      }
    }, 10);
  };
  return (
    <>
      <div className="w-50 d-flex align-items-center">
        <div className="w-100 d-flex flex-column align-items-center">
          <div className="w-75 border d-flex align-items-center">
            <span
              onClick={() => navigate(-1)}
              className="material-symbols-outlined fw-semibold p-3"
            >
              arrow_back
            </span>
            <span className="fs-4 fw-semibold">Post</span>
          </div>
          <Post post={post} setWrite={setWrite} />

          <form
            onSubmit={handleSubmit}
            className={`w-75 border  d-flex flex-column align-items-end p-3 ${styles.form}`}
          >
            <input
              type="text"
              ref={inputRef}
              className={`p-0  border border-0 rounded  w-100 ${styles.formInput}`}
              placeholder="Escriba su comentario"
              id="content"
              value={content}
              onBlur={() => {
                setWrite(false);
              }}
              onChange={(e) => setContent(e.target.value)}
            ></input>
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className=" w-100 d-flex justify-content-between  pt-2">
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn d-flex align-items-center h-100 me-1"
                  >
                    <span className="material-symbols-outlined fs-5">
                      attachment
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn d-flex align-items-center h-100 me-1"
                  >
                    <span className="material-symbols-outlined fs-5">
                      gif_box
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn d-flex align-items-center h-100 me-1"
                  >
                    <span className="material-symbols-outlined fs-5">
                      location_on
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn d-flex align-items-center h-100 me-1"
                  >
                    <span className="material-symbols-outlined fs-5">mood</span>
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn btn-info text-light px-3 py-1 h-100 fw-bold"
                >
                  Responder
                </button>
              </div>
            </div>
            {showProgress ? (
              <progress className="w-75" id="file" max="100" value={progress}>
                70%
              </progress>
            ) : null}
          </form>
          <div className="w-75 d-flex flex-column align-items-center">
            {post &&
              (post.comments.length > 0 ? (
                post.comments.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div>no hay comentarios...</div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostInfo;
