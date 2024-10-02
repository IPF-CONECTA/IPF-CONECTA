import { Message } from "./messageModel.js";

export const sendMessage = async (chatId, senderId, Message) => {
  try {
    const message = await Message.create({ chatId, senderId, message });
    return message;
  } catch (error) {
    throw new Error(error);
  }
};
