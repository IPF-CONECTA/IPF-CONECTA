import React, { useRef, useState, useEffect } from "react";
import { getPost, postSvc } from "../../services/feedServices";
import styles from "../../../../../public/css/postById.module.css";
import { Post } from "./Post";

export const Comments = ({ postId, write, setWrite }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (write) {
      inputRef.current.focus();
    }
  }, [write]);
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await getPost(postId);
        console.log(res);
        if (res.message) {
          return noti(res.message, "error");
        }
        setPost(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.length == 0 || content.length > 200) return;
    setIsSubmitting(true);

    const status = await postSvc(content, null, postId);
    if (status !== 201) {
      return noti("Hubo un error al publicar el post", "error");
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setContent("");
      fetchPost();
    }, 500);
  };
  return (
    <div className="w-100">
      <form
        onSubmit={handleSubmit}
        className={`border-0 border-bottom d-flex flex-column align-items-end p-3 ${styles.form}`}
      >
        <textarea
          ref={inputRef}
          className={`p-0  border-0 rounded  w-100 ${styles.formInput}`}
          placeholder="Escriba su comentario"
          id="content"
          value={content}
          onBlur={() => {
            setWrite(false);
          }}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
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
                <span className="material-symbols-outlined fs-5">gif_box</span>
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
              disabled={content == "" || isSubmitting}
              type="submit"
              className="btn btn-primary text-light px-3 py-1 h-100 fw-bold"
            >
              {isSubmitting ? (
                <>
                  <span className="sr-only">Responder</span>
                  <span
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                "Responder"
              )}
            </button>
          </div>
        </div>
      </form>
      <div className="d-flex flex-column align-items-center">
        {loading ? (
          <div className={`d-flex justify-content-center my-3`}>
            {" "}
            <span
              className={`spinner-border`}
              role={`status`}
              aria-hidden={`true`}
            ></span>{" "}
          </div>
        ) : (
          post?.comments?.length > 0 &&
          post?.comments?.map((post) => (
            <Post key={post.id} postData={post} details={false} />
          ))
        )}
      </div>
    </div>
  );
};
