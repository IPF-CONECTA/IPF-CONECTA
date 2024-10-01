import { Chat } from "./chatModel.js";

export const createChat = async (profile1Id, profile2Id) => {
  try {
    let exists = await Chat.findOne({
      $or: [
        { profile1Id: profile1Id, profile2Id: profile2Id },
        { profile1Id: profile2Id, profile2Id: profile1Id },
      ],
    });
    if (exists) {
      return exists;
    }
    let chat = await Chat.create({
      profile1Id: profile1Id,
      profile2Id: profile2Id,
    });

    return chat;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
