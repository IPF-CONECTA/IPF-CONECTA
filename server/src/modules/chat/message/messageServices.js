import { Op } from "sequelize";
import { sequelize } from "../../../config/db.js";
import { Chat } from "../chatModel.js";
import { Message } from "./messageModel.js";
import { Profile } from "../../profile/profileModel.js";
import { User } from "../../users/userModel.js";

import { createChat, existChat } from "../chatService.js";

export const sendMessage = async (senderId, receptorId, message) => {
  const t = await sequelize.transaction();

  try {
    let chat = await existChat(senderId, receptorId);
    if (!chat) {
      chat = await createChat(senderId, receptorId);
    }

    const newMessage = await Message.create(
      { chatId: chat.id, senderId, message },
      { transaction: t }
    );

    await t.commit();
    return newMessage;
  } catch (error) {
    console.error("Error en el servicio del mensaje", error);
    await t.rollback();
    throw new Error(error);
  }
};

// export const sendMessage = async (senderId, receptorId, message) => {
//   const t = await sequelize.transaction();

//   try {
//     //Verificar si existe un chat entre el emisor y el receptor
//     let verifyExistChat = await existChat(senderId, receptorId);

//     if (!verifyExistChat) {
//       verifyExistChat = await createChat(senderId, receptorId);
//     }

//     const newMessage = await Message.create(
//       { chatId: verifyExistChat.id, senderId, message },
//       { include: { model: Chat, as: "messages" }, transaction: t },
//       { transaction: t }
//     );

//     await t.commit();
//     return newMessage;
//   } catch (error) {
//     console.error("Error en el servicio del mensaje", error);
//     await t.rollback();
//     throw new Error(error);
//   }
// };

// export const createChatOrSendMessage = async (
//   senderId,
//   receptorId,
//   message
// ) => {
//   const t = await sequelize.transaction();
//   try {
//     let existsChat = await Chat.findOne({
//       where: {
//         [Op.or]: [
//           { profile1Id: senderId, profile2Id: receptorId },
//           { profile1Id: receptorId, profile2Id: senderId },
//         ],
//       },
//       transaction: t,
//       include: [
//         { model: Profile, as: "profile1" },
//         { model: Profile, as: "profile2" },
//       ],
//     });

//     if (!existsChat) {
//       const newChat = await Chat.create(
//         { profile1Id: senderId, profile2Id: receptorId },
//         { transaction: t }
//       );

//       return await Message.create(
//         { chatId: newChat.id, senderId, message },
//         {
//           transaction: t,
//           include: {
//             model: Chat,
//             include: [
//               { model: Profile, as: "profile1", include: { model: User } },
//               { model: Profile, as: "profile2", include: { model: User } },
//             ],
//           },
//         }
//       );
//     }
//     const messageCreated = await Message.create(
//       { chatId: existsChat.id, senderId, message },
//       {
//         transaction: t,
//       }
//     );
//     const found = await Message.findByPk(messageCreated.id, {
//       transaction: t,
//       include: [
//         {
//           model: Chat,
//           include: [
//             { model: Profile, as: "profile1", include: { model: User } },
//             { model: Profile, as: "profile2", include: { model: User } },
//           ],
//         },
//       ],
//     });
//     console.log({ found });
//     return found;
//   } catch (error) {
//     console.log("Error en el servicio del mensaje", error);
//     throw new Error(error);
//   }
// };
