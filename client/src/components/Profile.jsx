import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getExperiences, getProfile } from "../services/feedServices";
import { useNoti } from "../hooks/useNoti";
import styles from "../../public/css/profile.module.css";
import RecomendedAccounts from "./RecomendedAccounts";
export const Profile = () => {
  const noti = useNoti();
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile(profileId);
      if (res.status !== 200) {
        return noti(res.message, "error");
      }
      setProfileData(res.data);
      console.log(res.data);
    };
    const fetchExperiences = async () => {
      const res = await getExperiences(profileId);
      if (res !== 200 && res !== 404) {
        return noti("error", "error");
      }
      if (res.status === 200) {
        setExperiences(res.data);
      }
    };
    fetchExperiences(profileId);
    fetchProfile(profileId);
  }, [profileId]);

  return (
    <>
      {profileData && (
        <div
          className={`w-100 d-flex justify-content-evenly px-5 ${styles.mainContainer}`}
        >
          <div
            className={`profile d-flex flex-column align-items-center ${styles.profileContainer}`}
          >
            <header className={`w-100 ${styles.header}`}>
              <div className="bg-dark w-100 h-100 p-3 rounded d-flex">
                <img
                  src={profileData.profile.profilePic}
                  height={90}
                  alt="hola"
                  className="rounded-circle bg-light me-3"
                />
                <div className="h-100 d-flex  justify-content-between w-100">
                  <div className="d-flex flex-column justify-content-center">
                    <span className="text-white fs-5 fw-bold pb-1">
                      {profileData.profile.names +
                        " " +
                        profileData.profile.surnames}
                    </span>
                    <span className="text-light fst-italic">
                      {profileData.profile.title}
                    </span>
                  </div>
                  <div className="d-flex seguidores">
                    <div className="d-flex flex-column align-items-center">
                      <div className="d-flex mb-2">
                        <div className="text-light d-flex flex-column me-3 align-items-center">
                          Seguidores
                          <span>{profileData.cantFollowers}</span>
                        </div>
                        <div className="d-flex flex-column align-items-center text-light ">
                          Siguiendo
                          <span>{profileData.cantFollowing}</span>
                        </div>
                      </div>

                      {profileData.own ? (
                        <button className="btn btn-secondary fw-semibold">
                          Editar perfil
                        </button>
                      ) : (
                        <button
                          className={`btn ${
                            profileData.following
                              ? "btn-outline-info text-dark fw-bold"
                              : "btn-info text-white fw-bold"
                          }`}
                        >
                          {profileData.following ? "Siguiendo" : "Seguir"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <nav className="w-100 d-flex justify-content-evenly">
              <Link
                to={"#"}
                className="btn border rounded text-decoration-none text-dark"
              >
                Resumen
              </Link>
              <Link
                to={"#"}
                className="btn border rounded text-decoration-none text-dark"
              >
                Publicaciones
              </Link>
              <Link
                to={"#"}
                className="btn border rounded text-decoration-none text-dark"
              >
                Experiencia
              </Link>
              <Link
                to={"#"}
                className="btn border rounded text-decoration-none text-dark"
              >
                Educación
              </Link>
              <Link
                to={"#"}
                className="btn border rounded text-decoration-none text-dark"
              >
                Idiomas
              </Link>
            </nav>
            <main className="w-100">
              <section className="w-100 border">
                <h5 className="fw-bold">Acerca de mi</h5>
                {profileData.profile.about !== null ? (
                  <div>{profileData.profile.about}</div>
                ) : (
                  <span>Sin descripción</span>
                )}
              </section>
              <section className="about bg-dark w-100 text-light">
                <h5 className="fw-bold">Experiencias</h5>
              </section>
            </main>
          </div>
          <RecomendedAccounts />
        </div>
      )}
    </>
  );
};
