import { Op } from "sequelize";
import { Chat } from "./chatModel.js";
import { Profile } from "../profile/profileModel.js";
import { sequelize } from "../../config/db.js";

export const existChat = async (profile1Id, profile2Id) => {
  if (!profile1Id || !profile2Id) {
    throw new Error("Los IDs de perfil no pueden ser undefined");
  }

  const t = await sequelize.transaction();

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
      transaction: t,
    });

    await t.commit();
    return "ya existe", exists;
  } catch (error) {
    await t.rollback();
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
    const t = await sequelize.transaction();

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
      transaction: t,
    });

    await t.commit();

    return chat.id;
  } catch {
    await t.rollback();
    throw error;
  }
};