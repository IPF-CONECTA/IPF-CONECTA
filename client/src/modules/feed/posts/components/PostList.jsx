import React, { useEffect, useState } from "react";

import { getPosts, postSvc } from "../../services/feedServices";
import { useNoti } from "../../../../hooks/useNoti";
import { PostCard } from "./PostCard";

import styles from "../../../../../public/css/feed.module.css";

export const PostList = () => {
  const noti = useNoti();
  const [focused, setFocused] = useState(false);
  const [posts, setPosts] = useState([]);

  const [content, setContent] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, statusCode } = await getPosts();
      if (statusCode !== 200) {
        return;
      }
      setPosts(data);
    };
    if (progress === 100 || showProgress === false) {
      fetchPosts();
    }
  }, [showProgress]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.length == 0 || content.length > 200) return;

    const status = await postSvc(content);
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
        setFocused(false);
      } else {
        setProgress(i);
        i++;
      }
    }, 10);
  };
  return (
    <div className="w-50 overflow-y-auto d-flex flex-column align-items-center ">
      <div
        className={`w-100 d-flex  align-items-center flex-column  pt-2  ${styles.formContainer}`}
      >
        <form
          onSubmit={handleSubmit}
          className={` h-100 w-75 d-flex flex-column align-items-end border ${
            posts.length > 0 ? "border-bottom-0" : ""
          } p-2 ${styles.postForm}`}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
        >
          <textarea
            name=""
            className={`m-0 pt-2 ps-1 border border-0 rounded  w-100 ${
              focused ? styles.formInputFocused : styles.formInput
            }`}
            placeholder="Que estas pensando..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

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
              type="submit"
              className="btn btn-info text-light px-3 py-0 h-100 fw-bold"
            >
              Post
            </button>
          </div>
        </form>
        {showProgress ? (
          <progress className="w-75" id="file" max="100" value={progress}>
            70%
          </progress>
        ) : null}
      </div>
      <div className="w-100 d-flex flex-column flex-grow-1 align-items-center">
        {posts.length > 0 && (
          <div className="w-75 border border-bottom-0 border-end-0 border-start-0">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
