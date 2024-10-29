import React, { useContext, useEffect, useState } from "react";
import { Nav } from "../../../ui/components";
import { PersonalDetails } from "../components/PersonalDetails";
import { getProfile } from "../../../feed/services/feedServices";
import { useParams } from "react-router-dom";
import { EditPfp } from "../components/EditPfp";
import { useNoti } from "../../../../hooks/useNoti";
import { authContext } from "../../../../context/auth/Context";

export const EditProfile = () => {
  const { authState } = useContext(authContext);
  const noti = useNoti();
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile(authState.user?.username);
      if (res.status !== 200) {
        return noti(res.message, "error");
      }
      setProfileData(res.data);
    };
    if (authState.user.username) {
      fetchProfile();
    }
  }, [authState]);
  return (
    <>
      <Nav />
      <div className="d-flex justify-content-center">
        <EditPfp profileData={profileData} setProfileData={setProfileData} />
        <PersonalDetails />
      </div>
    </>
  );
};
