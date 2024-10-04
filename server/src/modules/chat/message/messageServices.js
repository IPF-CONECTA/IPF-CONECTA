import { Op } from "sequelize";
import { sequelize } from "../../../config/db.js";
import { Chat } from "../chatModel.js";
import { Message } from "./messageModel.js";
import { Profile } from "../../profile/profileModel.js";
import { User } from "../../users/userModel.js";

export const sendMessage = async (senderId, receptorId, message) => {
  console.log({ senderId, receptorId, message });
  const t = await sequelize.transaction();
  try {
    let existsChat = await Chat.findOne({
      where: {
        [Op.or]: [
          { profile1Id: senderId, profile2Id: receptorId },
          { profile1Id: receptorId, profile2Id: senderId },
        ],
      },
      include: [
        { model: Profile, as: "profile1" },
        { model: Profile, as: "profile2" },
      ],
    });

    if (!existsChat) {
      const newChat = await Chat.create(
        { profile1Id: senderId, profile2Id: receptorId },
        { transaction: t }
      );

      return await Message.create(
        { chatId: newChat.id, senderId, message },
        {
          transaction: t,
          include: {
            model: Chat,
            include: [
              { model: Profile, as: "profile1", include: { model: User } },
              { model: Profile, as: "profile2", include: { model: User } },
            ],
          },
        }
      );
    }
    const messageCreated = await Message.create(
      { chatId: existsChat.id, senderId, message },
      {
        transaction: t,
      }
    );
    const found = await Message.findByPk(messageCreated.id, {
      transaction: t,
      include: [
        {
          model: Chat,
          include: [
            { model: Profile, as: "profile1", include: { model: User } },
            { model: Profile, as: "profile2", include: { model: User } },
          ],
        },
      ],
    });
    console.log({ found });
    return found;
  } catch (error) {
    console.log("Error en el servicio del mensaje", error);
    throw new Error(error);
  }
};
