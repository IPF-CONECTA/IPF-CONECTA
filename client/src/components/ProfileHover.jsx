import React from "react";

const ProfileHover = () => {
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={profileInfoRef}
      className={`position-absolute border rounded p-2 bg-white d-flex align-items-center m-3 ${styles.profileInfo}`}
    >
      <img
        src={`${profileInfo.profilePic}`}
        width={70}
        height={70}
        className="rounded-circle me-2"
        alt="profile pic"
      />
      <div className={`d-flex flex-column ${styles.username}`}>
        <span className="fs-4">
          {profileInfo.names} {profileInfo.surnames}
        </span>
        {profileInfo.title ? (
          <span className="text-muted">{profileInfo.title}</span>
        ) : (
          <span className="text-muted fs-5">Sin titulo</span>
        )}
        <span className="text-muted">{profileInfo.email}</span>
      </div>
      <div className="d-flex flex-column h-75 ps-2 align-items-center">
        <button className="btn btn-dark w-100 mb-2 fw-bold">Seguir</button>
        <button className="btn btn-danger w-100 fw-bold">Block</button>
      </div>
    </div>
  );
};

export default ProfileHover;
