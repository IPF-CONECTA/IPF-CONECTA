import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getConnections } from "../services/services";
import { useNoti } from "../../../hooks/useNoti";
import { AccountCard } from "../../feed/components/AccountCard";

export const ConnectionsModal = ({
  openConnections,
  setOpenConnections,
  typeConnection,
  username,
}) => {
  const [data, setData] = useState([]);
  const noti = useNoti();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getConnections(username, typeConnection);
      if (res.status !== 200) {
        setOpenConnections(false);
        return noti("Hubo un error al obtener las conexiones", "error");
      }
      setData(res.data);
    };
    if (openConnections) fetchData();
  }, [openConnections]);

  return (
    <Dialog
      open={Boolean(openConnections)}
      onClose={() => setOpenConnections(false)}
      fullWidth
      maxWidth="xs"
    >
      <div className="p-3 " style={{ maxHeight: "400px" }}>
        <span className="fw-semibold fs-4 ">
          {typeConnection == "followers" ? "Seguidores" : "Siguiendo"}
        </span>
        <ul className="list-group list-group-flush">
          {data.map((profile, index) => {
            return (
              <li key={index} className="list-group-item">
                <AccountCard
                  index={index}
                  account={
                    profile?.followingProfile || profile?.followerProfile
                  }
                  setOpenConnections={setOpenConnections}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Dialog>
  );
};

{
  /* <div className="d-flex justify-content-between">
  <div className="d-flex align-items-center">
    <img
      src={`${BASE_URL}/images/${
        profile?.followerProfile?.profilePic ||
        profile?.followingProfile?.profilePic
      }`}
      onClick={() => {
        navigate(
          `/perfil/${
            profile?.followerProfile?.user.username ||
            profile?.followingProfile?.user.username
          }`
        );
      }}
      alt="profile pic"
      className="rounded-circle bg-light border border-white border-5"
      height={50}
    />
    <div className="d-flex flex-column ms-2">
      <span className="fw-semibold fs-6">
        {profile?.followerProfile?.names || profile?.followingProfile?.names}{" "}
        {profile?.followerProfile?.surnames ||
          profile?.followingProfile?.surnames}
      </span>
      <span style={{ fontSize: "0.8rem" }}>
        @
        {profile?.followerProfile?.user.username ||
          profile?.followingProfile?.user.username}
      </span>
    </div>
  </div>
  {profile.followerId !== authState.user?.profile.id &&
    profile.followingId !== authState.user?.profile.id && (
      <div className="d-flex align-items-center">
        <button
          type="button"
          className={`btn ${
            profile.isFollowing ? "btn-outline-primary" : "btn-primary"
          }`}
        >
          {profile.isFollowing ? "Unfollow" : "Seguir"}
        </button>
      </div>
    )}
</div>; */
}
