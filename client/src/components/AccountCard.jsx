import React, { useEffect, useRef, useState } from "react";
import { ProfileHover } from "./ProfileHover";
import { getProfileInfo } from "../services/feedServices";
import { useFollow } from "../hooks/useFollow";

const AccountCard = ({ account }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const timeoutRef = useRef(null);
  const profileRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { profileInfo, handleFollowOrUnfollow } = useFollow(account);

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

  useEffect(() => {}, []);
  return (
    <div
      className="avatar w-75 d-flex justify-content-between align-items-center p-2 mb-2 border rounded"
      key={account.id}
    >
      <div className="d-flex position-relative">
        <img
          width={50}
          height={50}
          className="rounded-circle me-2"
          src={account.profile.profilePic}
          alt={account.profile.names}
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
          <span className="fs-5">
            {account.profile.names + " " + account.profile.surnames}
          </span>
          {account.profile.title ? (
            <span className="text-muted">{account.profile.title}</span>
          ) : (
            <span className="text-muted">Sin titulo</span>
          )}
        </div>
      </div>
      <div>
        {isFollowing ? (
          <button
            className="btn btn-outline-info text-muted w-100 fw-bold"
            onClick={() => {
              setIsFollowing(false);
              handleFollowOrUnfollow(profileInfo.profile.id);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="btn btn-info text-light w-100 fw-bold"
            onClick={() => {
              setIsFollowing(true);
              handleFollowOrUnfollow(profileInfo.profile.id);
            }}
          >
            Follow
          </button>
        )}{" "}
      </div>
    </div>
  );
};

export default AccountCard;
