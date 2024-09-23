import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExperiences, getProfile } from "../../services/feedServices";
import { useNoti } from "../../hooks/useNoti";
import styles from "../../../public/css/profile.module.css";
import RecomendedAccounts from "../RecomendedAccounts";
import AboutCard from "./components/AboutCard";
import ExperienceContainer from "./components/ExperienceContainer";
import Header from "./components/Header";
import Nav from "./components/Nav";

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
            className={`profile d-flex flex-column align-items-center border rounded-top ${styles.profileContainer}`}
          >
            <Header profileData={profileData} setProfileData={setProfileData} />
            <Nav />
            <main className="w-100">
              <AboutCard
                own={profileData.own}
                aboutData={profileData.profile.about}
                profileId={profileId}
              />
              <ExperienceContainer
                own={profileData.own}
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
