import React, { useContext, useEffect, useRef, useState } from "react";
import { getProfileInfo, like, repostSvc } from "../services/feedServices";
import styles from "../../public/css/postCard.module.css";
import { getTime } from "../helpers/getTime";
import { ProfileHover } from "./ProfileHover";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { authContext } from "../context/auth/Context";
import { postSvc } from "../services/feedServices";
const PostCard = ({ post }) => {
  console.log(post);
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
  const [showAnswerModal, setShowAnswerModal] = useState(false);
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

  useEffect(() => {
    setLiked(post.liked);
    setReposted(post.reposted);
  }, []);

  const handleComment = async (event) => {
    event.preventDefault();
    const status = await postSvc(content, post.id);
    if (status !== 201) {
      return noti("Hubo un error al publicar el post", "error");
    }
    setShowProgress(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i > 100) {
        clearInterval(interval);
        setShowProgress(false);
        post.comments.length++;
        setContent("");
        setShowAnswerModal(false);
      } else {
        setProgress(i);
        i++;
      }
    }, 10);
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
      <article
        className={`d-flex flex-column w-75 border border-bottom-0  p-3 `}
      >
        <header className="position-relative">
          <div className="avatar d-flex align-items-center">
            <div>
              <img
                className="me-2 rounded-circle"
                width={50}
                height={50}
                onMouseEnter={() => handleShowProfile(true, post.profileId)}
                onMouseLeave={() => handleShowProfile(false, post.profileId)}
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
                className={`material-symbols-outlined ${styles.actionButtons} ${
                  liked ? `${styles.filledIcon} text-info` : ""
                }`}
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
                className={`material-symbols-outlined ${styles.actionButtons} ${
                  reposted ? "text-info" : ""
                }`}
              >
                repeat
              </span>{" "}
            </button>
            <span
              className={`${styles.numberContainer} ${styles.smallText} ms-1`}
            >
              {post.reposts.length > 0 && <span>{post.reposts.length}</span>}
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
              {post.comments.length > 0 && <span>{post.comments.length}</span>}
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
      {showAnswerModal && (
        <Dialog
          open={Boolean(showAnswerModal)}
          onClose={() => setShowAnswerModal(false)}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "550px",
              },
            },
          }}
        >
          <DialogContent>
            <div className="header d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-start w-100">
                <img
                  src={post.profile.profilePic}
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="me-3"
                />
                <div className="d-flex flex-column w-100 pe-3">
                  <div className="d-flex w-100 justify-content-between align-items-stretch">
                    <div className="d-flex flex-column">
                      <div className="fs-5 fw-semibold">
                        {post.profile.names} {post.profile.surnames}
                      </div>
                      <span className={`${styles.email} text-muted`}>
                        {post.profile.user.email}
                      </span>
                    </div>
                    <span className={`h-100 `}>{getTime(post.createdAt)}</span>
                  </div>
                  <div className="">
                    <DialogContentText>{post.content}</DialogContentText>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAnswerModal(false);
                  }}
                  className="material-symbols-outlined text-muted btn p-0"
                >
                  close
                </button>
              </div>
            </div>
            <div className="d-flex pt-3">
              {authState.user.profilePic ? (
                <img
                  src={authState.user.profilePic}
                  alt="your profile picture"
                  width={40}
                  height={40}
                  className="me-3"
                />
              ) : null}
              <input
                type="text"
                placeholder="Tu respuesta..."
                className={`${styles.formInputFocused} border border-0 p-0`}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            {showProgress ? (
              <progress
                className="w-75"
                id="file"
                max="100"
                value={progress}
              ></progress>
            ) : null}
            <button
              className="btn btn-info fw-bold text-light"
              onClick={handleComment}
            >
              Responder
            </button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default PostCard;
