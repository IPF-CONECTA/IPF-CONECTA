import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../../feed/services/feedServices";
import { projectsService } from "../services/projectsServices";

import { AllProjectsContainer } from "../components/AllProjectsContainer";

import { Nav, SideBar } from "../../../ui/components";
import { Header } from "../../components/ProfileHeader";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";

export const ProfileProjectsPage = () => {
  const { username } = useParams();

  const [profileData, setProfileData] = useState();
  const [projects, setProjects] = useState();

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
      return noti("error", "error");
    }
    if (res.status === 200) {
      setProjects(res.data);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, [username]);

  return (
    <>
      <SideBar />
      <div className="d-flex justify-content-evenly px-5  my-4">
        <div className="border rounded-4" style={{ width: "65%" }}>
          <Header profileData={profileData} setProfileData={setProfileData} />
          <AllProjectsContainer
            projectsData={projects}
            own={profileData?.own}
            onProjectSubmit={fetchProjects}
            username={username}
          />
        </div>
        <RecommendedAccounts />
      </div>
    </>
  );
};
