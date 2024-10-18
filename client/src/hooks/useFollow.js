import { useState } from "react";

import { followOrUnfollow } from "../modules/feed/services/feedServices";
import { useNoti } from "./useNoti";

export const useFollow = (initialProfile) => {
  const [profileInfo, setProfile] = useState(initialProfile);
  const noti = useNoti();
  const handleFollowOrUnfollow = async (event, id) => {
    event.stopPropagation();
    const { data, statusCode } = await followOrUnfollow(id);
    if (statusCode !== 201 && statusCode !== 400) {
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
