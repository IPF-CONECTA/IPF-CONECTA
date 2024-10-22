import React, { useEffect, useState } from "react";
import { Header } from "../../components/ProfileHeader";
import { AllExperienceContainer } from "../components/AllExperiencesContainer";
import { useParams } from "react-router-dom";
import {
  getExperiences,
  getProfile,
} from "../../../feed/services/feedServices";
import { Nav } from "../../../ui/components";
import styles from "../../../../../public/css/allSkills.module.css";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
export const ProfileExperiencesPage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
  };
  const fetchExperiences = async () => {
    const res = await getExperiences(username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("error", "error");
    }
    if (res.status === 200) {
      setExperiences(res.data);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchExperiences();
  }, [username]);

  return (
    <>
      <Nav />
      <div className="d-flex justify-content-evenly px-5  my-4">
        <div className={`${styles.profileContainer} border  rounded`}>
          <Header profileData={profileData} setProfileData={setProfileData} />
          <AllExperienceContainer
            experiencesData={experiences}
            own={profileData?.own}
            onExperienceSubmit={fetchExperiences}
            username={username}
          />
        </div>
        <RecommendedAccounts />
      </div>
    </>
  );
};
