import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";

export const Chat = () => {
  const socket = io("http://localhost:4000", {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const { authState } = useContext(authContext);

  const { username } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [receiver, setReceiver] = useState({
    username: "",
    names: "",
    surnames: "",
    profilePic: "",
  });

  useEffect(() => {
    const getChat = async () => {
      const res = await chatService.sendMessage(message, username);
      console.log(res.data);

      if (res.status !== "201") {
        console.log({ todomal: res.message });
      }
      console.log(res.data);
      if (!res.data.chat) {
        return;
      }
      if (res.data.chat.profile1.user.username === authState.user.username) {
        setReceiver({
          username: res.data.chat.profile2.user.username,
          names: res.data.chat.profile2.names,
          surname: res.data.chat.profile2.surnames,
          profilePic: res.data.chat.profile2.profilePic,
        });
      }

      setReceiver({
        username: res.data.chat.profile1.user.username,
        names: res.data.chat.profile1.names,
        surname: res.data.chat.profile1.surnames,
        profilePic: res.data.chat.profile1.profilePic,
      });
    };

    getChat();
  }, [username]);

  console.log("receiver", receiver);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [message]);

  const sendMessage = () => {
    if (message === " ") {
      socket.emit("chat message", message.message, receiver.id);

      setMessage(message);
      console.log(message);
    }
  };

  console.log({ receptor: receiver });
  return (
    <div>
      <div>
        <h2>Chat con {receiver.names} </h2>

        <div>
          {message &&
            message.length > 0 &&
            messages.map((msg, index) => <p key={index}>{msg}</p>)}
        </div>
      </div>
      <input
        type="text"
        value={message.message}
        onChange={(e) => setMessage({ ...message, message: e.target.value })}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
