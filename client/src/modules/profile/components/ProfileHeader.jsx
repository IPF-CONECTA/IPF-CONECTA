import React, { useState } from "react";
import styles from "../../../../public/css/profile.module.css";
import { followOrUnfollow } from "../../feed/services/feedServices";
import { BASE_URL } from "../../../constants/BASE_URL";
import { Link } from "react-router-dom";

export const Header = ({ profileData, setProfileData }) => {
  const [followHoverText, setFollowHoverText] = useState("");
  const handleMouseEnter = () => {
    if (profileData?.isFollowing) {
      setFollowHoverText("Dejar de seguir");
    }
  };

  const handleMouseLeave = () => {
    setFollowHoverText("");
  };

  const handleFollow = async () => {
    const { statusCode } = await followOrUnfollow(profileData?.profile.id);
    if (statusCode !== 201) return;
    setProfileData((prevData) => ({
      ...prevData,
      isFollowing: !prevData.isFollowing,
    }));
  };

  const onFollow = () => {
    handleFollow(profileData?.profile.id);
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      cantFollowers: prevProfileData.isFollowing
        ? prevProfileData.cantFollowers - 1
        : prevProfileData.cantFollowers + 1,
    }));
  };
  return (
    <header className={`w-100 position-relative ${styles.header}`}>
      <div className="w-100 h-100 rounded-top position-relative d-flex flex-column justify-content-between align-items-end">
        <img
          src="/img/banner.jpg"
          alt="foto de banner"
          className="w-100 rounded-top"
        />
        <div
          className={`me-3 d-flex align-items-start px-5 justify-content-between position-absolute`}
          style={{ top: "20%", left: "2%" }}
        >
          <div className="w-100">
            <img
              src={`${BASE_URL}/images/${profileData?.profile.profilePic}`}
              crossOrigin="anonymous"
              height={200}
              alt="profile pic"
              className="rounded-circle bg-light border border-white border-5 "
            />
            <div className="d-flex justify-content-between w-100">
              <div>
                <div className="d-flex flex-column justify-content-center">
                  <span className="text-dark fs-4 fw-bold">
                    {profileData?.profile.names +
                      " " +
                      profileData?.profile.surnames}{" "}
                    <span className="text-secondary fw-normal fs-6">
                      @{profileData?.profile.user.username}
                    </span>
                  </span>

                  {profileData?.profile.title && (
                    <span className="text-dark fst-italic fw-semibold">
                      {profileData.profile.title}
                    </span>
                  )}
                </div>
                <div className="d-flex mb-2">
                  <div className="text-dark-emphasis  me-3 align-items-center">
                    <span>{profileData?.cantFollowers}</span> seguidores
                  </div>
                  <div className="text-dark-emphasis align-items-center">
                    <span>{profileData?.cantFollowing}</span> siguiendo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`d-flex align-items-center h-100 py-5 me-5 ${styles.buttons}`}
        >
          {!profileData?.own ? (
            <>
              <Link
                className="btn btn-light border d-flex align-items-center text-decoration-none p-1 me-4"
                title="Enviar mensaje"
                to={`/chat/${profileData?.profile.user.username}`}
              >
                <span className="material-symbols-outlined fs-3 fw-light">
                  chat
                </span>
              </Link>
              <button
                className={`btn my-1 ${styles.followBtn} ${
                  profileData?.isFollowing
                    ? `btn-outline-primary fw-bold ${
                        followHoverText !== "" && styles.unfollowBtn
                      }`
                    : "btn-primary fw-bold"
                } `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onFollow}
              >
                {profileData?.isFollowing
                  ? followHoverText || "Siguiendo"
                  : "Seguir"}
              </button>
            </>
          ) : (
            <Link
              title="Editar perfil"
              to={"/editar-perfil"}
              className="btn d-flex align-items-center p-1"
            >
              <span className="material-symbols-outlined fs-3">settings</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
