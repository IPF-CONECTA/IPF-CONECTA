import React, { useEffect, useState } from "react";
import { Header } from "../../components/ProfileHeader";
import { getProfile } from "../../../feed/services/feedServices";
import { useParams } from "react-router-dom";
import { Nav } from "../../../ui/components";
import styles from "../../../../../public/css/allSkills.module.css";
import { RecomendedAccounts } from "../../../feed/components/RecomendedAccounts";
import { AllSkills } from "../components/AllSkills";
import { getSkills } from "../../project/skills/services";
export const AllSkillsPage = () => {
  const { username } = useParams();
  const [skills, setSkills] = useState([]);
  const [profileData, setProfileData] = useState(null);

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
  };

  const fetchSkills = async () => {
    const res = await getSkills(username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("Hubo un error la obtener las habilidades");
    }
    setSkills(res.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchSkills();
  }, []);

  return (
    <>
      <Nav />
      <div className="d-flex justify-content-evenly">
        <div className={`${styles.profileContainer} border rounded`}>
          <Header profileData={profileData} setProfileData={setProfileData} />
          <AllSkills
            own={profileData?.own}
            skillsData={skills}
            onSkillSubmit={fetchSkills}
            username={username}
          />
        </div>
        <RecomendedAccounts />
      </div>
    </>
  );
};