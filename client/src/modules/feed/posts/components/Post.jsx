import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getDateWithHour } from "../../../../helpers/getTime";
import { ProfileHover } from "../../../profile/components/ProfileHover";
import { getProfileInfo, like, repostSvc } from "../../services/feedServices";

import styles from "../../../../../public/css/postById.module.css";

export const Post = ({ post, setWrite }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const timeoutRef = useRef(null);
  const profileRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (post) {
      setLiked(post.liked);
      setReposted(post.reposted);
    }
  }, [post]);

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
      {post && (
        <div className="d-flex flex-column align-items-center w-75">
          <article
            className={`d-flex flex-column w-100 border border-bottom  p-3`}
          >
            <header className="position-relative">
              <div className="avatar d-flex align-items-center">
                <div>
                  <img
                    className="me-2 rounded-circle"
                    width={40}
                    height={40}
                    onMouseEnter={() =>
                      handleShowProfile(true, post.profile.user.username)
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/perfil/${post.profile.user.username}`);
                    }}
                    onMouseLeave={() =>
                      handleShowProfile(false, post.profile.id)
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
                      <span className={`text-muted ${styles.smallText}`}>
                        @{post.profile.user.username}
                      </span>
                    </div>
                    <div className="nav-item dropdown">
                      <Link
                        className={`nav-link dropdown-toggle ${styles.noArrow}`}
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <button className="btn p-0 me-1">
                          <span className="material-symbols-outlined">
                            more_vert
                          </span>
                        </button>
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end p-0 p-2">
                        <li>
                          <Link
                            className="dropdown-item d-flex p-0 justify-content-between"
                            to="#"
                          >
                            Reportar
                            <span className="material-symbols-outlined text-danger fw-bold  ms-1">
                              report
                            </span>
                          </Link>
                        </li>
                        <li>
                          <hr className="m-1" />
                        </li>
                        <li>
                          <Link
                            className="dropdown-item d-flex p-0 justify-content-between"
                            to="#"
                          >
                            Bloquear a {post.profile.names}
                            <span className="material-symbols-outlined text-danger fw-bold ms-1">
                              block
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
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
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, "<br />"),
                }}
              ></div>{" "}
              {post.attatchment &&
                (post.attatchment.type === "image" ? (
                  <img src={post.attatchment.url} alt={post.attatchment.alt} />
                ) : (
                  <video src={post.attatchment.url} />
                ))}
              <span className={`text-muted ${styles.smallText}`}>
                {getDateWithHour(post.createdAt)}
              </span>
            </div>
            <footer className="d-flex  justify-content-between">
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
                    setWrite(true);
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
        </div>
      )}
    </>
  );
};
