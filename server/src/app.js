import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { __dirname } from "./helpers/__dirname.js";
import { connectDB } from "./config/db.js";
const app = express();
import { createTablesAndRelations } from "./config/sync.js";

import { routes } from "./export.routes.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { verifyToken } from "./helpers/verifyToken.js";

import {
  getMessagesChat,
  sendMessage,
} from "./modules/chat/message/messageServices.js";
import { getChatIdSvc } from "./modules/chat/chatService.js";
import { socketHandShake } from "./middlewares/jwt/infoTokenSocket.js";
import { CLIENT_RENEG_LIMIT } from "tls";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use(socketHandShake);

app.use((req, res, next) => {
  next();
  if (!res.headersSent) {
    res.setHeader("cross-origin-resource-policy", "cross-origin");
  }
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("combined"));

routes(app);
connectDB();
createTablesAndRelations();

io.on("connection", async (socket) => {
  try {
    // const {
    //   profile: { id: user.profile.id },
    // } = await verifyToken(token);

    const user = socket.user;
    console.log("Cliente conectado:", socket.user.id);

    socket.on("getChatId", async (data) => {
      const { profile2Id } = data;

      if (!user.profile.id || !profile2Id) {
        socket.emit("error", "Los IDs de perfil no pueden ser undefined");
        return;
      }

      try {
        const chatId = await getChatIdSvc(user.profile.id, profile2Id);
        socket.emit("chatId", chatId);
        socket.join(chatId);
      } catch (error) {
        console.error(error);
        socket.emit("error", "Error interno en el servidor");
      }
    });

    socket.join(user.profile.id);

    socket.on("send chat message", async (data) => {
      const { message, receptorId, chatId } = data;

      if (!message) {
        socket.emit("error", "El mensaje o el chatId no pueden ser undefined");
        return;
      }

      try {
        const newMessage = await sendMessage(
          user.profile.id,
          receptorId,
          message
        );
        socket.to(chatId).emit("chat message", newMessage);
      } catch (error) {
        console.error(error);
        socket.emit("error", "Error interno en el servidor");
      }
    });

    socket.on("getAllMessages", async (data) => {
      const { chatId } = data;
      if (!chatId) {
        socket.emit("error", "El chatId no puede ser undefined");
        return;
      }

      try {
        const messages = await getMessagesChat(
          chatId,
          socket.user.dataValues.profile.dataValues.id
        );

        socket.emit("all messages", messages);
      } catch (error) {
        console.error(error);
        socket.emit("error", "Error interno en el servidor");
      }
    });
  } catch (error) {
    console.error("Error al verificar el token", error);
    socket.disconnect();
  }
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
