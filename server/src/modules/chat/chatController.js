import { createChat, getChatsByProfileId } from "./chatServices.js";

export const createChatCtrl = async (req, res) => {
  try {
    const { id: profile1Id } = req.user.profile;
    const { profile2Id } = req.body;

    console.log({ profile1Id, profile2Id });
    let chat = await createChat(profile1Id, profile2Id);
    res.status(201).json({ chat });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getChatsByProfileIdCtrl = async (req, res) => {
  try {
    const { id: profileId } = req.user.profile;
    let chats = await getChatsByProfileId(profileId);
    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({ error });
  }
};
