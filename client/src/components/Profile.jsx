import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../services/feedServices";
import { useNoti } from "../hooks/useNoti";
import styles from "../../public/css/profile.module.css";
import RecomendedAccounts from "./RecomendedAccounts";
export const Profile = () => {
  const noti = useNoti();
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const res = await getProfile(profileId);
      if (res.status !== 200) {
        noti(res.message, "error");
      }
      setProfileData(res.data);
      console.log(res.data);
    };

    fetchProfileData(profileId);
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
                <div className="h-100 d-flex flex-column justify-content-center">
                  <span className="text-light fs-5 fw-bold">
                    {profileData.profile.names +
                      " " +
                      profileData.profile.surnames}
                  </span>
                  <span className="text-light fst-italic">
                    {profileData.profile.title}
                  </span>
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
              <section className="w-100 bg-success rounded">
                <h5 className="fw-bold">Acerca de mi</h5>
                {profileData.profile.about !== null ? (
                  <div>{profileData.profile.about}</div>
                ) : (
                  <span>Sin descripción</span>
                )}
              </section>
              <section className="about bg-dark w-25 text-light"></section>
            </main>
          </div>
          <RecomendedAccounts />
        </div>
      )}
    </>
  );
};
