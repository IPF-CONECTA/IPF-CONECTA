import React, { useEffect, useState } from "react";
import { Header } from "../../components/ProfileHeader";
import { getProfile } from "../../../feed/services/feedServices";
import { useParams } from "react-router-dom";
import { Nav, SideBar } from "../../../ui/components";
import styles from "../../../../../public/css/allSkills.module.css";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
import { AllSkills } from "../components/AllSkills";
import { getSkills } from "../services";

export const AllSkillsPage = () => {
  const { username } = useParams();
  const [skills, setSkills] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
  };

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await getSkills(username);
      if (res.status !== 200 && res.status !== 404) {
        return noti("Hubo un error la obtener las habilidades");
      }
      setSkills(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchSkills();
  }, [username]);

  return (
    <>
      <SideBar />
      <div className="d-flex justify-content-evenly px-5 pt-4">
        <div className={`${styles.profileContainer} border rounded-4`}>
          {loading ? (
            <div className={`d-flex justify-content-center my-3`}>
              {" "}
              <span
                className={`spinner-border`}
                role={`status`}
                aria-hidden={`true`}
              ></span>{" "}
            </div>
          ) : (
            <>
              <Header
                profileData={profileData}
                setProfileData={setProfileData}
              />
              <AllSkills
                own={profileData?.own}
                skillsData={skills}
                onSkillSubmit={fetchSkills}
                username={username}
              />
            </>
          )}
        </div>
        <RecommendedAccounts />
      </div>
    </>
  );
};
