import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FsLightbox from "fslightbox-react";
import { getDateWithHour, getTime } from "../../../../helpers/getTime";
import { ProfileHover } from "../../../profile/components/ProfileHover";
import {
  getProfileInfo,
  like,
  repostSvc,
  postSvc,
  getPost,
  deletePost,
} from "../../services/feedServices";
import styles from "../../../../../public/css/PostCard.module.css";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useNoti } from "../../../../hooks/useNoti";
import { ReportModal } from "../../../app/components/ReportModal";
import { AnswerModal } from "./answerModal";

export const Post = ({
  postData = null,
  postId = null,
  details,
  setWrite,
  fetchPosts,
}) => {
  const [post, setPost] = useState(postData);
  const navigate = useNavigate();
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });
  const [openReportModal, setOpenReportModal] = useState(false);
  const [content, setContent] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const timeoutRef = useRef(null);
  const profileRef = useRef(null);
  const [liked, setLiked] = useState(post?.liked);
  const [reposted, setReposted] = useState(post?.reposted);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const noti = useNoti();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await getPost(postId);
        console.log("respuesta: ", res);
        if (res.status !== 200) {
          return noti("Hubo un error al obtener la publicación", "error");
        }
        setPost(res.data);
        setLiked(res.data.liked);
        setReposted(res.data.reposted);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    postId && fetchPost();
  }, [postId]);

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

  const handleLike = async (e) => {
    e.stopPropagation();
    const res = await like(post?.id);
    if (res.status !== 201 && res.status !== 204) {
      return;
    }
    if (res.status === 201) {
      post.likes.length++;
      setLiked(true);
    } else if (res.status === 204) {
      setLiked(false);
      if (post.likes.length > 0) {
        post.likes.length--;
      }
    }
  };

  const handleRepost = async (e) => {
    e.stopPropagation();
    const res = await repostSvc(post?.id);
    if (res.status !== 201 && res.status !== 204) {
      return;
    }
    if (res.status === 201) {
      post.reposts.length++;
      setReposted(true);
    } else if (res.status === 204) {
      setReposted(false);
      if (post.reposts.length > 0) {
        post.reposts.length--;
      }
    }
  };

  const actionDelete = (snackbarId) => (
    <>
      <button
        className="btn text-warning fw-semibold p-0 px-1"
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Cancelar
      </button>
      <button
        className="btn text-danger fw-semibold p-0 px-1"
        onClick={() => {
          handleDelete();
          closeSnackbar(snackbarId);
        }}
      >
        Confirmar
      </button>
    </>
  );
  const actionBlock = (snackbarId) => (
    <>
      <button
        className="btn text-warning fw-semibold p-0 px-1"
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Cancelar
      </button>
      <button
        className="btn text-danger fw-semibold p-0 px-1"
        onClick={() => {
          handleBlock();
          closeSnackbar(snackbarId);
        }}
      >
        Confirmar
      </button>
    </>
  );

  const handleBlock = async () => {
    noti("Usuario bloqueado", "success");
  };

  const handleDelete = async () => {
    const res = await deletePost(post?.id);
    if (res.status !== 204) {
      return noti("Hubo un error al eliminar el post", "error");
    }
    noti("Post eliminado", "success");
    details ? navigate("/inicio") : fetchPosts(true);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    const status = await postSvc(content, null, post?.id);
    if (status !== 201) {
      return noti("Hubo un error al publicar el post", "error");
    }

    setTimeout(() => {
      noti("Comentario publicado", "success");
      setContent("");
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost?.comments, {}],
      }));
      setIsSubmitting(false);
      setShowAnswerModal(false);
    }, 500);
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
      const res = await getProfileInfo(username);
      if (res.status !== 200) {
        return;
      }
      setProfile(res.data);
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
      {loading ? (
        <div className={`d-flex justify-content-center my-3`}>
          <span
            className={`spinner-border`}
            role={`status`}
            aria-hidden={`true`}
          ></span>
        </div>
      ) : (
        <>
          <article
            onClick={() => {
              !details &&
                navigate(`/${post?.profile.user.username}/post/${post?.id}`);
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
                      navigate(`/perfil/${post?.profile.user.username}`);
                    }}
                    onMouseEnter={() =>
                      handleShowProfile(true, post?.profile.user.username)
                    }
                    onMouseLeave={() =>
                      handleShowProfile(false, post?.profile.user.username)
                    }
                    src={`${BASE_URL}/images/${post?.profile.profilePic}`}
                    alt={post?.profile.names}
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
                <div className="w-100 d-flex">
                  <div className={`d-flex flex-column w-100 mb-2`}>
                    <div>
                      <span className="fw-bold fs-6 me-2">
                        {post?.profile.names} {post?.profile.surnames}
                      </span>
                      <span className={`text-muted me-2 ${styles.smallText}`}>
                        @{post?.profile.user?.username}
                      </span>
                      {!details && (
                        <span className={`text-secondary ${styles.smallText}`}>
                          {" "}
                          {getTime(post?.createdAt)}
                        </span>
                      )}
                    </div>
                    <div className={`${styles.contentContainer}`}>
                      <p
                        className="my-2 text-break"
                        dangerouslySetInnerHTML={{
                          __html: post?.content.replace(/\n/g, "<br />"),
                        }}
                      ></p>
                      <div className={`d-flex flex-column mb-2 `}>
                        {console.log(post?.attachments)}
                        {post?.attachments?.length > 0 && (
                          <>
                            {/* =================== UN ARCHIVO =================== */}
                            {post?.attachments.length === 1 &&
                              (post?.attachments[0].docType.split("/")[0] ==
                              "video" ? (
                                <div className="ratio ratio-1x1 rounded-4 overflow-hidden">
                                  <video controls width="100%" autoplay>
                                    <source
                                      src={`${BASE_URL}/images/${post.attachments[0].url}`}
                                      type={post.attachments[0].docType}
                                    ></source>
                                  </video>
                                </div>
                              ) : (
                                <img
                                  onClick={(e) => openLightboxOnSlide(0, e)}
                                  src={`${BASE_URL}/images/${post?.attachments[0].url}`}
                                  alt="post attachment"
                                  className="w-100 rounded-4 border"
                                />
                              ))}

                            {/* =================== DOS ARCHIVOS =================== */}
                            {post?.attachments.length === 2 && (
                              <div className="d-flex overflow-hidden border rounded-4">
                                {post?.attachments[0].docType.split("/")[0] ==
                                "video" ? (
                                  <video
                                    controls
                                    className="w-50 me-1"
                                    autoplay
                                  >
                                    <source
                                      src={`${BASE_URL}/images/${post.attachments[0].url}`}
                                      type="video/mp4"
                                    ></source>
                                  </video>
                                ) : (
                                  <img
                                    onClick={(e) => openLightboxOnSlide(0, e)}
                                    src={`${BASE_URL}/images/${post?.attachments[0].url}`}
                                    alt={post?.attachments[0].url}
                                    className={`${styles.attachment} border w-50 me-1`}
                                  />
                                )}
                                {post?.attachments[1].docType.split("/")[0] ==
                                "video" ? (
                                  <video
                                    controls
                                    width="100%"
                                    autoplay
                                    className="w-50 border"
                                  >
                                    <source
                                      src={`${BASE_URL}/images/${post.attachments[1].url}`}
                                      type="video/mp4"
                                    ></source>
                                  </video>
                                ) : (
                                  <img
                                    onClick={(e) => openLightboxOnSlide(1, e)}
                                    style={{
                                      borderTopRightRadius: "15px",
                                      borderBottomRightRadius: "15px",
                                    }}
                                    src={`${BASE_URL}/images/${post?.attachments[1].url}`}
                                    alt={post?.attachments[1].url}
                                    className={`${styles.attachment} border w-50`}
                                  />
                                )}
                              </div>
                            )}

                            {/* =================== TRES ARCHIVOS =================== */}
                            {post?.attachments.length === 3 && (
                              <div
                                className="d-flex w-100 pb-2 rounded-4 overflow-hidden"
                                style={{ height: "200px" }}
                              >
                                {post?.attachments[0].docType.split("/")[0] ==
                                "video" ? (
                                  <video
                                    controls
                                    className="w-50 rounded-start-4 me-1"
                                    autoplay
                                  >
                                    <source
                                      src={`${BASE_URL}/images/${post.attachments[0].url}`}
                                      type={post.attachments[0].docType}
                                    ></source>
                                  </video>
                                ) : (
                                  <img
                                    onClick={(e) => openLightboxOnSlide(0, e)}
                                    src={`${BASE_URL}/images/${post?.attachments[0].url}`}
                                    alt={post?.attachments[0].url}
                                    style={{
                                      borderTopLeftRadius: "15px",
                                      borderBottomLeftRadius: "15px",
                                    }}
                                    className={`w-50 h-100 me-1 border ${styles.attachment}`}
                                  />
                                )}

                                <div className="d-flex flex-column w-50">
                                  {post?.attachments[1].docType.split("/")[0] ==
                                  "video" ? (
                                    <video controls className="h-50" autoplay>
                                      <source
                                        src={`${BASE_URL}/images/${post.attachments[1].url}`}
                                        type={post.attachments[1].docType}
                                      ></source>
                                    </video>
                                  ) : (
                                    <img
                                      onClick={(e) => openLightboxOnSlide(1, e)}
                                      src={`${BASE_URL}/images/${post?.attachments[1].url}`}
                                      alt={post?.attachments[1].url}
                                      className={`${styles.attachment} w-100 border`}
                                      style={{
                                        height: "50%",
                                        borderTopRightRadius: "15px",
                                      }}
                                    />
                                  )}
                                  {post?.attachments[2].docType.split("/")[0] ==
                                  "video" ? (
                                    <video
                                      controls
                                      className="h-50"
                                      autoplay
                                      style={{
                                        borderBottomRightRadius: "15px",
                                      }}
                                    >
                                      <source
                                        src={`${BASE_URL}/images/${post.attachments[2].url}`}
                                        type={post.attachments[2].docType}
                                      ></source>
                                    </video>
                                  ) : (
                                    <img
                                      onClick={(e) => openLightboxOnSlide(2, e)}
                                      src={`${BASE_URL}/images/${post?.attachments[2].url}`}
                                      alt={post?.attachments[2].url}
                                      className={`${styles.attachment} w-100 border  border-top-0`}
                                      style={{
                                        height: "50%",
                                        borderBottomRightRadius: "15px",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                            {/* =================== CUATRO ARCHIVOS =================== */}
                            {post?.attachments.length === 4 && (
                              <div className="overflow-hidden">
                                <div className={`d-flex mb-1 `}>
                                  {post?.attachments[0].docType.split("/")[0] ==
                                  "video" ? (
                                    <video
                                      controls
                                      className="w-50 me-1"
                                      autoplay
                                      style={{
                                        height: "120px",
                                        borderTopLeftRadius: "15px",
                                      }}
                                    >
                                      <source
                                        src={`${BASE_URL}/images/${post.attachments[0].url}`}
                                        type="video/mp4"
                                      ></source>
                                    </video>
                                  ) : (
                                    <img
                                      onClick={(e) => openLightboxOnSlide(0, e)}
                                      src={`${BASE_URL}/images/${post?.attachments[0].url}`}
                                      alt={post?.attachments[0].url}
                                      className={`${styles.attachment} w-50 border me-1`}
                                      style={{
                                        height: "120px",
                                        borderTopLeftRadius: "15px",
                                      }}
                                    />
                                  )}
                                  {post?.attachments[1].docType.split("/")[0] ==
                                  "video" ? (
                                    <video
                                      controls
                                      className="w-50"
                                      autoplay
                                      style={{
                                        height: "120px",
                                        borderTopRightRadius: "15px",
                                      }}
                                    >
                                      <source
                                        src={`${BASE_URL}/images/${post.attachments[1].url}`}
                                        type="video/mp4"
                                      ></source>
                                    </video>
                                  ) : (
                                    <img
                                      onClick={(e) => openLightboxOnSlide(1, e)}
                                      src={`${BASE_URL}/images/${post?.attachments[1].url}`}
                                      alt={post?.attachments[1].url}
                                      className={`${styles.attachment} w-50 border`}
                                      style={{
                                        height: "120px",
                                        borderTopRightRadius: "15px",
                                      }}
                                    />
                                  )}
                                </div>
                                <div className="d-flex">
                                  {post?.attachments[2].docType.split("/")[0] ==
                                  "video" ? (
                                    <video
                                      controls
                                      className="w-50 me-1"
                                      autoplay
                                      style={{
                                        height: "120px",
                                        borderBottomLeftRadius: "15px",
                                      }}
                                    >
                                      <source
                                        src={`${BASE_URL}/images/${post.attachments[2].url}`}
                                        type="video/mp4"
                                      ></source>
                                    </video>
                                  ) : (
                                    <img
                                      onClick={(e) => openLightboxOnSlide(2, e)}
                                      src={`${BASE_URL}/images/${post?.attachments[2].url}`}
                                      alt={post?.attachments[2].url}
                                      className={`${styles.attachment} w-50 border  me-1`}
                                      style={{
                                        height: "120px",
                                        borderBottomLeftRadius: "15px",
                                      }}
                                    />
                                  )}
                                  {post?.attachments[3].docType.split("/")[0] ==
                                  "video" ? (
                                    <video
                                      controls
                                      className="w-50 me-1"
                                      autoplay
                                      style={{
                                        height: "120px",
                                        borderBottomRightRadius: "15px",
                                      }}
                                    >
                                      <source
                                        src={`${BASE_URL}/images/${post.attachments[3].url}`}
                                        type="video/mp4"
                                      ></source>
                                    </video>
                                  ) : (
                                    <img
                                      onClick={(e) => openLightboxOnSlide(3, e)}
                                      src={`${BASE_URL}/images/${post?.attachments[3].url}`}
                                      alt={post?.attachments[3].url}
                                      className={`${styles.attachment} w-50 border`}
                                      style={{
                                        height: "120px",
                                        borderBottomRightRadius: "15px",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      {details && (
                        <span className={`text-muted ${styles.smallText}`}>
                          {getDateWithHour(post?.createdAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="nav-item dropdown postActions">
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      className={`nav-link dropdown-toggle ${styles.noArrow}`}
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <button className="btn p-0 me-1 d-flex align-items-center">
                        <span className="material-symbols-outlined">
                          more_vert
                        </span>
                      </button>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end p-2">
                      {post?.own ? (
                        <li>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              enqueueSnackbar("Eliminar post?", {
                                action: actionDelete,
                                autoHideDuration: 5000,
                                preDuplicate: true,
                                anchorOrigin: {
                                  vertical: "bottom",
                                  horizontal: "center",
                                },
                              });
                            }}
                            className="btn w-100 p-0 d-flex align-items-center justify-content-between"
                            type="button"
                          >
                            Eliminar post
                            <span className="material-symbols-outlined fw-light">
                              delete
                            </span>
                          </button>
                        </li>
                      ) : (
                        <>
                          <li>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFollow;
                              }}
                              className="dropdown-item p-0 d-flex justify-content-between "
                            >
                              Seguir a {post?.profile.names}{" "}
                              <span className="material-symbols-outlined text-primary ms-1">
                                person_add
                              </span>
                            </button>
                          </li>
                          <li>
                            <hr className="m-1" />
                          </li>
                          <li>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenReportModal(true);
                              }}
                              className="dropdown-item d-flex p-0 justify-content-between"
                            >
                              Reportar
                              <span className="material-symbols-outlined text-primary   ms-1">
                                report
                              </span>
                            </button>
                          </li>
                          <li>
                            <hr className="m-1" />
                          </li>
                          <li>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                enqueueSnackbar(
                                  `Bloquear a ${post?.profile.user.username}?`,
                                  {
                                    action: actionBlock,
                                    autoHideDuration: 5000,
                                    preDuplicate: true,
                                    anchorOrigin: {
                                      vertical: "bottom",
                                      horizontal: "center",
                                    },
                                  }
                                );
                              }}
                              className="dropdown-item d-flex p-0 justify-content-between"
                            >
                              Bloquear a {post?.profile.names}
                              <span className="material-symbols-outlined text-primary  ms-1">
                                block
                              </span>
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  <ReportModal
                    openModal={openReportModal}
                    setOpenModal={setOpenReportModal}
                    reportableId={post?.id}
                    reportable={"publicación"}
                  />
                </div>
              </div>
            </header>

            <footer className="d-flex justify-content-between">
              <div className="d-flex align-items-center like">
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
                  {post?.likes.length > 0 && <span>{post?.likes.length}</span>}
                </span>
              </div>

              <div className="d-flex align-items-center repost">
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
                  {post?.reposts.length > 0 && (
                    <span>{post?.reposts.length}</span>
                  )}
                </span>
              </div>
              <div className="d-flex align-items-center comment">
                <button
                  className="btn p-0 d-flex align-items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    details ? setWrite(true) : setShowAnswerModal(true);
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
                  {post?.comments.length > 0 && (
                    <span>{post?.comments.length}</span>
                  )}
                </span>
              </div>
              <button className="btn p-0 d-flex align-items-center save">
                <span
                  className={`material-symbols-outlined ${styles.actionButtons}`}
                >
                  bookmark
                </span>
              </button>
              <button
                className="btn p-0 d-flex align-items-center share"
                onClick={(e) => handleShare(e, post?.id)}
              >
                <span
                  className={`material-symbols-outlined ${styles.actionButtons}`}
                >
                  share
                </span>
              </button>
            </footer>
          </article>
          {post?.attachments?.length > 0 && (
            <FsLightbox
              customAttributes={[
                {
                  crossOrigin: "anonymous",
                },
              ]}
              toggler={lightboxController.toggler}
              sources={post?.attachments.map(
                (attachment) => `${BASE_URL}/images/${attachment.url}`
              )}
              slide={lightboxController.slide}
            />
          )}
        </>
      )}
      {showAnswerModal && !details && (
        <AnswerModal
          showAnswerModal={showAnswerModal}
          setShowAnswerModal={setShowAnswerModal}
          post={post}
          handleComment={handleComment}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};
