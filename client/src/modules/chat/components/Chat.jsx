import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import { chatService } from "../services/chatService";
import { authContext } from "../../../context/auth/Context";
import { getProfileIdByUsername } from "../../profile/services/services";
import { useNoti } from "../../../hooks/useNoti";

export const Chat = () => {
  const noti = useNoti();
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
    console.log("Getting chatId");
    socket.emit("getAllMessages", { chatId });
    socket.on("all messages", (msgs) => {
      setMessages(msgs);
    });
  }, [chatId]);

  useEffect(() => {
    socket.emit("getChatId", { profile2Id: receiver.id });
    socket.on("chatId", (id) => setChatId(id));
    socket.on("chat message", (msg) => {
      console.log("Mensaje recibido", msg);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: msg.message, sender: receiver },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [receiver]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send chat message", {
        message,
        receptorId: receiver.id,
        chatId,
      });

      console.log("Mensaje enviado: " + message);

      setMessages((prevMessages) => [
        ...prevMessages,
        { message, sender: { user: { username: authState.user.username } } },
      ]);

      setMessage("");
    }
  };

  return (
    <div className="d-flex justify-content-end container mt-4 pt-5">
      <div className="card">
        <img
          src={`${receiver.profilePic}`}
          alt={receiver.id + "_icon"}
          width={25}
        />
        <div className="card-header bg-primary text-white">
          Chat con {receiver.user?.username} ({chatId})
        </div>
        <div
          className="card-body"
          style={{ height: "400px", overflowY: "scroll" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.sender.user.username === authState.user?.username
                  ? "text-end bg-primary text-white rounded"
                  : "text-start bg-secondary text-white rounded"
              }`}
            >
              <strong>
                {msg.sender.user.username === authState.user?.username
                  ? "Yo"
                  : msg.sender.user.username}
                :
              </strong>{" "}
              {msg.message}
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
