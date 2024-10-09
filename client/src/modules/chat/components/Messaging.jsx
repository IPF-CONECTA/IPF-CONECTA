import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";

import { getTime } from "../../../helpers/getTime";

export const Messaging = () => {
  const { authState } = useContext(authContext);
  const [chats, setChats] = useState([]);
  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    const profileId = authState.user.profile?.id;
    setProfileId(profileId);
  }, [authState]);

  useEffect(() => {
    const getChats = async () => {
      const res = await chatService.getChatsbyProfile();
      setChats(res.data);
    };

    getChats();
  }, []);

  console.log(chats);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Tus Chats</h1>
        <div className="list-group">
          {chats.map((chat) => {
            const receptorId =
              chat.profile1 === profileId ? chat.profile2 : chat.profile1;
            return (
              <Link to={`/chat/${receptorId.user.username}`}>
                <div
                  key={chat.id}
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 p-3"
                >
                  <img
                    src={receptorId.profilePic}
                    alt={receptorId.id + "_icon"}
                    className="rounded-circle"
                    width={50}
                    height={50}
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <p className="mb-1 fw-bold">{receptorId.user.username}</p>
                    <p className="text-muted mb-0">
                      {chat.messages[chat.messages.length - 1].message}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
