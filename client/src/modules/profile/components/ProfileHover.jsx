import { useNavigate } from "react-router-dom";

import styles from "../../../../public/css/PostCard.module.css";
import { useFollow } from "../../../hooks/useFollow";
import { BASE_URL } from "../../../constants/BASE_URL";
import { useState } from "react";

export const ProfileHover = ({
  profileData,
  handleMouseEnter,
  handleMouseLeave,
  profileInfoRef,
}) => {
  const [profile, setProfile] = useState(profileData);
  const { profileInfo, handleFollowOrUnfollow } = useFollow(profile);
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={profileInfoRef}
      className={`position-absolute border rounded p-2 bg-white d-flex flex-column align-items-center m-3 ${styles.profileInfo}`}
    >
      <div className="d-flex justify-content-between align-items-center w-100">
        <img
          src={`${BASE_URL}/images/${profileInfo.profile.profilePic}`}
          width={40}
          height={40}
          className="rounded-circle"
          alt="profile pic"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/perfil/${profileInfo.profile.user.username}`);
          }}
        />
        <div className={`d-flex flex-column ${styles.followButton}`}>
          {profileInfo.isFollowing === false ? (
            <button
              className={`btn btn-primary text-light w-100 p-0 py-1 ${styles.smallText} w-100 fw-bold`}
              onClick={(e) => {
                handleFollowOrUnfollow(e, profileInfo.profile.id);
              }}
            >
              Seguir
            </button>
          ) : (
            <button
              className={`btn btn-outline-primary w-100 text-muted p-0 py-1 ${styles.smallText} w-100 fw-bold`}
              onClick={(e) => {
                handleFollowOrUnfollow(e, profileInfo.profile.id);
              }}
            >
              Siguiendo
            </button>
          )}
        </div>
      </div>
      <div className={`d-flex flex-column ${styles.username}`}>
        <span className="fs-6 fw-semibold">
          {profileInfo.profile.names} {profileInfo.profile.surnames}
        </span>
        {profileInfo.profile.title && (
          <span className="text-muted fs-6">{profileInfo.title}</span>
        )}
        <span className={`text-muted ${styles.smallText}`}>
          @{profileInfo.profile.user.username}
        </span>
        <div className="d-flex">
          <div className="me-3 text-secondary">
            <span>{profileInfo.cantFollowers}</span>
            <span> Seguidores</span>
          </div>
          <div className="text-secondary">
            <span>{profileInfo.cantFollowing}</span>
            <span> Siguiendo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
