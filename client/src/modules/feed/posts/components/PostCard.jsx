import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FsLightbox from "fslightbox-react";
import { getTime } from "../../../../helpers/getTime";
import { ProfileHover } from "../../../profile/components/ProfileHover";
import { authContext } from "../../../../context/auth/Context";

import {
  getProfileInfo,
  like,
  repostSvc,
  postSvc,
} from "../../services/feedServices";

import styles from "../../../../../public/css/postCard.module.css";
import { BASE_URL } from "../../../../constants/BASE_URL";

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });
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

  const openLightboxOnSlide = (index, e) => {
    e.stopPropagation();
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index + 1,
    });
  };

  const handleShare = async (e, id) => {
    e.stopPropagation();
    const ShareData = {
      title: "Compartir post",
      text: "Comparte este post con tus amigos",
      url: `https://localhost:5173/post/${id}`,
    };
    navigator.share(ShareData);
  };
  const handleLike = async (event) => {
    event.stopPropagation();
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

  const handleRepost = async (event) => {
    event.stopPropagation();
    const status = await repostSvc(post.id);
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
    if (post) {
      setLiked(post.liked);
      setReposted(post.reposted);
    }
  }, [post]);

  const handleComment = async (event) => {
    event.preventDefault();
    event.stopPropagation();
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

  const handleShowProfile = (boolean, username) => {
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
      const { data, statusCode } = await getProfileInfo(username);
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
      {" "}
      {post && (
        <>
          <article
            onClick={() => {
              navigate(`/${post.profile.user?.username}/post/${post.id}`);
            }}
            className={`d-flex flex-column w-100  p-3 border-bottom `}
          >
            <header className="position-relative">
              <div className="avatar d-flex align-items-start">
                <div>
                  <img
                    className="me-2 rounded-circle"
                    width={35}
                    height={35}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/perfil/${post.profile.user.username}`);
                    }}
                    onMouseEnter={() =>
                      handleShowProfile(true, post.profile.user.username)
                    }
                    onMouseLeave={() =>
                      handleShowProfile(false, post.profile.user.username)
                    }
                    src={`${BASE_URL}/images/${post.profile.profilePic}`}
                    alt={post.profile.names}
                  />
                  {profile && (
                    <ProfileHover
                      profileData={profile}
                      profileRef={profileRef}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                    />
                  )}
                </div>
                <div className={`d-flex flex-column w-100 `}>
                  <div className="w-100 d-flex justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="fw-bold fs-6">
                        {post.profile.names} {post.profile.surnames}
                      </span>
                      <span className={`text-muted ${styles.smallText}`}>
                        @{post.profile.user?.username}
                      </span>
                    </div>

                    <span className={`text-muted ${styles.smallText}`}>
                      {getTime(post.createdAt)}
                    </span>
                  </div>
                  <div className={`${styles.contentContainer}`}>
                    <p
                      className="my-2 text-break"
                      dangerouslySetInnerHTML={{
                        __html: post.content.replace(/\n/g, "<br />"),
                      }}
                    ></p>
                    <div
                      className={`d-flex flex-column mb-2 ${styles.imagesContainer}`}
                    >
                      {post.attachments?.length > 0 && (
                        <>
                          {post.attachments.length === 1 && (
                            <img
                              onClick={(e) => openLightboxOnSlide(0, e)}
                              src={`${BASE_URL}/images/${post.attachments[0].url}`}
                              alt="post attachment"
                              className="w-100 rounded-4 border"
                            />
                          )}
                          {post.attachments.length === 2 && (
                            <div
                              className="d-flex"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                onClick={(e) => openLightboxOnSlide(0, e)}
                                style={{
                                  borderTopLeftRadius: "15px",
                                  borderBottomLeftRadius: "15px",
                                }}
                                src={`${BASE_URL}/images/${post.attachments[0].url}`}
                                alt={post.attachments[0].url}
                                className={`${styles.attachment} border w-50 me-1`}
                              />
                              <img
                                onClick={(e) => openLightboxOnSlide(1, e)}
                                style={{
                                  borderTopRightRadius: "15px",
                                  borderBottomRightRadius: "15px",
                                }}
                                src={`${BASE_URL}/images/${post.attachments[1].url}`}
                                alt={post.attachments[1].url}
                                className={`${styles.attachment} border w-50`}
                              />
                            </div>
                          )}
                          {post.attachments.length === 3 && (
                            <div
                              className="d-flex w-100 pb-2"
                              style={{ height: "200px", overflow: "hidden" }}
                            >
                              <img
                                onClick={(e) => openLightboxOnSlide(0, e)}
                                src={`${BASE_URL}/images/${post.attachments[0].url}`}
                                alt={post.attachments[0].url}
                                style={{
                                  borderTopLeftRadius: "15px",
                                  borderBottomLeftRadius: "15px",
                                }}
                                className={`w-50 h-100 me-1 border ${styles.attachment}`}
                              />
                              <div className="d-flex flex-column w-50">
                                <img
                                  onClick={(e) => openLightboxOnSlide(1, e)}
                                  src={`${BASE_URL}/images/${post.attachments[1].url}`}
                                  alt={post.attachments[1].url}
                                  className={`${styles.attachment} w-100 border`}
                                  style={{
                                    height: "50%",
                                    borderTopRightRadius: "15px",
                                  }}
                                />
                                <img
                                  onClick={(e) => openLightboxOnSlide(2, e)}
                                  src={`${BASE_URL}/images/${post.attachments[2].url}`}
                                  alt={post.attachments[2].url}
                                  className={`${styles.attachment} w-100 border  border-top-0`}
                                  style={{
                                    height: "50%",
                                    borderBottomRightRadius: "15px",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {post.attachments.length === 4 && (
                            <div style={{ overflow: "hidden" }}>
                              <div className={`d-flex mb-1 `}>
                                <img
                                  onClick={(e) => openLightboxOnSlide(0, e)}
                                  src={`${BASE_URL}/images/${post.attachments[0].url}`}
                                  alt={post.attachments[0].url}
                                  className={`${styles.attachment} w-50 border me-1`}
                                  style={{
                                    height: "120px",
                                    borderTopLeftRadius: "15px",
                                  }}
                                />
                                <img
                                  onClick={(e) => openLightboxOnSlide(1, e)}
                                  src={`${BASE_URL}/images/${post.attachments[1].url}`}
                                  alt={post.attachments[1].url}
                                  className={`${styles.attachment} w-50 border`}
                                  style={{
                                    height: "120px",
                                    borderTopRightRadius: "15px",
                                  }}
                                />
                              </div>
                              <div className="d-flex">
                                <img
                                  onClick={(e) => openLightboxOnSlide(2, e)}
                                  src={`${BASE_URL}/images/${post.attachments[2].url}`}
                                  alt={post.attachments[2].url}
                                  className={`${styles.attachment} w-50 border  me-1`}
                                  style={{
                                    height: "120px",
                                    borderBottomLeftRadius: "15px",
                                  }}
                                />
                                <img
                                  onClick={(e) => openLightboxOnSlide(3, e)}
                                  src={`${BASE_URL}/images/${post.attachments[3].url}`}
                                  alt={post.attachments[3].url}
                                  className={`${styles.attachment} w-50 border`}
                                  style={{
                                    height: "120px",
                                    borderBottomRightRadius: "15px",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <footer className="d-flex justify-content-between">
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
                  onClick={(e) => {
                    e.stopPropagation();
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
              <button
                className="btn p-0 d-flex align-items-center"
                onClick={(e) => handleShare(e, post.id)}
              >
                <span
                  className={`material-symbols-outlined ${styles.actionButtons}`}
                >
                  share
                </span>
              </button>
            </footer>
          </article>
          <FsLightbox
            customAttributes={[
              {
                crossOrigin: "anonymous",
              },
            ]}
            toggler={lightboxController.toggler}
            sources={post.attachments.map(
              (attachment) => `${BASE_URL}/images/${attachment.url}`
            )}
            slide={lightboxController.slide}
          />
        </>
      )}
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
                  src={`${BASE_URL}/images/${post.profile.profilePic}`}
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
                        {post.profile.user.username}
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
            <hr className="hr" />{" "}
            <div className="d-flex ">
              {authState.user && authState.user.profile.profilePic ? (
                <img
                  src={`${BASE_URL}/images/${authState.user.profile.profilePic}`}
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
              className="btn btn-primary fw-bold text-light"
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
