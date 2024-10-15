import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";

import notChats from "../../../../public/img/notChats.png";
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

  // chats.map((chat) => {
  //   const receptorId =
  //     chat.profile2 === profileId
  //       ? chat.profile1
  //       : chat.profile2 || chat.profile1;

  //   // const receptorId =
  //   //   chat.profile2 === profileId
  //   //     ? chat.profile1
  //   //     : chat.profile2 || chat.profile1;
  //   // console.log({ receptorId });
  // });

  return (
    <>
      <div className="d-flex justify-content-end w-100 p-5">
        <div className="list-group w-75">
          <h5 className="text-center mt-5">Tus Chats</h5>{" "}
          {chats.length === 0 ? (
            <div className="card d-flex  flex-column shadow w-100">
              <h5 className="text-center mt-5 fw-semibold">
                No tienes ningun chat, conecta con alguien e inicia una
                conversación!
              </h5>
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
                <Link to={`/chat/${receptorId.user.username}`}>
                  <div className="d-flex align-items-center w-100 gap-3 list-group-item bg-dark-subtle shadow-lg p-4 mt-3">
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
                            ? "Tú" + ": "
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
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
