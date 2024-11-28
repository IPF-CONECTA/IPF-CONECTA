import { useState } from "react";
import { chatContext } from "./ChatContext";

export const ChatProvider = ({ children }) => {
  const [chatId, setChatId] = useState("");
  const [receiver, setReceiver] = useState({});

  return (
    <chatContext.Provider value={{ chatId, setChatId, receiver, setReceiver }}>
      {children}
    </chatContext.Provider>
  );
};
