import { useState } from "react";
import { followOrUnfollow } from "../services/feedServices";

export const useFollow = (initialProfile) => {
    const [profileInfo, setProfile] = useState(initialProfile);

    const handleFollowOrUnfollow = async (id) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            isFollowing: !prevProfile.isFollowing,
        }));
        const { data, statusCode } = await followOrUnfollow(id);
        if (statusCode !== 201) {
            noti(data, "error");
        }
    };

    return { profileInfo, handleFollowOrUnfollow };
};