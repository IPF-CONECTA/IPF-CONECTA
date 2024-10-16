import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";

import notChats from "../../../../public/img/notChats.png";
import { getTime } from "../../../helpers/getTime";
import { Chat } from "./Chat";

export const Messaging = () => {
  const { authState } = useContext(authContext);
  const [chats, setChats] = useState([]);
  const [profileId, setProfileId] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

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

  return (
    <>
      <div className="d-flex justify-content-end w-100">
        <div className="w-50 p-3">
          <h5 className="text-center mt-5">Tus Chats</h5>{" "}
          {chats.length === 0 ? (
            <div className="d-flex flex-column shadow">
              <h5 className="text-center mt-5 fw-semibold">
                No tienes ninguna conversación!
              </h5>
              <p className="text-center">
                {" "}
                Actualmente no tienes ningun chat, conecta con alguien e inicia
                una conversación!, si crees que hay un error, recarga la pagina
                o reporta tu inconveniente.
              </p>
              <img
                className="d-block mx-auto mt-3"
                src={notChats}
                width={250}
              />
            </div>
          ) : (
            chats.map((chat) => {
              const receptorId =
                chat.profile1.id === profileId ? chat.profile2 : chat.profile1;

              return (
                <div
                  key={receptorId.id}
                  onClick={() => {
                    setSelectedChat(receptorId.user.username);
                  }}
                >
                  <div className="d-flex align-items-center list-group-item bg-dark-subtle shadow-lg p-2 w-50 ">
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
                          {receptorId.user.username !== authState.user.username
                            ? "Tú: "
                            : receptorId.user.username}

                          {chat?.messages[chat.messages.length - 1]?.message}
                        </p>
                        <p>
                          hace{" "}
                          {getTime(
                            chat?.messages[chat.messages.length - 1]?.createdAt
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="w-50">
          {selectedChat && <Chat username={selectedChat} />}
        </div>
      </div>
    </>
  );
};
