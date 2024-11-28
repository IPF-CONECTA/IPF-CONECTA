import { useEffect, useState, useContext, useRef, useMemo } from "react";
import { io } from "socket.io-client";
import { authContext } from "../../../context/auth/Context";
import { getFullDate, getHour } from "../../../helpers/getTime";
import { BASE_URL } from "../../../constants/BASE_URL";

import { useChatContext } from "../../../context/chat/ChatContext";

export const Chat = ({ chatId }) => {
  const { authState } = useContext(authContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  const { chatId, receiver, setReceiver } = useChatContext();

  const socket = useMemo(() =>
    io(BASE_URL, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  );

  // const socket = useMemo(
  //   () =>
  //     io(BASE_URL, {
  //       transports: ["websocket", "polling"],
  //       auth: `Bearer ${localStorage.getItem("token")}`,
  //       autoConnect: false,
  //     }),
  //   [authState.token]
  // );

  useEffect(() => {
    if (chatId) {
      console.log(chatId);
      socket.emit("getAllMessages", { chatId });
      socket.on("all messages", (msgs) => {
        console.log(msgs);
        setMessages(groupMessagesByDate(msgs.messages));
        setReceiver(msgs.receiver);
      });

      return () => {
        socket.off("all messages");
      };
    }
  }, [chatId, receiver]);

  const sendMessage = (e) => {
    e.preventDefault();
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

  const groupMessagesByDate = (messages) => {
    const grouped = [];
    let lastDate = null;
    messages.forEach((msg) => {
      const date = getFullDate(msg.createdAt);
      if (date !== lastDate) {
        grouped.push({ type: "date", date });
        lastDate = date;
      }
      grouped.push(msg);
    });
    return grouped;
  };

  return (
    <div className="d-flex flex-column h-100 bg-white">
      <div className="d-flex align-items-center p-3 bg-secondary text-white">
        <img
          src={`${BASE_URL}/images/${receiver?.profilePic}`}
          className="rounded-circle me-3"
          alt={`Foto de perfil de ${receiver?.user?.username}`}
          width={50}
        />
        <div>
          <h5 className="mb-0">{receiver?.user?.username}</h5>
          <small>
            {receiver?.names} {receiver?.surnames}
          </small>
        </div>
      </div>
      <div className="flex-grow-1 p-3 overflow-auto">
        {messages.length === 0 ? (
          <div className="text-center mt-5 text-muted">
            <p>No hay mensajes en este chat</p>
          </div>
        ) : (
          messages.map((msg, index) =>
            msg.type === "date" ? (
              <div key={index} className="text-center my-3">
                <span className="badge bg-secondary">{msg.date}</span>
              </div>
            ) : (
              <div
                key={index}
                className={`d-flex ${
                  msg.sender.user.username === authState.user?.username
                    ? "justify-content-end"
                    : "justify-content-start"
                } mb-3`}
              >
                <div
                  className={`p-3 rounded ${
                    msg.sender.user.username === authState.user?.username
                      ? "bg-primary text-white"
                      : "bg-light text-dark"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  <p className="mb-1">{msg.message}</p>
                  <small className="text-muted">{getHour(msg.createdAt)}</small>
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* Input para enviar mensaje */}
      <form className="d-flex border-top" onSubmit={sendMessage}>
        <input
          type="text"
          className="form-control border-0"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
