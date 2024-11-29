import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileHover } from "../../profile/components/ProfileHover";
import { getProfileInfo } from "../services/feedServices";
import { useFollow } from "../../../hooks/useFollow";
import styles from "../../../../public/css/accountCard.module.css";
import { BASE_URL } from "../../../constants/BASE_URL";
import { authContext } from "../../../context/auth/Context";
import { useNoti } from "../../../hooks/useNoti";

export const AccountCard = ({ index, account, setOpenConnections }) => {
  const [showProfile, setShowProfile] = useState(false);
  const noti = useNoti();
  const { authState } = useContext(authContext);
  const [profile, setProfile] = useState(null);
  const timeoutRef = useRef(null);
  const profileRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(account?.isFollowing);
  const { profileInfo, handleFollowOrUnfollow } = useFollow(account);
  const navigate = useNavigate();
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

  const handleFollowClick = async (event) => {
    if (authState.role == "admin") {
      return noti("No tienes permisos para esto", "warning");
    }
    await handleFollowOrUnfollow(event, account.user.username);

    setIsFollowing(!isFollowing);
  };

  return (
    <div
      className={`avatar w-100 d-flex justify-content-between align-items-center ${
        index !== 4 && "mb-2"
      }`}
      key={account.id}
    >
      <div className="d-flex position-relative align-items-center">
        <img
          width={40}
          height={40}
          className="rounded-circle me-2 border"
          src={`${BASE_URL}/images/${account.profilePic}`}
          alt={account.names}
          onClick={(e) => {
            e.stopPropagation();
            setOpenConnections && setOpenConnections(false);
            navigate(`/perfil/${account.user.username}`);
          }}
          onMouseEnter={() => handleShowProfile(true, account.user.username)}
          onMouseLeave={() => handleShowProfile(false, account.user.username)}
        />
        {profile && (
          <ProfileHover
            profileData={profile}
            profileRef={profileRef}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        )}

        <div className=" d-flex flex-column">
          <span className="fs-6">
            {account.names.length + account.surnames.length > 18
              ? account.names.length > 12
                ? account.names + " " + account.surnames.slice(0, 3) + "..."
                : account.names + " " + account.surnames.slice(0, 8)
              : account.names + " " + account.surnames}
          </span>
          <span className={`text-muted ${styles.smallText}`}>
            @{account.user.username}
          </span>
        </div>
      </div>
      {authState?.user?.profile?.id !== account?.id && (
        <div>
          <button
            className={`${styles.buttonFollow} ms-2 ${styles.smallText} ${
              isFollowing
                ? "btn btn-outline-primary text-muted fw-bold p-1"
                : "btn btn-primary text-light fw-bold p-1"
            }`}
            onClick={handleFollowClick}
          >
            {isFollowing ? "Siguiendo" : "Seguir"}
          </button>
        </div>
      )}
    </div>
  );
};
