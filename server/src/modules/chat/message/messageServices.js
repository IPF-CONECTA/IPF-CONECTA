import { sequelize } from "../../../config/db.js";
import { Message } from "./messageModel.js";
import { Profile } from "../../profile/profileModel.js";
import { User } from "../../users/userModel.js";

import { createChat, existChat } from "../chatService.js";

export const sendMessage = async (senderId, receptorId, message) => {
  const t = await sequelize.transaction();

  try {
    let chat = await existChat(senderId, receptorId);
    if (!chat) {
      chat = await createChat(senderId, receptorId);
    }

    const newMessage = await Message.create(
      { chatId: chat.id, senderId, message },
      { transaction: t }
    );

    await t.commit();
    return newMessage;
  } catch (error) {
    console.error("Error en el servicio del mensaje", error);
    await t.rollback();
    throw new Error(error);
  }
};

export const getMessagesChat = async (chatId) => {
  try {
    const messages = await Message.findAll({
      where: {
        chatId,
      },
      include: [
        {
          model: Profile,
          as: "sender",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    return messages;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
