import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

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

  console.log({ receiver });

  return (
    <div className="d-flex justify-content-end mt-4 pt-5 container w-10">
      <div className="card">
        <div className="d-flex card-header bg-primary text-white p-2">
          <img
            src={`${receiver.profilePic}`}
            alt={receiver.id + "_icon"}
            width={25}
          />
          {receiver.user?.username} ({receiver.names})
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
                  ? "text-end bg-primary text-white rounded p-2"
                  : "text-start bg-secondary text-white rounded p-2"
              }`}
            >
              <strong>
                {msg.sender.user.username === authState.user?.username
                  ? ""
                  : msg.sender.user.username + ": "}
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
