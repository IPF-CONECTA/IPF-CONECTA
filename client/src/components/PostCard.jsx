import React, { useEffect, useRef, useState } from "react";
import { followOrUnfollow, getProfileInfo } from "../services/feedServices";
import styles from "../../public/css/postCard.module.css";
import { useNoti } from "../hooks/useNoti";
import { getTime } from "../helpers/getTime";
const PostCard = (post) => {
  console.log(post);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const timeoutRef = useRef(null);
  const profileInfoRef = useRef(null);
  const noti = useNoti();
  useEffect(() => {
    console.log(profileInfo);
  }, [profileInfo]);
  const handleFollowOrUnfollow = async (id) => {
    setProfileInfo((prevProfileInfo) => ({
      ...prevProfileInfo,
      isFollowing: !prevProfileInfo.isFollowing,
    }));
    const { data, statusCode } = await followOrUnfollow(profileInfo.user.id);
    if (statusCode !== 201) {
      noti(data, "error");
    }
  };
  const handleShowProfileInfo = (boolean, id) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!boolean) {
      timeoutRef.current = setTimeout(() => {
        setShowProfileInfo(false);
        setProfileInfo(null);
      }, 200);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setShowProfileInfo(true);
      const { data, statusCode } = await getProfileInfo(id);
      if (statusCode !== 200) {
        return;
      }
      setProfileInfo(data);
    }, 500);
  };
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowProfileInfo(true);
  };

  const handleMouseLeave = () => {
    setShowProfileInfo(false);
    setProfileInfo(null);
  };
  return (
    <article className="d-flex flex-column w-75 border rounded p-4 mb-3  ">
      <header className="position-relative">
        <div className="avatar d-flex align-items-center">
          <div>
            <img
              className="me-3 rounded-circle"
              width={50}
              height={50}
              onMouseEnter={() =>
                handleShowProfileInfo(true, post.post.user.id)
              }
              onMouseLeave={() =>
                handleShowProfileInfo(false, post.post.user.id)
              }
              src={post.post.user.profilePic}
              alt={post.post.user.names}
            />
          </div>
          <div className={`d-flex flex-column w-100 ${styles.usernames}`}>
            {post.post.user.title ? (
              <>
                <div className="d-flex flex-column justify-content-between">
                  <div>
                    <span className="fw-bold fs-6">{post.post.user.names}</span>
                    <span className="fs-4">{post.post.user.surnames}</span>
                  </div>
                  <span>{getTime(post.post.createdAt)}</span>
                </div>
                <span className="text-muted fw-lighter">
                  {post.post.user.title}
                </span>
              </>
            ) : (
              <>
                <div className="w-100 d-flex justify-content-between">
                  <span className="fw-bold fs-5       ">
                    {post.post.user.names} {post.post.user.surnames}
                  </span>
                  <span>{getTime(post.post.createdAt)}</span>
                </div>
              </>
            )}
            <span>{post.post.user.title}</span>
          </div>
        </div>
        {profileInfo && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={profileInfoRef}
            className={`position-absolute border rounded p-2 bg-white d-flex flex-column justify-content-center p-3 ${styles.profileInfo}`}
          >
            <div className="d-flex align-items-start justify-content-between">
              <img
                src={`${profileInfo.user.profilePic}`}
                width={65}
                height={65}
                className="rounded-circle me-2"
                alt="profile pic"
              />
              <div className="d-flex flex-column h-75 w-50 ps-2 align-items-center">
                {profileInfo.isFollowing === false ? (
                  <button
                    className="btn btn-dark w-100 mb-2 fw-bold"
                    onClick={() => {
                      handleFollowOrUnfollow(profileInfo.id);
                    }}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark w-100 mb-2 fw-bold"
                    onClick={() => {
                      handleFollowOrUnfollow(profileInfo.id);
                    }}
                  >
                    Unfollow
                  </button>
                )}
              </div>
            </div>
            <div className={`d-flex flex-column ${styles.username}`}>
              <span className="fs-4">
                {profileInfo.user.names} {profileInfo.user.surnames}
              </span>
              {profileInfo.user.title ? (
                <span className="text-muted">{profileInfo.user.title}</span>
              ) : (
                <span className="text-muted fs-5">Sin titulo</span>
              )}
              <span className="text-muted">{profileInfo.user.email}</span>
            </div>
          </div>
        )}
      </header>
      <div className="py-3">
        <p>{post.post.content}</p>
        {post.post.attatchment &&
          (post.post.attatchment.type === "image" ? (
            <img
              src={post.post.attatchment.url}
              alt={post.post.attatchment.alt}
            />
          ) : (
            <video src={post.post.attatchment.url} />
          ))}
      </div>
      <footer className="">
        <button className="btn p-0 d-flex align-items-center">
          <span class="material-symbols-outlined">thumb_up</span>
        </button>
        <button className="btn p-0 d-flex align-items-center">
          <span className="material-symbols-outlined">chat_bubble</span>{" "}
        </button>
        <button className="btn p-0 d-flex align-items-center">
          <span className="material-symbols-outlined">repeat</span>{" "}
        </button>
      </footer>
    </article>
  );
};

export default PostCard;
