import { getProfileIdByUsername } from "../../users/userServices.js";
import { sendMessage } from "./messageServices.js";

export const createChatOrSendMessageCtrl = async (req, res) => {
  try {
    const { username } = req.params;
    const receptorId = await getProfileIdByUsername(username);

    if (!receptorId) {
      return res.status(404).json({ message: "User not found" });
    }

    const senderId = req.user.profile.id;

    if (!senderId) {
      return res.status(404).json({ message: "User not found" });
    }

    const { message } = req.body;

    const newMessage = await sendMessage(senderId, receptorId, message);
    res.status(201).json({ message: "Message created", data: newMessage });
  } catch (error) {
    console.error("createMessageCtrl", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
