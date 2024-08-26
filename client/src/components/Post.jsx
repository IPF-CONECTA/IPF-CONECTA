import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getPost,
  getProfileInfo,
  like,
  repostSvc,
} from "../services/feedServices";
import styles from "../../public/css/postCard.module.css";
import { getTime } from "../helpers/getTime";
import { ProfileHover } from "./ProfileHover";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { authContext } from "../context/auth/Context";
import { useNoti } from "../hooks/useNoti";
const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const { authState } = useContext(authContext);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const timeoutRef = useRef(null);
  const profileRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const noti = useNoti();
  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(postId);
      if (post.message) {
        return noti(post.message, "error");
      }
      setPost(post);
      setLiked(post.liked);
      setReposted(post.reposted);
    };
    fetchPost();
    console.log(post);
  }, [postId]);

  const handleLike = async () => {
    const { statusCode } = await like(post.id);
    if (statusCode !== 201 && statusCode !== 204) {
      return;
    }
    if (statusCode === 201) {
      post.likes.length++;
      setLiked(true);
    } else if (statusCode === 204) {
      setLiked(false);
      if (post.likes.length > 0) {
        post.likes.length--;
      }
    }
  };

  const handleRepost = async () => {
    const status = await repostSvc(post.id);
    console.log(status);
    if (status !== 201 && status !== 204) {
      return;
    }
    if (status === 201) {
      post.reposts.length++;
      setReposted(true);
    } else if (status === 204) {
      setReposted(false);
      if (post.reposts.length > 0) {
        post.reposts.length--;
      }
    }
  };

  const handleShowProfile = (boolean, id) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!boolean) {
      timeoutRef.current = setTimeout(() => {
        setShowProfile(false);
        setProfile(null);
      }, 200);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setShowProfile(true);
      const { data, statusCode } = await getProfileInfo(id);
      if (statusCode !== 200) {
        return;
      }
      setProfile(data);
    }, 500);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowProfile(true);
  };

  const handleMouseLeave = () => {
    setShowProfile(false);
    setProfile(null);
  };

  return (
    <>
      {post && (
        <div className="d-flex flex-column align-items-center w-50">
          <div className="w-75 py-3 border border-bottom-0">
            <span class="material-symbols-outlined ps-2">arrow_back</span>
          </div>
          <article
            className={`d-flex flex-column w-75 border border-bottom  p-3`}
          >
            <header className="position-relative">
              <div className="avatar d-flex align-items-center">
                <div>
                  <img
                    className="me-2 rounded-circle"
                    width={50}
                    height={50}
                    onMouseEnter={() => handleShowProfile(true, post.profileId)}
                    onMouseLeave={() =>
                      handleShowProfile(false, post.profileId)
                    }
                    src={post.profile.profilePic}
                    alt={post.profile.names}
                  />
                </div>
                <div className={`d-flex flex-column w-100 `}>
                  <div className="w-100 d-flex justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="fw-bold fs-6">
                        {post.profile.names} {post.profile.surnames}
                      </span>
                      {post.profile.title && (
                        <span className={`text-muted ${styles.smallText}`}>
                          {post.profile.title}
                        </span>
                      )}
                    </div>

                    <span className={`text-muted ${styles.smallText}`}>
                      {getTime(post.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              {profile && (
                <ProfileHover
                  profile={profile}
                  profileRef={profileRef}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              )}
            </header>
            <div className="py-3">
              <p>{post.content}</p>
              {post.attatchment &&
                (post.attatchment.type === "image" ? (
                  <img src={post.attatchment.url} alt={post.attatchment.alt} />
                ) : (
                  <video src={post.attatchment.url} />
                ))}
            </div>
            <footer className="">
              <div className="d-flex align-items-center">
                <button
                  onClick={handleLike}
                  className="btn p-0 d-flex align-items-center "
                >
                  <span
                    className={`material-symbols-outlined ${
                      styles.actionButtons
                    } ${liked ? `${styles.filledIcon} text-info` : ""}`}
                  >
                    thumb_up
                  </span>
                </button>
                <span
                  className={`${styles.numberContainer} ${styles.smallText} ms-1`}
                >
                  {post.likes.length > 0 && <span>{post.likes.length}</span>}
                </span>
              </div>

              <div className="d-flex align-items-center">
                <button
                  className="btn p-0 d-flex align-items-center"
                  onClick={handleRepost}
                >
                  <span
                    className={`material-symbols-outlined ${
                      styles.actionButtons
                    } ${reposted ? "text-info" : ""}`}
                  >
                    repeat
                  </span>{" "}
                </button>
                <span
                  className={`${styles.numberContainer} ${styles.smallText} ms-1`}
                >
                  {post.reposts.length > 0 && (
                    <span>{post.reposts.length}</span>
                  )}
                </span>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn p-0 d-flex align-items-center"
                  onClick={() => {
                    setShowAnswerModal(true);
                  }}
                >
                  <span
                    className={`material-symbols-outlined ${styles.actionButtons}`}
                  >
                    chat_bubble
                  </span>{" "}
                </button>
                <span
                  className={`${styles.numberContainer} ${styles.smallText}  ms-1`}
                >
                  {post.comments.length > 0 && (
                    <span>{post.comments.length}</span>
                  )}
                </span>
              </div>
              <button className="btn p-0 d-flex align-items-center">
                <span
                  className={`material-symbols-outlined ${styles.actionButtons}`}
                >
                  bookmark
                </span>
              </button>
              <button className="btn p-0 d-flex align-items-center ">
                <span
                  className={`material-symbols-outlined ${styles.actionButtons}`}
                >
                  share
                </span>
              </button>
            </footer>
          </article>
          <form action="" className="w-75 border d-flex align-items-end p-0">
            <input
              type="text"
              name=""
              className=""
              placeholder="Escriba su comentario..."
              id=""
            />
            <button className="btn btn-info text-light fw-bold">
              Comentar
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Post;
