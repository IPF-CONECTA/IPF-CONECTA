import { Chat } from "./chatModel.js";
import { Profile } from "../profile/profileModel.js";
import { Message } from "./message/messageModel.js";
import { User } from "../users/userModel.js";
import { Op } from "sequelize";

export const existChat = async (profile1Id, profile2Id) => {
  if (!profile1Id || !profile2Id) {
    throw new Error("Los IDs de perfil no pueden ser undefined");
  }

  try {
    const exists = await Chat.findOne({
      where: {
        [Op.or]: [
          { profile1Id, profile2Id },
          { profile1Id: profile2Id, profile2Id: profile1Id },
        ],
      },
      include: [
        { model: Profile, as: "profile1" },
        { model: Profile, as: "profile2" },
      ],
    });

    return "ya existe", exists;
  } catch (error) {
    throw error;
  }
};

export const createChat = async (profile1Id, profile2Id) => {
  if (!profile1Id || !profile2Id) {
    throw new Error("Los IDs de perfil no pueden ser undefined");
  }

  const verifyExist = await existChat(profile1Id, profile2Id);
  if (verifyExist) {
    return "Este chat ya existe", verifyExist;
  } else {
    const newChat = await Chat.create({
      profile1Id,
      profile2Id,
    });
    return "Chat creado", newChat;
  }
};

export const getChatIdSvc = async (profile1Id, profile2Id) => {
  if (!profile1Id || !profile2Id) {
    throw new Error("Los IDs de perfil no pueden ser undefined");
  }

  try {
    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { profile1Id, profile2Id },
          { profile1Id: profile2Id, profile2Id: profile1Id },
        ],
      },
      include: [
        { model: Profile, as: "profile1" },
        { model: Profile, as: "profile2" },
      ],
    });
    if (!chat) return null;
    return chat.dataValues.id;
  } catch (error) {
    throw error;
  }
};

export const getProfileChatsSvc = async (profileId) => {
  try {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ profile1Id: profileId }, { profile2Id: profileId }],
      },
      include: [
        {
          model: Profile,
          as: "profile1",
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: Profile,
          as: "profile2",
          include: [{ model: User, attributes: ["username"] }],
        },
        {
          model: Message,
          as: "messages",
          include: [{ model: Profile, as: "sender" }],
          order: [["createdAt", "DESC"]],
          limit: 1
        },
      ],
    });

    const lastChats = chats.map((chat) => {
      const { profile1, profile2, messages } = chat.dataValues;
      const receiver = profile1.id === profileId ? profile2 : profile1;
      return {
        id: chat.id,
        receiver,
        lastMessage: messages[0],
      };
    });

    lastChats.sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));


    return lastChats

  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};
