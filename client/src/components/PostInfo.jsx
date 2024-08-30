import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../public/css/postById.module.css";
import { getPost } from "../services/feedServices";

const PostInfo = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [write, setWrite] = useState(false);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  useEffect(() => {
    if (write == true) {
      inputRef.current.focus();
    }
  }, [write]);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(postId);
      if (post.message) {
        return noti(post.message, "error");
      }
      setPost(post);
    };
    fetchPost();
    console.log(post);
  }, [postId]);

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
            action=""
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
              <button
                type="button"
                className="btn d-flex p-0 align-items-center h-100 ms-2"
              >
                <span className="material-symbols-outlined">attachment</span>
              </button>
              <button className="btn btn-info text-light fw-bold mt-2">
                Comentar
              </button>
            </div>
          </form>
          <div className="w-100 d-flex flex-column align-items-center">
            {post &&
              (post.comments.length > 0 ? (
                post.comments.map((post) => <Post key={post.id} post={post} />)
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
