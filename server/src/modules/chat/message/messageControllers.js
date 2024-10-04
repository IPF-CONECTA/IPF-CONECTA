import { getProfileIdByUsername } from "../../users/userServices.js";
import { sendMessage } from "./messageServices.js";

export const createMessageCtrl = async (req, res) => {
  try {
    const { username } = req.params;
    // console.log({ USERNAME: username });
    const receptorId = await getProfileIdByUsername(username);
    // console.log({ RECEPTOR: receptorId });
    if (!receptorId) {
      return res.status(404).json({ message: "User not found" });
    }

    const senderId = req.user.profile.id;
    const { message } = req.body;
    const newMessage = await sendMessage(senderId, receptorId, message);
    res.status(201).json({ message: "Message created", data: newMessage });
  } catch (error) {
    console.error("createMessageCtrl", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
