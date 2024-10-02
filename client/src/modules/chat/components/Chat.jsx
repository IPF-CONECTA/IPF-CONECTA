import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import { chatService } from "../services/chatService";

const socket = io("http://localhost:4000");

export const Chat = () => {
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
      const res = await chatService.createChat(username);
      console.log(res);
      if (res.status !== "201") {
        console.log({ todomal: res.message });
      }
      setReceiver({
        username: res.data.chat.profile2.user.username,
        names: res.data.chat.profile2.names,
        surname: res.data.chat.profile2.surnames,
        profilePic: res.data.chat.profile2.profilePic,
      });
      setMessages(res.data.messages);
    };

    getChat();
  }, [username]);
  console.log(receiver);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        <h2>Chat</h2>
        <div>
          {message.length > 0
            ? messages.map((msg, index) => <p key={index}>{msg}</p>)
            : "nO hay mensajeeeeeeeee"}
        </div>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
