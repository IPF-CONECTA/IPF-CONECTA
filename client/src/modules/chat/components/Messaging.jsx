import { useState, useEffect, useContext } from "react";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";
import { getTime } from "../../../helpers/getTime";
import { BASE_URL } from "../../../constants/BASE_URL";
import { useChatContext } from "../../../context/chat/ChatContext";
import styles from "../../../../public/css/chat.module.css";
export const Messaging = () => {
  const { authState } = useContext(authContext);
  const [chats, setChats] = useState([]);
  const [profileId, setProfileId] = useState("");

  const { setChatId, chatId } = useChatContext();

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
      <div className="d-flex w-50 flex-column" style={{ marginLeft: "6rem" }}>
        <div className="list-group w-100 h-100 border rounded-4 px-3 py-3">
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
              <div className="d-flex flex-column">
                <span className="fs-3 fw-semibold">Mensajes</span>
                <hr className="my-2 text-body-tertiary" />
                {chats.map((chat) => {
                  const receptorId =
                    chat.profile1.id === profileId
                      ? chat.profile2
                      : chat.profile1;

                  return (
                    <>
                      <div
                        key={chat.id}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => setChatId(chat.id)}
                        className={`text-decoration-none rounded ${
                          styles.chat
                        } ${chatId == chat.id && "bg-light"}`}
                      >
                        <div className="d-flex align-items-center w-100 gap-3 p-2">
                          <img
                            src={`${BASE_URL}/images/${receptorId?.profilePic}`}
                            alt={receptorId.id + "_icon"}
                            className="rounded-circle"
                            width={50}
                          />
                          <div className="d-flex flex-column justify-content-center w-100">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex gap-2 align-items-center">
                                <p className="mb-1 fw-semibold">
                                  {receptorId.names} {receptorId.surnames}
                                </p>
                                <small className="text-secondary">
                                  @{receptorId.user.username}
                                </small>
                              </div>
                              <p>
                                hace{" "}
                                {getTime(
                                  chat?.messages[chat.messages.length - 1]
                                    ?.createdAt
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-start">
                                {chat?.messages[chat?.messages?.length - 1]
                                  ?.senderId == authState.user.profile?.id &&
                                  "Tú" + ": "}
                                {
                                  chat?.messages[chat.messages.length - 1]
                                    ?.message
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-2 text-body-tertiary" />
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
