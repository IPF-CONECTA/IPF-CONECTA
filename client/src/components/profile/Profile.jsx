import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExperiences, getProfile } from "../../services/feedServices";
import { useNoti } from "../../hooks/useNoti";
import styles from "../../../public/css/profile.module.css";
import RecomendedAccounts from "../RecomendedAccounts";
import AboutCard from "./AboutCard";
import ExperienceContainer from "./ExperienceContainer";
import Header from "./Header";
import Nav from "./Nav";

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
            <Header profileData={profileData} setProfileData={setProfileData} />
            <Nav />
            <main className="w-100">
              <AboutCard profileData={profileData} />
              <ExperienceContainer
                profileData={profileData}
                experiences={experiences}
              />
            </main>
          </div>
          <RecomendedAccounts />
        </div>
      )}
    </>
  );
};
