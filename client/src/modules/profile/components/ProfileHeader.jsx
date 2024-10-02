import styles from "../../../../public/css/profile.module.css";
import { followOrUnfollow } from "../../feed/services/feedServices";
import { Link } from "react-router-dom";
import { chatService } from "../../chat/services/chatService";
import { useContext } from "react";
import { authContext } from "../../../context/auth/Context.js";
export const Header = ({ profileData, setProfileData }) => {
  const { authState } = useContext(authContext);
  console.log(authState);

  const handleFollow = async () => {
    const { statusCode } = await followOrUnfollow(profileData?.profile.id);
    if (statusCode !== 201) return;
    setProfileData((prevData) => ({
      ...prevData,
      isFollowing: !prevData.isFollowing,
    }));
  };
  return (
    <header className={`w-100 ${styles.header}`}>
      <div className="bg-dark w-100 h-100 p-3 rounded-top d-flex">
        <div className={`d-flex flex-column align-items-center me-3`}>
          <span className={`${styles.smallText}  text-light mb-1`}>
            {profileData?.profile.user.role.name === "student"
              ? "ESTUDIANTE"
              : "RECLUTADOR"}
          </span>
          <img
            src={profileData?.profile.profilePic}
            height={75}
            alt="profile pic"
            className="rounded-circle bg-light mb-1"
          />
        </div>
        <div className="h-100 d-flex  justify-content-between w-100">
          <div className="d-flex flex-column justify-content-center">
            <span className="text-white fs-5 fw-bold">
              {profileData?.profile.names + " " + profileData?.profile.surnames}
            </span>
            <span className="text-light">
              @{profileData?.profile.user.username}
            </span>
          </div>
          <div className="d-flex seguidores">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex mb-2">
                <div className="text-light d-flex flex-column me-3 align-items-center">
                  Seguidores
                  <span>{profileData?.cantFollowers}</span>
                </div>
                <div className="d-flex flex-column align-items-center text-light ">
                  Siguiendo
                  <span>{profileData?.cantFollowing}</span>
                </div>
              </div>

              {profileData?.own ? (
                <button className="btn btn-light fw-semibold">
                  Editar perfil
                </button>
              ) : (
                <div className="d-flex justify-content-evenly">
                  <button
                    onClick={() => {
                      handleFollow(profileData.profile.id);
                    }}
                    className={`btn ${
                      profileData.isFollowing
                        ? "btn-outline-info text-white fw-bold"
                        : "btn-info text-white fw-bold"
                    }`}
                  >
                    {profileData.isFollowing ? "Siguiendo" : "Seguir"}
                  </button>
                  <Link to={`/chat/${profileData.profile.user.username}`}>
                    {" "}
                    <button
                      className="btn btn-outline-info text-light fw-bold"
                      onClick={() => {
                        chatService.createChat(
                          authState.user.profile.id,
                          profileData.profile.id
                        );
                      }}
                    >
                      Enviar mensaje
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
