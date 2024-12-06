import { useContext, useState } from "react";

import { followOrUnfollow } from "../modules/feed/services/feedServices";
import { useNoti } from "./useNoti";
import { authContext } from "../context/auth/Context";

export const useFollow = (initialProfile) => {
  const { authState } = useContext(authContext)
  const [profileInfo, setProfile] = useState(initialProfile);
  const noti = useNoti();
  const handleFollowOrUnfollow = async (event) => {
    if (authState.role == "admin") {
      return noti("No tienes permisos para esto", "warning")
    }
    event.stopPropagation();
    const res = await followOrUnfollow(initialProfile.user.username);
    if (res.status !== 201 && res.status !== 400) {
      return noti(data, "error");
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      isFollowing: !prevProfile.isFollowing,
      cantFollowers: prevProfile.isFollowing ? prevProfile.cantFollowers - 1 : prevProfile.cantFollowers + 1
    }));
  };

  return { profileInfo, handleFollowOrUnfollow };
};
