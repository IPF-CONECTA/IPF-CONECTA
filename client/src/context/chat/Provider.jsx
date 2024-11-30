import { useState } from "react";
import { chatContext } from "./ChatContext";

export const ChatProvider = ({ children }) => {
  const [chatId, setChatId] = useState(null);
  const [receiver, setReceiver] = useState(null);

  return (
    <chatContext.Provider value={{ chatId, setChatId, receiver, setReceiver }}>
      {children}
    </chatContext.Provider>
  );
};
