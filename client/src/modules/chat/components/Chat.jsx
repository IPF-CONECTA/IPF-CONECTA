import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";
import { getProfileIdByUsername } from "../../profile/services/services";

export const Chat = () => {
  const { authState } = useContext(authContext);
  const { username } = useParams();

  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});

  const socket = io("http://localhost:4000", {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    const getReceiver = async () => {
      const { data } = await getProfileIdByUsername(username);
      setReceiver(data.profile);
    };

    getReceiver(username);
  }, []);

  useEffect(() => {
    const getChatId = async () => {
      const { data } = await chatService.getChatId(
        authState.user.profile.id,
        receiver.id
      );
    };

    getChatId();
  });

  console.log("My id" + authState.user.profile.id);
  console.log("Receiver Id" + receiver.id);

  useEffect(() => {
    socket.emit("getChatId", {});
    socket.emit("ChatId", { chatId });
    socket.on("chatId", (id) => setChatId(id));

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      chatService.sendMessage(username, message);
      socket.emit("chat message", message);

      console.log("Mensaje enviado" + message);

      setMessages((prevMessages) => [
        ...prevMessages,
        { message, sender: "Yo" },
      ]);
      setMessage("");
    }
  };

  return (
    <div className=" d-flex justify-content-end container mt-4 pt-5">
      <div className="card">
        <img
          src={`${receiver.profilePic}`}
          alt={receiver.id + "_icon"}
          width={25}
        />
        <div className="card-header bg-primary text-white">
          Chat con {receiver.id}
        </div>
        <div
          className="card-body"
          style={{ height: "400px", overflowY: "scroll" }}
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn btn-outline-dark" onClick={sendMessage}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
