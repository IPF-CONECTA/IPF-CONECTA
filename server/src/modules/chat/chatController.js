import { createChat } from "./chatService.js";

export const createChatCtrl = async (req, res) => {
  try {
    const { id: profile1Id } = req.user.profile;
    const { profile2Id } = req.body;

    console.log({ Proiedades: profile1Id, profile2Id });
    let chat = await createChat(profile1Id, profile2Id);
    res.status(201).json({ chat });
  } catch (error) {
    res.status(500).json({ error });
  }
};
