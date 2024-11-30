import React, { useContext, useState } from "react";
import styles from "../../../../public/css/profile.module.css";
import { followOrUnfollow } from "../../feed/services/feedServices";
import { BASE_URL } from "../../../constants/BASE_URL";
import { Link, useNavigate } from "react-router-dom";
import { ConnectionsModal } from "./ConnectionsModal";
import { EditProfileModal } from "../edit/components/EditProfileModal";
import { chatService } from "../../chat/services/chatService";
import { useChatContext } from "../../../context/chat/ChatContext";
import { authContext } from "../../../context/auth/Context";
import { useNoti } from "../../../hooks/useNoti";

export const Header = ({ profileData, setProfileData }) => {
  const navigate = useNavigate();

  const { authState } = useContext(authContext);
  const noti = useNoti();
  const [followHoverText, setFollowHoverText] = useState("");
  const [openConnections, setOpenConnections] = useState(false);
  const [typeConnection, setTypeConnection] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  const handleMouseEnter = () => {
    if (profileData?.isFollowing) {
      setFollowHoverText("Dejar de seguir");
    }
  };

  const handleChatClick = () => {
    if (authState.role == "admin")
      return noti("No tienes permiso para hacer esto", "warning");
    const getChatId = async (username) => {
      const res = await chatService.getChatId(username);
      if (res.status !== 200) {
        setChatId(null);
        return setReceiver(profileData.profile);
      }
      setChatId(res.data.chatId);
    };
    getChatId(profileData?.profile.user.username);
    navigate("/mensajes");
  };

  const { setChatId, setReceiver } = useChatContext();

  const handleMouseLeave = () => {
    setFollowHoverText("");
  };

  const handleFollow = async () => {
    if (authState.role == "admin") {
      return noti("No tienes permisos para esto", "warning");
    }
    const res = await followOrUnfollow(profileData?.profile.user.username);
    if (res.status !== 201) return;
    setProfileData((prevData) => ({
      ...prevData,
      isFollowing: !prevData.isFollowing,
      cantFollowers: prevData.isFollowing
        ? prevData.cantFollowers - 1
        : prevData.cantFollowers + 1,
    }));
  };

  return (
    <header className={`w-100 position-relative ${styles.header}`}>
      <div className="w-100 h-100 rounded-top-4 position-relative d-flex flex-column justify-content-between align-items-end">
        <img
          src="/img/banner.jpg"
          alt="foto de banner"
          className="w-100 rounded-top-4"
        />
        <div
          className={`me-3 d-flex align-items-start px-5 justify-content-between position-absolute`}
          style={{ top: "20%", left: "2%" }}
        >
          <div className="w-100">
            <img
              src={`${BASE_URL}/images/${profileData?.profile?.profilePic}`}
              height={200}
              alt="profile pic"
              className="rounded-circle bg-light border border-white border-5 "
            />
            <div className="d-flex justify-content-between w-100">
              <div>
                <div className="d-flex flex-column justify-content-center">
                  <span className="text-dark fs-4 fw-bold">
                    {profileData?.profile?.names +
                      " " +
                      profileData?.profile?.surnames}{" "}
                    <span className="text-secondary fw-normal fs-6 ms-2">
                      @{profileData?.profile?.user.username}
                    </span>
                  </span>

                  {profileData?.profile?.title && (
                    <span className="text-dark fst-italic ">
                      {profileData.profile.title}
                    </span>
                  )}
                </div>
                <div className="d-flex mb-2">
                  <div
                    className="text-dark-emphasis  me-3 align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenConnections(true);
                      setTypeConnection("followers");
                    }}
                  >
                    <span>{profileData?.cantFollowers}</span> seguidores
                  </div>
                  <div
                    className="text-dark-emphasis align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenConnections(true);
                      setTypeConnection("following");
                    }}
                  >
                    <span>{profileData?.cantFollowing}</span> siguiendo
                  </div>
                  <ConnectionsModal
                    openConnections={openConnections}
                    setOpenConnections={setOpenConnections}
                    typeConnection={typeConnection}
                    username={profileData?.profile?.user?.username}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`d-flex align-items-center h-100 me-5 ${styles.buttons}`}
        >
          {!profileData?.own ? (
            <>
              {profileData?.followsYou && (
                <span
                  title={`${profileData?.profile?.user?.username} te sigue`}
                  className="bg-light border rounded bg-light-emphasis px-2 py-1 rounded me-4 fw-semibold"
                >
                  Te sigue
                </span>
              )}
              <button
                className="btn btn-light border d-flex align-items-center text-decoration-none p-1 me-4"
                title="Enviar mensaje"
                onClick={handleChatClick}
              >
                <span className="material-symbols-outlined fs-3 fw-light">
                  chat
                </span>
              </button>
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
                onClick={handleFollow}
              >
                {profileData?.isFollowing
                  ? followHoverText || "Siguiendo"
                  : "Seguir"}
              </button>
            </>
          ) : (
            <button
              title="Editar perfil"
              onClick={() => setEditProfile(true)}
              className="btn d-flex align-items-center p-1"
            >
              <span className="material-symbols-outlined fs-3">settings</span>
            </button>
          )}
        </div>
      </div>
      <EditProfileModal
        openModal={editProfile}
        setOpenModal={setEditProfile}
        profileData={profileData}
        setProfileData={setProfileData}
      />
    </header>
  );
};
