import { useState } from "react";

import { followOrUnfollow } from "../modules/feed/services/feedServices";
import { useNoti } from "./useNoti";

export const useFollow = (initialProfile) => {
  const [profileInfo, setProfile] = useState(initialProfile);
  const noti = useNoti();
  const handleFollowOrUnfollow = async (event, id) => {
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
