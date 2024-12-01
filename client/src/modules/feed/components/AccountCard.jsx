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
  const noti = useNoti();
  const { authState } = useContext(authContext);
  const [isFollowing, setIsFollowing] = useState(account?.isFollowing);
  const { profileInfo, handleFollowOrUnfollow } = useFollow(account);
  const navigate = useNavigate();

  const handleFollowClick = async (event) => {
    if (authState.role == "admin") {
      return noti("No tienes permisos para esto", "warning");
    }
    await handleFollowOrUnfollow(event, account.user.username);

    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <div
        className={`avatar w-100 d-flex bg-white align-items-center ${
          index !== 4 && "mb-2"
        }`}
        key={account.id}
      >
        <div className="d-flex position-relative align-items-center w-100 text-truncate">
          <img
            width={40}
            height={40}
            className="rounded-circle me-2 border"
            style={{ cursor: "pointer" }}
            src={`${BASE_URL}/images/${account.profilePic}`}
            alt={account.names}
            onClick={(e) => {
              e.stopPropagation();
              setOpenConnections && setOpenConnections(false);
              navigate(`/perfil/${account.user.username}`);
            }}
          />

          <div className=" d-flex flex-column  w-100">
            <span className="fs-6 ">
              {account.names + " " + account.surnames}
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
    </>
  );
};
