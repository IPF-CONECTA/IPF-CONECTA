import { getProfileIdByUsername } from "../users/userServices.js";
import { getChatIdSvc, getProfileChatsSvc } from "./chatService.js";

export const getChatIdCtrl = async (req, res) => {
  try {
    const { id: profile1Id } = req.user.profile;

    const { username } = req.params;
    const profile2Id = await getProfileIdByUsername(username);

    const chatId = await getChatIdSvc(profile1Id, profile2Id);
    res.status(200).json({ chatId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getProfileChatsCtrl = async (req, res) => {
  try {
    const { id: profileId } = req.user.profile;
    const chats = await getProfileChatsSvc(profileId);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
