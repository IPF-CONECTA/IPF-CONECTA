import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getExperiences, getProfile } from "../../services/feedServices";
import { useNoti } from "../../hooks/useNoti";
import styles from "../../../public/css/profile.module.css";
import RecomendedAccounts from "../RecomendedAccounts";
import AboutCard from "./components/AboutCard";
import ExperienceContainer from "./components/ExperienceContainer";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { projectsService } from "../../services/projectsServices";
import { CreateProjectForm } from "../CreateProjectForm";
import Projects from "./components/Projects";

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
      const fetchProyects = async () => {
        const res = await projectsService.getProjects(profileData.profile.id);
        console.log(res);
        if (res.status !== 200) {
          return noti("error", "error");
        }
        setProjects(res.data);
      };
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
