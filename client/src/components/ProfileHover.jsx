// src/components/ProfileHover.jsx
import React, { useState } from "react";
import styles from "../../public/css/postCard.module.css"; // Asegúrate de importar los estilos correctos
import { useFollow } from "../hooks/useFollow";
import { useNavigate } from "react-router-dom";

export const ProfileHover = ({
  profile,
  handleMouseEnter,
  handleMouseLeave,
  profileInfoRef,
}) => {
  const { profileInfo, handleFollowOrUnfollow } = useFollow(profile);
  console.log(profile);
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
          src={`${profileInfo.profile.profilePic}`}
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
              className={`btn btn-info text-light w-100 p-0 py-1 ${styles.smallText} w-100 fw-bold`}
              onClick={(event) => {
                handleFollowOrUnfollow(event, profileInfo.profile.id);
              }}
            >
              Seguir
            </button>
          ) : (
            <button
              className={`btn btn-outline-info w-100 text-muted p-0 py-1 ${styles.smallText} w-100 fw-bold`}
              onClick={(event) => {
                handleFollowOrUnfollow(event, profileInfo.profile.id);
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
