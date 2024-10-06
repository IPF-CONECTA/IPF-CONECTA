import { getProfileByUsername } from "../profile/profileServices.js";
import { getChatIdSvc } from "./chatService.js";

export const getChatIdCtrl = async (req, res) => {
  try {
    const { id: profile1Id } = req.user.profile;
    const { username } = req.params;
    const profile2Id = getProfileByUsername(username);
    const chatId = await getChatIdSvc(profile1Id, profile2Id);
    res.status(200).json({ chatId });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
