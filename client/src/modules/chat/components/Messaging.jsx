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
    setProfileId(authState.user?.profile?.id);
  }, [profileId]);

  useEffect(() => {
    const getChats = async () => {
      const res = await chatService.getChatsbyProfile();
      setChats(res.data);
    };

    getChats();
  }, []);

  chats.map((chat) => {
    const receptorId =
      chat.profile2 === profileId
        ? chat.profile1
        : chat.profile2 || chat.profile1;

    // const receptorId =
    //   chat.profile2 === profileId
    //     ? chat.profile1
    //     : chat.profile2 || chat.profile1;
    // console.log({ receptorId });
  });

  return (
    <>
      <div className="container justify-content-center w-50">
        <h1 className="text-center">Tus Chats</h1>
        <div className="list-group">
          {chats.map((chat) => {
            const receptorId =
              chat.profile1.id === profileId ? chat.profile2 : chat.profile1;

            return (
              <Link to={`/chat/${receptorId.user.username}`}>
                <div className="list-group-item list-group-item-action d-flex align-items-center gap-3 p-3">
                  <img
                    src={receptorId.profilePic}
                    alt={receptorId.id + "_icon"}
                    className="rounded-circle"
                    width={50}
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <p className="mb-1 fw-bold">{receptorId.user.username}</p>
                    <div>
                      <p className="text-start">
                        {chat.messages[chat.messages.length - 1].message}
                      </p>
                      <p className="text-end">
                        hace{" "}
                        {getTime(
                          chat.messages[chat.messages.length - 1].createdAt
                        )}
                      </p>
                    </div>
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
