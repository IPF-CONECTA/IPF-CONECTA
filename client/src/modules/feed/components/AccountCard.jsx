import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileHover } from "../../../components/ProfileHover";
import { getProfileInfo } from "../services/feedServices";
import { useFollow } from "../../../hooks/useFollow";

import styles from "../../../../public/css/accountCard.module.css";

export const AccountCard = ({ account }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const timeoutRef = useRef(null);
  const profileRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { profileInfo, handleFollowOrUnfollow } = useFollow(account);
  const navigate = useNavigate();
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

  const handleFollowClick = (event) => {
    handleFollowOrUnfollow(event, account.profile.id);
    setIsFollowing(!isFollowing);
  };

  return (
    <div
      className="avatar w-100 d-flex justify-content-between align-items-center  mb-2"
      key={account.id}
    >
      <div className="d-flex position-relative">
        <img
          width={35}
          height={35}
          className="rounded-circle me-2"
          src={account.profile.profilePic}
          alt={account.profile.names}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/perfil/${account.username}`);
          }}
          onMouseEnter={() => handleShowProfile(true, account.profile.id)}
          onMouseLeave={() => handleShowProfile(false, account.profile.id)}
        />
        {profile && (
          <ProfileHover
            profile={profile}
            profileRef={profileRef}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        )}

        <div className=" d-flex flex-column">
          <span className="fs-6">
            {account.profile.names.length + account.profile.surnames.length > 18
              ? account.profile.names.length > 12
                ? account.profile.names +
                  " " +
                  account.profile.surnames.slice(0, 3) +
                  "..."
                : account.profile.names +
                  " " +
                  account.profile.surnames.slice(0, 8)
              : account.profile.names + " " + account.profile.surnames}
          </span>
          <span className={`text-muted ${styles.smallText}`}>
            @{account.username}
          </span>
        </div>
      </div>
      <div>
        <button
          className={`${styles.buttonFollow} ms-2 ${styles.smallText} ${
            isFollowing
              ? "btn btn-outline-info text-muted fw-bold p-1"
              : "btn btn-info text-light fw-bold p-1"
          }`}
          onClick={handleFollowClick}
        >
          {isFollowing ? "Siguiendo" : "Seguir"}
        </button>
      </div>
    </div>
  );
};
