import { useContext, createContext } from "react";

export const chatContext = createContext();
export const useChatContext = () => useContext(chatContext);
