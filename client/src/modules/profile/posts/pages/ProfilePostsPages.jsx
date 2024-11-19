import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../../feed/services/feedServices";
import { Nav } from "../../../ui/components";
import { Header } from "../../components/ProfileHeader";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
import { AllPostsContainer } from "../components/AllPostsContainer";
import { postsServices } from "../services/postsServices";

export const ProfilePostPage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
  };

  const fetchPosts = async () => {
    const res = await postsServices.getPostsByUsername(username);
    if (res.status !== 200 && res.status !== 404) {
      return noti("error", "error");
    }

    if (res.status === 200) {
      setPosts(res.data);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [username]);

  return (
    <>
      <Nav />
      <div className="d-flex justify-content-evenly px-5  my-4">
        <div style={{ width: "65%" }} className="border rounded">
          <Header profileData={profileData} setProfileData={setProfileData} />
          <AllPostsContainer
            postData={posts}
            username={username}
            onPostSubmit={fetchPosts}
            own={profileData?.own}
          />
        </div>
      </div>
    </>
  );
};
