import { useState, useEffect, useContext } from "react";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";

export const Messaging = () => {
  const { authState } = useContext(authContext);
  const profileId = authState.user.profile?.id;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      const res = await chatService.getChatsbyProfile();
      setChats(res.data);
    };

    getChats();
  }, []);

  console.log(chats);

  chats.forEach((chat) => {
    const lasMessageChats = chat.messages;
    console.log({ lasMessageChats });

    const receptorId =
      chat.profile1 === profileId ? chat.profile2 : chat.profile1;
    console.log({ receptorId });
  });

  // chats.map((chat) => {
  //   const  = chat.profile1 === profileId ? chat.profile2 : chat.profile1;
  //   console.log(chat);
  // });

  return (
    <>
      <h1>Tus Chats..</h1>
    </>
  );
};
