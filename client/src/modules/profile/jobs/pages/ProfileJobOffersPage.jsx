import { useParams } from "react-router-dom";
import { AllJobOffersContainer } from "../components/AllJobOffersContainer";
import { Header } from "../../components/ProfileHeader";
import { getProfile } from "../../../feed/services/feedServices";
import { useEffect, useState } from "react";
import { Nav } from "../../../ui/components";
import { RecomendedAccounts } from "../../../feed/components/RecomendedAccounts";
export const RecruiterJobOffersPage = () => {
  const { username } = useParams();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getProfile(username).then((res) => {
      if (res.status !== 200) {
        console.log(res.message, "error");
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
          <Header profileData={profileData} />
          <AllJobOffersContainer username={username} />
        </div>

        <RecomendedAccounts />
      </div>
    </>
  );
};
