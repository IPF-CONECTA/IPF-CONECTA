import { useEffect, useState, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useParams, Link } from "react-router-dom";

import { authContext } from "../../../context/auth/Context";
import { getProfileIdByUsername } from "../../profile/services/services";
import { getTime } from "../../../helpers/getTime";

export const Chat = () => {
  const { authState } = useContext(authContext);
  const { username } = useParams();

  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});

  const messagesEndRef = useRef(null);
  const conteinerRef = useRef(null);

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
      console.log({ yo: authState.user.profile.id });
      if (msg.senderId !== authState.user.profile.id) {
        if (
          conteinerRef.current.scrollHeight -
            Math.round(conteinerRef.current.scrollTop) <
          conteinerRef.current.clientHeight
        ) {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: msg.message, sender: receiver },
        ]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [receiver]);

  useEffect(() => {
    if (messages.at(-1)?.sender.user.username === authState.user.username) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (
      conteinerRef.current.scrollHeight -
        Math.round(conteinerRef.current.scrollTop) <
      conteinerRef.current.clientHeight
    ) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send chat message", {
        message,
        receptorId: receiver.id,
        chatId,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { message, sender: { user: { username: authState.user.username } } },
      ]);
    }
    setMessage("");
  };

  return (
    <div className="d-flex justify-content-end">
      <div className="card w-75 m-md-5 bg-body-secondary">
        <div className="card-header w-100 bg-body-secondary border-5">
          <Link to={`/perfil/${receiver.user?.username}`}>
            <img
              src={`${receiver.profilePic}`}
              className="rounded-circle mt-2 mb-2"
              alt={receiver.id + "_icon"}
              width={50}
            />
          </Link>
          <strong className="p-1 ms-2">{receiver.user?.username}</strong>
          <strong>({receiver.surnames + " " + receiver.names})</strong>
        </div>
        <div
          ref={conteinerRef}
          className="card-body w-100 bg-dark-subtle"
          style={{ height: "400px", overflowY: "scroll" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.sender.user.username === authState.user?.username
                  ? "text-end bg-dark text-white rounded p-2  "
                  : "text-start bg-body-secondary text-black rounded p-2"
              }`}
            >
              <p className="fs-5">{msg.message}</p>{" "}
              <p className="fs-6">{getTime(msg.createdAt)}</p>
            </div>
          ))}
          <div style={{ scrollMarginBottom: "100px" }} ref={messagesEndRef} />
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
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
