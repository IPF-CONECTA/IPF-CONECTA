import { useParams } from "react-router-dom";
import { AllJobOffersContainer } from "../components/AllJobOffersContainer";
import { Header } from "../../components/ProfileHeader";
import { getProfile } from "../../../feed/services/feedServices";
import { useEffect, useState } from "react";
import { Nav } from "../../../ui/components";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
export const RecruiterJobOffersPage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getProfile(username).then((res) => {
      if (res.status !== 200) {
        return;
      }
      setProfileData(res.data);
    });
  }, [username]);

  return (
    <>
      <Nav />
      <div className="d-flex justify-content-evenly px-5  my-4">
        <div style={{ width: "65%" }} className="border rounded">
          <Header profileData={profileData} setProfileData={setProfileData} />
          <AllJobOffersContainer username={username} />
        </div>

        <RecommendedAccounts />
      </div>
    </>
  );
};
