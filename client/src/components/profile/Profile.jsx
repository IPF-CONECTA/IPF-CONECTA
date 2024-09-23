import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getExperiences, getProfile } from "../../services/feedServices";
import { useNoti } from "../../hooks/useNoti";
import styles from "../../../public/css/profile.module.css";
import RecomendedAccounts from "../RecomendedAccounts";
import AboutCard from "./AboutCard";
import ExperienceContainer from "./ExperienceContainer";
import Header from "./Header";
import Nav from "./Nav";
import { projectsService } from "../../services/projectsServices";

export const Profile = () => {
  const noti = useNoti();
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState();

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

  useEffect(() => {
    projectsService.getAllProjects().then((response) => {
      setProjects(response.data);
    });
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

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
                about={profileData.profile.about}
              />
              <ExperienceContainer
                own={profileData.own}
                experiences={experiences}
              />
            </main>
            <h1>Proyectos de {profileData.profile.names}</h1>
            <div className="container">
              <div className="row">
                {displayedProjects.map((project) => {
                  return (
                    <div className="col-md-4 mb-4" key={project.id}>
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">{project.name}</h5>
                        </div>
                        <img
                          src={project.projectLogo}
                          className="card-img-top"
                          alt={project.name}
                        />
                        <div className="card-body">
                          <p className="card-text">{project.description}</p>
                        </div>
                        <div className="card-footer">
                          <p>
                            Estado: <strong>{project.status}</strong>
                          </p>
                          <a href={project.projectLink} target="_blank">
                            <button className="btn btn-outline-success">
                              Ver proyecto
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {projects.length > 3 && !showAll && (
                <a href={`${profileData.profile.user.username}/proyectos`}>
                  <button className="btn btn-outline-dark mt-5 mb-2">
                    Ver todos los proyectos
                  </button>
                </a>
              )}
            </div>
          </div>
          <RecomendedAccounts />
        </div>
      )}
    </>
  );
};
