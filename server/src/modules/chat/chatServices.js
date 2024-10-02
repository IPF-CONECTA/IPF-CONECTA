import { Op } from "sequelize";
import { Chat } from "./chatModel.js";

export const getChatsByProfileId = async (profileId) => {
  try {
    let chats = await Chat.findAll({
      [Op.op]: [{ profile1Id: profileId }, { profile2Id: profileId }],
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
    });

    if (exists) {
      console.log("Este chat ya existe:", exists);
      return exists;
    }
    let chat = await Chat.create({
      profile1Id: profile1Id,
      profile2Id: profile2Id,
    });

    console.log("Chat creado correctamente", chat);
    return chat;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
