import { sequelize } from "../../../config/db.js";
import { Message } from "./messageModel.js";
import { Profile } from "../../profile/profileModel.js";
import { User } from "../../users/userModel.js";

import { createChat, existChat } from "../chatService.js";
import { Chat } from "../chatModel.js";

export const sendMessage = async (senderId, receptorId, message) => {
  const t = await sequelize.transaction();
  console.log({ senderId, receptorId, message });
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

export const getMessagesChat = async (chatId, profileId) => {
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

    const profiles = await Chat.findByPk(chatId, {
      include: [
        {
          model: Profile,
          as: "profile1",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
        {
          model: Profile,
          as: "profile2",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    const receiver =
      profiles.profile1.id === profileId
        ? profiles.profile2
        : profiles.profile1;

    return { messages, receiver };
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
};
