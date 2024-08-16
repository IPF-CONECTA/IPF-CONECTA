import React, { useContext, useEffect, useRef, useState } from "react";
import { getProfileInfo, like } from "../services/feedServices";
import styles from "../../public/css/postCard.module.css";
import { getTime } from "../helpers/getTime";
import { ProfileHover } from "./ProfileHover";
const PostCard = (post) => {
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const timeoutRef = useRef(null);
  const profileRef = useRef(null);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const { statusCode } = await like(post.post.id);
    if (statusCode !== 201 && statusCode !== 204) {
      return;
    }
    if (statusCode === 201) {
      post.post.likes.length++;
      setLiked(true);
    } else if (statusCode === 204) {
      setLiked(false);
      if (post.post.likes.length > 0) {
        post.post.likes.length--;
      }
    }
  };

  useEffect(() => {
    setLiked(post.post.liked);
  }, []);

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
    <article
      className={`d-flex flex-column w-75 border rounded p-4 mb-3 ${styles.post}`}
    >
      <header className="position-relative">
        <div className="avatar d-flex align-items-center">
          <div>
            <img
              className="me-3 rounded-circle"
              width={50}
              height={50}
              onMouseEnter={() => handleShowProfile(true, post.post.user.id)}
              onMouseLeave={() => handleShowProfile(false, post.post.user.id)}
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
        <div className="d-flex w-25">
          <button
            onClick={handleLike}
            className="btn p-0 d-flex align-items-center "
          >
            {liked ? (
              <span class={`material-symbols-outlined ${styles.filledIcon}`}>
                thumb_up
              </span>
            ) : (
              <span class="material-symbols-outlined">thumb_up</span>
            )}
          </button>
          <span className={`${styles.numberContainer} ms-2`}>
            {post.post.likes.length > 0 && (
              <span>{post.post.likes.length}</span>
            )}
          </span>
        </div>
        <div className="d-flex w-25">
          <button className="btn p-0 d-flex align-items-center">
            <span className="material-symbols-outlined">chat_bubble</span>{" "}
          </button>
          <span className={`${styles.numberContainer}  ms-2`}>
            {post.post.comments.length > 0 && (
              <span>{post.post.comments.length}</span>
            )}
          </span>
        </div>
        <div className="d-flex w-25">
          <button className="btn p-0 d-flex align-items-center">
            <span className="material-symbols-outlined">repeat</span>{" "}
          </button>
          <span className={`${styles.numberContainer} ms-2`}>
            {post.post.reposts.length > 0 && (
              <span>{post.post.reposts.length}</span>
            )}
          </span>
        </div>
        <button className="btn p-0 d-flex align-items-center">
          <span className="material-symbols-outlined">bookmark</span>
        </button>
      </footer>
    </article>
  );
};

export default PostCard;
