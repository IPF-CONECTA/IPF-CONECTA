import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useNoti } from "../../../../hooks/useNoti";
import { getProfile } from "../../../feed/services/feedServices";
import { educationsServices } from "../services/educationsServices";

export const AllEducationsContainer = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState();
  const [educations, setEducations] = useState([]);

  const noti = useNoti();

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
    setEducations(res.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchEducations();
  }, [username]);
  return <div>AllEducationsContainer</div>;
};
