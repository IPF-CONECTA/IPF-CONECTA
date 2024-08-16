// src/components/ProfileHover.jsx
import React, { useState } from "react";
import styles from "../../public/css/postCard.module.css"; // Asegúrate de importar los estilos correctos
import { useFollow } from "../hooks/useFollow";

export const ProfileHover = ({
  profile,
  handleMouseEnter,
  handleMouseLeave,
  profileInfoRef,
}) => {
  const { profileInfo, handleFollowOrUnfollow } = useFollow(profile);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={profileInfoRef}
      className={`position-absolute border rounded p-3 bg-white d-flex flex-column align-items-center m-3 ${styles.profileInfo}`}
    >
      <div className="d-flex justify-content-between align-items-center w-100">
        <img
          src={`${profileInfo.user.profilePic}`}
          width={70}
          height={70}
          className="rounded-circle"
          alt="profile pic"
        />
        <div className="d-flex flex-column w-50">
          {profileInfo.isFollowing === false ? (
            <button
              className="btn btn-info text-light w-100 fw-bold"
              onClick={() => {
                handleFollowOrUnfollow(profileInfo.user.id);
              }}
            >
              Follow
            </button>
          ) : (
            <button
              className="btn btn-outline-info text-muted w-100 fw-bold"
              onClick={() => {
                handleFollowOrUnfollow(profileInfo.user.id);
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
        <div className="d-flex">
          <div className="pe-3">
            <span className="fw-bold">{profileInfo.cantFollowers}</span>
            <span className="text-muted"> Seguidores</span>
          </div>
          <div>
            <span className="fw-bold">{profileInfo.cantFollowing}</span>
            <span className="text-muted"> Siguiendo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
