import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../../feed/services/feedServices";
import { Nav } from "../../../ui/components";
import { Header } from "../../components/ProfileHeader";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
import { AllPostsContainer } from "../components/AllPostsContainer";

export const ProfilePostPage = () => {
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
          <AllPostsContainer username={username} />
        </div>
        <RecommendedAccounts />
      </div>
    </>
  );
};
