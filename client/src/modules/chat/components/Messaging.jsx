import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";
import { getTime } from "../../../helpers/getTime";
import { BASE_URL } from "../../../constants/BASE_URL";

export const Messaging = () => {
  const { authState } = useContext(authContext);
  const [chats, setChats] = useState([]);
  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    setProfileId(authState.user?.profile?.id);
  }, [profileId]);

  useEffect(() => {
    const getChats = async () => {
      const res = await chatService.getChatsByProfile();
      setChats(res.data);
    };
    getChats();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end w-100 p-5">
        <div className="list-group w-75">
          {chats?.length === 0 ? (
            <div className="d-flex flex-column justify-content-center">
              <div className="d-flex">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "150px" }}
                >
                  chat
                </span>
              </div>
              <h5 className="d-flex text-center fw-semibold w-50">
                No tienes ningún chat, conecta con alguien e inicia una
                conversación!
              </h5>
            </div>
          ) : (
            <>
              <h5 className="text-center mt-5">Tus Chats</h5>{" "}
              {chats.map((chat) => {
                const receptorId =
                  chat.profile1.id === profileId
                    ? chat.profile2
                    : chat.profile1;

                return (
                  <Link
                    key={chat.id}
                    to={`/chat/${receptorId.user.username}`}
                    className="text-decoration-none border rounded"
                  >
                    <div className="d-flex align-items-center w-100 gap-3 list-group-item bg-dark-subtle p-3">
                      <img
                        src={`${BASE_URL}/images/${receptorId?.profilePic}`}
                        alt={receptorId.id + "_icon"}
                        className="rounded-circle"
                        width={50}
                      />
                      <div className="d-flex flex-column justify-content-center">
                        <p className="mb-1 fw-bold">
                          {receptorId.user.username}
                        </p>
                        <div>
                          <p className="text-start">
                            {chat?.messages[chat?.messages?.length - 1]
                              ?.senderId == authState.user.profile?.id &&
                              "Tú" + ": "}
                            {chat?.messages[chat.messages.length - 1]?.message}
                          </p>
                          <p>
                            hace{" "}
                            {getTime(
                              chat?.messages[chat.messages.length - 1]
                                ?.createdAt
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};
