import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "./PostCard";
import styles from "../../public/css/postById.module.css";
import { getPost } from "../services/feedServices";

const PostInfo = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
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
          <Post post={post} />

          <form
            action=""
            className={`w-75 border  d-flex align-items-end p-3 ${styles.form}`}
          >
            <textarea
              name=""
              className={`p-0  border border-0 rounded  w-100 ${styles.formInput}`}
              placeholder="Escriba su comentario"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button className="btn btn-info text-light fw-bold mt-2">
              Comentar
            </button>
          </form>
          <div className="w-100 d-flex flex-column align-items-center">
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
