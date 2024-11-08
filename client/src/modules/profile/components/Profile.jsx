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
import { getSkills } from "../skills/services";
import { SkillsContainer } from "../skills/components/SkillsContainer";

import { JobOffers } from "../jobs/components/JobOffers";
import { jobsServices } from "../jobs/services/jobsServices";
import { LanguageSelector } from "../language/components/LanguageCard";

export const Profile = ({ data }) => {
  const noti = useNoti();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile(data ? data : username);
      if (res.status !== 200) {
        return noti(res.message, "error");
      }
      setProfileData(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const fetchProjects = async () => {
    const res = await projectsService.getProjects(data ? data : username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("Hubo un error al obtener los proyectos", "error");
    }
    setProjects(res.data);
  };
  const fetchJobOffers = async () => {
    const res = await jobsServices.getJobsByUsername(data ? data : username);
    if (res.status !== 200) {
      return noti("Hubo un error al obtener los empleos", "error");
    }
    setJobOffers(res.data);
  };
  const fetchExperiences = async () => {
    const res = await getExperiences(data ? data : username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("Hubo un error al obtener las experiencias", "error");
    }
    if (res.status === 200) {
      setExperiences(res.data);
    } else {
      setExperiences([]);
    }
  };
  const fetchSkills = async () => {
    const res = await getSkills(data ? data : username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("Hubo un error la obtener las habilidades");
    }
    if (res.status == 404) {
      return setSkills([]);
    }
    setSkills(res.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchExperiences();
    fetchProjects();
    fetchSkills();

    if (role === "recruiter") {
      fetchJobOffers();
    }
  }, [username, data]);

  useEffect(() => {
    if (profileData) {
      setRole(profileData?.profile.user.role.name);
    }
  }),
    [profileData];

  return (
    <>
      {loading ? (
        <div
          className={`d-flex justify-content-center align-items-center my-3 h-100`}
        >
          <span
            className={`spinner-border`}
            role={`status`}
            aria-hidden={`true`}
          ></span>
        </div>
      ) : (
        <div>
          <Header profileData={profileData} setProfileData={setProfileData} />
          <Nav role={role} />
          <main className="w-100">
            <AboutCard
              own={profileData.own}
              aboutData={profileData.profile.about}
              username={username}
            />
            {(profileData.own || experiences?.length > 0) && (
              <ExperienceContainer
                own={profileData.own}
                experiencesData={experiences}
                onExperienceSubmit={fetchExperiences}
                username={username}
              />
            )}
            {role === "student" &&
              (profileData.own || projects?.length > 0) && (
                <Projects
                  own={profileData.own}
                  username={profileData.profile.user.username}
                  names={profileData.profile.names}
                  projectsData={projects}
                  onProjectSubmit={fetchProjects}
                />
              )}
            {role === "recruiter" && (
              <JobOffers
                own={profileData.own}
                jobOffersData={jobOffers}
                onJobUpdate={fetchJobOffers}
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
            {(profileData.own || profileData.profile.languages?.length > 0) && (
              <LanguageSelector
                languagesData={profileData.profile.languages}
                own={profileData.own}
                username={username}
              />
            )}
          </main>
        </div>
      )}
    </>
  );
};
