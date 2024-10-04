import { Op } from "sequelize";
import { Chat } from "./chatModel.js";
import { Profile } from "../profile/profileModel.js";
import { Message } from "./message/messageModel.js";
import { User } from "../users/userModel.js";

export const getChatsByProfileId = async (id) => {
  try {
    let chats = await Chat.findAll({
      where: {
        [Op.or]: [{ profile1Id: id }, { profile2Id: id }],
      },

      include: [
        {
          model: Profile,
          as: "profile1",
          attributes: ["id", "names", "surnames", "profilePic"],
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: Profile,
          as: "profile2",
          attributes: ["id", "names", "surnames", "profilePic"],
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: Message,
          attributes: ["chatId", "senderId", "message", "createdAt"],
          as: "messages",
        },
      ],
    });
    return chats;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const createChat = async (profile1Id, profile2Id) => {
  try {
    let exists = await Chat.findOne({
      where: {
        [Op.or]: [
          { profile1Id: profile1Id, profile2Id: profile2Id },
          { profile1Id: profile2Id, profile2Id: profile1Id },
        ],
      },
      include: { all: true },
    });

    if (exists) {
      console.log("Este chat ya existe:", exists);
      return exists;
    }

    let chat = await Chat.create({
      profile1Id: profile1Id,
      profile2Id: profile2Id,
    });
    const chatData = await Chat.findByPk(chat.id, {
      include: [
        {
          model: Profile,
          as: "profile1",
          attributes: ["id", "names", "surnames", "profilePic"],
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: Profile,
          as: "profile2",
          attributes: ["id", "names", "surnames", "profilePic"],
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: Message,
          as: "messages",
        },
      ],
    });

    console.log("Chat creado correctamente", chatData);
    return chatData;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getChatByUser = async (receptorId, senderId) => {
  try {
    let chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { profile1Id: senderId, profile2Id: receptorId },
          { profile1Id: receptorId, profile2Id: senderId },
        ],
      },
      include: [
        {
          model: Profile,
          as: "profile1",
          attributes: ["id", "names", "surnames", "profilePic"],
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: Profile,
          as: "profile2",
          attributes: ["id", "names", "surnames", "profilePic"],
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: Message,
          as: "messages",
        },
      ],
    });

    return chat;
  } catch (error) {
    throw new Error(error);
  }
};
