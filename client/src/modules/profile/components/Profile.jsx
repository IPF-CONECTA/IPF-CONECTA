import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNoti } from "../../../hooks/useNoti";
import { getExperiences, getProfile } from "../../feed/services/feedServices";
import { projectsService } from "../project/services/projectsServices";
import { AboutCard } from "./AboutCard";
import { ExperienceContainer } from "../experiences/components/ExperienceContainer";
import { Header } from "./ProfileHeader";
import { Nav } from "./ProfileNav";
import { Projects } from "../project/components/Projects";
import { RecomendedAccounts } from "../../feed/components/RecomendedAccounts";
import styles from "../../../../public/css/profile.module.css";
import { getSkills } from "../project/skills/services";
import { SkillsContainer } from "../skills/components/SkillsContainer";

export const Profile = () => {
  const noti = useNoti();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
  };

  const fetchProjects = async () => {
    const res = await projectsService.getProjects(username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("error?", "error");
    }
    setProjects(res.data);
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
  const fetchSkills = async () => {
    const res = await getSkills(username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("Hubo un error la obtener las habilidades");
    }

    setSkills(res.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchExperiences();
    fetchProjects();
    fetchSkills();
  }, [username]);

  return (
    <>
      {profileData && (
        <div
          className={`w-100 d-flex justify-content-evenly px-5 pt-4 ${styles.mainContainer}`}
        >
          <div
            className={`profile d-flex flex-column align-items-center border rounded-top mb-4 ${styles.profileContainer}`}
          >
            <Header profileData={profileData} setProfileData={setProfileData} />
            <Nav />
            <main className="w-100">
              <AboutCard
                own={profileData.own}
                aboutData={profileData.profile.about}
                username={username}
              />
              <ExperienceContainer
                own={profileData.own}
                experiencesData={experiences}
              />
              {(profileData.own || projects?.length > 0) && (
                <Projects
                  own={profileData.own}
                  username={profileData.profile.user.username}
                  names={profileData.profile.names}
                  projectsData={projects}
                  onProjectSubmit={fetchProjects}
                />
              )}
              {(profileData.own || skills?.length > 0) && (
                <SkillsContainer
                  skillsData={skills}
                  own={profileData.own}
                  onSkillSubmit={fetchSkills}
                  username={username}
                />
              )}
            </main>
          </div>
          <RecomendedAccounts />
        </div>
      )}
    </>
  );
};
