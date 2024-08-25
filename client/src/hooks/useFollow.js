import { useState } from "react";
import { followOrUnfollow } from "../services/feedServices";
import { useNoti } from "./useNoti";

export const useFollow = (initialProfile) => {
    const [profileInfo, setProfile] = useState(initialProfile);
    const noti = useNoti()
    const handleFollowOrUnfollow = async (id) => {
        const { data, statusCode } = await followOrUnfollow(id);
        if (statusCode !== 201 && statusCode !== 400) {
            return noti(data, "error");
        }
        setProfile((prevProfile) => ({
            ...prevProfile,
            isFollowing: !prevProfile.isFollowing,
        }));
    };

    return { profileInfo, handleFollowOrUnfollow };
};