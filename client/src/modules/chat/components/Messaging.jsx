import React, { useState, useEffect, useContext } from "react";
import { BsChatFill } from "react-icons/bs";
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
      <div
        className="d-flex w-50 flex-column h-100 overflow-auto"
        style={{ marginLeft: "6rem" }}
      >
        <div className="list-group w-100 h-100 border rounded-4 px-3 py-3">
          <span className="fs-3 fw-semibold">Mensajes</span>

          {chats?.length === 0 ? (
            <div className="d-flex flex-column justify-content-center h-100 align-items-center">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column align-items-center">
                  <BsChatFill size={65} color="#117bb9" className="mb-2" />
                  <h5 className="fw-semibold m-0 text-body">
                    No hay chats para mostrar
                  </h5>
                  <span className="text-secondary">
                    Conecta con alguien y chatea
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex flex-column">
                <hr className="my-2 text-body-tertiary" />
                {chats.map((chat) => {
                  return (
                    <React.Fragment key={chat.id}>
                      <div
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
                            src={`${BASE_URL}/images/${chat.receiver.profilePic}`}
                            alt={chat.receiver.id + "_icon"}
                            className="rounded-circle"
                            width={50}
                          />
                          <div className="d-flex flex-column justify-content-center w-100">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex gap-2 align-items-center">
                                <p className="mb-1 fw-semibold">
                                  {chat.receiver.names} {chat.receiver.surnames}
                                </p>
                                <small className="text-secondary">
                                  @{chat.receiver.user.username}
                                </small>
                              </div>
                              <p>
                                hace {getTime(chat?.lastMessage?.createdAt)}
                              </p>
                            </div>
                            <div>
                              <p className="text-start">
                                {chat.lastMessage.sender.id === profileId &&
                                  "Tu: "}
                                {chat.lastMessage.message.length > 50
                                  ? chat.lastMessage.message.slice(0, 50) +
                                    "..."
                                  : chat.lastMessage.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-2 text-body-tertiary" />
                    </React.Fragment>
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
