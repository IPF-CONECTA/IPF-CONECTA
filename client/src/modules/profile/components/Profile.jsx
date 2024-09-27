import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNoti } from "../../../hooks/useNoti";
import { getExperiences, getProfile } from "../../feed/services/feedServices";
import { projectsService } from "../project/services/projectsServices";
import { AboutCard } from "./AboutCard";
import { ExperienceContainer } from "./ExperienceContainer";
import { Header } from "./ProfileHeader";
import { Nav } from "./ProfileNav";
import { Projects } from "../project/components/Projects";
import { RecomendedAccounts } from "../../feed/components/RecomendedAccounts";
import styles from "../../../../public/css/profile.module.css";

export const Profile = () => {
  const noti = useNoti();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile(username);
      if (res.status !== 200) {
        return noti(res.message, "error");
      }
      setProfileData(res.data);
    };

    fetchProfile(username);
  }, [username]);

  const fetchProyects = async () => {
    const res = await projectsService.getProjects(profileData.profile.id);
    if (res.status !== 200) {
      return noti("error", "error");
    }
    setProjects(res.data);
  };

  useEffect(() => {
    if (profileData && profileData.profile) {
      const fetchExperiences = async (id) => {
        const res = await getExperiences(id);
        if (res !== 200 && res !== 404) {
          return noti("error", "error");
        }
        if (res.status === 200) {
          setExperiences(res.data);
        }
      };

      fetchExperiences(profileData.profile.id);

      fetchProyects();
    }
  }, [profileData]);

  return (
    <>
      {profileData && (
        <div
          className={`w-100 d-flex justify-content-evenly px-5 pt-4 ${styles.mainContainer}`}
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
                profileId={profileData.profile.id}
              />
              <ExperienceContainer
                own={profileData.own}
                experiencesData={experiences}
              />
              {(profileData.own || projects.length > 0) && (
                <Projects
                  own={profileData.own}
                  username={profileData.profile.user.username}
                  names={profileData.profile.names}
                  projectsData={projects}
                  onProjectSubmit={fetchProyects}
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
