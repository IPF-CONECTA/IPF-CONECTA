import { useEffect, useState, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useParams, Link } from "react-router-dom";
import { authContext } from "../../../context/auth/Context";
import { getProfileIdByUsername } from "../../profile/services/services";
import { getFullDate, getHour } from "../../../helpers/getTime";
import { BASE_URL } from "../../../constants/BASE_URL";
import styles from "../../../../public/css/chat.module.css";

export const Chat = ({ chatId }) => {
  const { authState } = useContext(authContext);
  const { username } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const socket = io(BASE_URL, {
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
      setMessages(groupMessagesByDate(msgs));
    });
  }, [chatId]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      if (msg.senderId !== authState.user.profile.id) {
        if (
          containerRef.current.scrollHeight -
            Math.round(containerRef.current.scrollTop) <
          containerRef.current.clientHeight
        ) {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: msg.message, sender: receiver, createdAt: msg.createdAt },
        ]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [receiver]);

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
  }, [messages]);

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
    const groupedMessages = [];
    let lastDate = null;

    messages.forEach((msg) => {
      const messageDate = getFullDate(msg.createdAt);
      if (messageDate !== lastDate) {
        groupedMessages.push({ type: "date", date: messageDate });
        lastDate = messageDate;
      }
      groupedMessages.push(msg);
    });

    return groupedMessages;
  };

  return (
    <div className="d-flex justify-content-end">
      <div className="rounded border w-25 m-md-5 bg-body-secondary">
        <div className="px-3 py-2 w-100 bg-body-secondary d-flex align-items-center">
          <Link to={`/perfil/${receiver.user?.username}`}>
            <img
              src={`${BASE_URL}/images/${receiver.profilePic}`}
              className="rounded-circle border border-2 border-white my-2 me-2"
              alt={receiver.id + "_icon"}
              width={40}
            />
          </Link>
          <span className="fw-semibold fs-5">
            {receiver.names + " " + receiver.surnames}
          </span>
        </div>
        <div
          ref={containerRef}
          className="w-100 bg-dark-subtle p-3"
          style={{ height: "400px", overflowY: "scroll", overflowX: "hidden" }}
        >
          {messages?.length > 0 ? (
            messages.map((msg, index) =>
              msg.type === "date" ? (
                <div key={index} className="text-center my-3">
                  <span className="badge bg-secondary">
                    {msg.date == "Invalid DateTime" ? "Nuevo" : msg.date}
                  </span>
                </div>
              ) : (
                <div
                  key={index}
                  className={`mb-3 d-flex align-items-end ${
                    msg.sender.user.username === authState.user?.username
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  {msg.sender.user.username !== authState.user?.username && (
                    <img
                      src={`${BASE_URL}/images/${receiver.profilePic}`}
                      alt="foto de perfil"
                      className="rounded-circle me-2"
                      width={40}
                      height={40}
                    />
                  )}
                  <div
                    style={{
                      width: "fit-content",
                      minWidth: "10%",
                      maxWidth: "80%",
                    }}
                    className={`${
                      msg.sender.user.username === authState.user?.username
                        ? "bg-body-secondary text-black rounded p-2  "
                        : "bg-body-secondary text-black rounded p-2"
                    }`}
                  >
                    <span className="fs-6 text-break">{msg.message}</span>{" "}
                    <span className={`text-secondary ${styles.smallText}`}>
                      {getHour(
                        msg.createdAt || new Date().toLocaleTimeString()
                      )}
                    </span>
                  </div>
                  {msg.sender.user.username === authState.user?.username && (
                    <img
                      src={`${BASE_URL}/images/${authState.user.profile.profilePic}`}
                      alt="foto de perfil"
                      className="rounded-circle ms-2"
                      width={40}
                      height={40}
                    />
                  )}
                </div>
              )
            )
          ) : (
            <div className="my-2 d-flex h-100 justify-content-center align-items-center">
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
          )}
          <div style={{ scrollMarginBottom: "100px" }} ref={messagesEndRef} />
        </div>
        <form
          onSubmit={(e) => {
            sendMessage(e);
          }}
          style={{ maxWidth: "none" }}
          className="p-0 d-flex shadow-none border-0"
        >
          <input
            className="w-100 border-0 rounded-bottom border-0"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn border-none btn-dark  rounded-0 rounded-end text-white fw-semibold h-100"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
