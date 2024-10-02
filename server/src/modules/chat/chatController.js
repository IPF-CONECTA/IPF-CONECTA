import { createChat } from "./chatServices.js";
import { getProfileIdByUsername } from "../users/userServices.js";

export const createChatCtrl = async (req, res) => {
  try {
    const { id } = req.user.profile; // profile1Id
    const { username } = req.params; // profile2Id

    const profile2Id = await getProfileIdByUsername(username);

    console.log({ IDLOCO: profile2Id });
    let chat = await createChat(id, profile2Id);
    res.status(201).json({ chat });
  } catch (error) {
    console.log({ aquierror: error });
    res.status(500).json({ message: error.message });
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
