import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../services/feedServices";
import { useNoti } from "../hooks/useNoti";
import styles from "../../public/css/profile.module.css";
import RecomendedAccounts from "./RecomendedAccounts";
export const Profile = () => {
  const noti = useNoti();
  const { profileId } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async (profileId) => {
      const res = await getProfile(profileId);
      if (res.status !== 200) {
        noti(res.message, "error");
      }
      setProfile(res.data);
    };

    fetchProfile(profileId);
  }, [profileId]);
  return (
    <>
      {profile && (
        <div className="w-100 d-flex justify-content-center">
          <div
            className={`profile d-flex justify-content-center ${styles.mainContainer}`}
          >
            <header className="bg-dark w-100">
              <div className="profilePics">
                <img src={profile.profilePic} height={30} alt="" />
              </div>
            </header>
            <main></main>
          </div>
          <div className={`${styles.asideContainer} position-fixed ps-5`}>
            <RecomendedAccounts />
          </div>
        </div>
      )}
    </>
  );
};
