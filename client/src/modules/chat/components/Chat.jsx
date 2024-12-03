import { useEffect, useState, useContext, useRef, useMemo } from "react";
import { io } from "socket.io-client";
import { authContext } from "../../../context/auth/Context";
import { getFullDate, getHour } from "../../../helpers/getTime";
import { BASE_URL } from "../../../constants/BASE_URL";
import styles from "../../../../public/css/chat.module.css";
import { useChatContext } from "../../../context/chat/ChatContext";
import { Link, useNavigate } from "react-router-dom";

export const Chat = () => {
  const { authState } = useContext(authContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { chatId, receiver, setReceiver } = useChatContext();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const socket = useMemo(
    () =>
      io(BASE_URL, {
        auth: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        transports: ["websocket"],
        autoConnect: true,
      }),
    []
  );

  useEffect(() => {
    if (chatId) {
      socket.emit("getAllMessages", { chatId });
      socket.on("all messages", (msgs) => {
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
  useEffect(() => {
    if (messages.at(-1)?.sender.user.username === authState.user.username) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      return;
    }
    if (
      containerRef.current.scrollHeight -
        Math.round(containerRef.current.scrollTop) <
      containerRef.current.clientHeight
    ) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [chatId]);

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
    <div className="d-flex flex-column h-100 w-75 rounded-4 border overflow-hidden">
      <div className="d-flex align-items-center p-3 bg-white">
        <img
          src={`${BASE_URL}/images/${
            receiver?.profilePic ? receiver?.profilePic : "defaultPfp.jpg"
          }`}
          className="rounded-circle me-3"
          alt={`Foto de perfil de ${receiver?.user?.username}`}
          width={50}
          title={`Perfil de ${receiver?.user?.username}`}
          onClick={() =>
            receiver ||
            (chatId && navigate(`/perfil/${receiver?.user?.username}`))
          }
        />
        <div>
          <h5 className="mb-0">
            {receiver
              ? receiver?.names + " " + receiver?.surnames
              : "Selecciona un chat"}
          </h5>
          {receiver && (
            <small className="text-secondary">
              @{receiver?.user?.username}
            </small>
          )}
        </div>
      </div>
      <div
        ref={containerRef}
        className={`flex-grow-1 p-3 overflow-auto ${styles.messagesContainer}`}
      >
        {messages.length === 0 && receiver ? (
          <div className="d-flex h-100 justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <img
                src={`${BASE_URL}/images/${receiver.profilePic}`}
                width={70}
                className="rounded-circle"
                alt={`Foto de perfil de ${receiver.names}`}
              />
              <div className="d-flex flex-column align-items-center">
                <span className="fw-semibold fs-5">
                  {receiver.names + " " + receiver.surnames}
                </span>
                <span className="fs-6 text-secondary">
                  {receiver.user?.username}
                </span>
              </div>
              <Link
                to={`/perfil/${receiver.user?.username}`}
                className="btn btn-light shadow-sm"
              >
                Ver perfil
              </Link>
            </div>
          </div>
        ) : (
          messages.map((msg, index) =>
            msg.type === "date" ? (
              <div key={index} className="text-center my-3">
                <span className="badge bg-secondary fw-normal">{msg.date}</span>
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
                  className={`px-2 py-1 rounded d-flex align-items-center gap-3 ${
                    msg.sender.user.username === authState.user?.username
                      ? " text-white"
                      : "bg-white text-dark"
                  }`}
                  style={{
                    maxWidth: "70%",
                    backgroundColor:
                      msg.sender.user.username === authState.user?.username &&
                      "#117bb9",
                  }}
                >
                  <span className="mb-1">{msg.message}</span>
                  <div className="d-flex align-items-end h-100">
                    <span
                      className={`
                      ${
                        msg.sender.user.username === authState.user?.username
                          ? "text-white"
                          : "text-black"
                      }
                    `}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {getHour(msg.createdAt) === "Invalid DateTime"
                        ? getHour(new Date().toLocaleTimeString())
                        : getHour(msg.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            )
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="d-flex border-top w-100 p-0 rounded border-0"
        style={{ minWidth: "100%" }}
        onSubmit={sendMessage}
      >
        <input
          disabled={!chatId && !receiver}
          type="text"
          className="form-control border-0 w-100 h-100"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          disabled={!chatId && !receiver}
          className="btn text-white"
          style={{ backgroundColor: "#117bb9" }}
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
