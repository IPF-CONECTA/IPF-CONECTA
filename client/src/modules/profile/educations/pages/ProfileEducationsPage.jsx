import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../../feed/services/feedServices";
import { educationsServices } from "../../../profile/educations/services/educationsServices";
import { Nav, SideBar } from "../../../ui/components";
import { Header } from "../../components/ProfileHeader";

import { AllEducationsContainer } from "../../../profile/educations/components/AllEducationsContainer";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
export const ProfileEducationsPage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState();
  const [educations, setEducations] = useState();

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
  };
  const fetchEducations = async () => {
    const res = await educationsServices.getEducations(username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("error", "error");
    }
    if (res.status === 200) {
      setEducations(res.data);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchEducations();
  }, [username]);

  return (
    <>
      <SideBar />
      <div className="d-flex justify-content-evenly px-5  my-4">
        <div className="border rounded-4" style={{ width: "65%" }}>
          <Header profileData={profileData} setProfileData={setProfileData} />
          <AllEducationsContainer
            educationsData={educations}
            own={profileData?.own}
            onEducationSubmit={fetchEducations}
            username={username}
          />
        </div>
        <RecommendedAccounts />
      </div>
    </>
  );
};
