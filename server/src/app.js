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

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],

  },
});

app.use((req, res, next) => {
  next()
  res.setHeader('cross-origin-resource-policy', 'cross-origin')
});
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}))
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
  let token = socket.handshake.headers["authorization"];
  token = token.split(" ")[1];

  try {
    const {
      profile: { id: senderId },
    } = await verifyToken(token);
    console.log("Cliente conectado:", senderId);

    socket.on("getChatId", async (data) => {
      const { profile2Id } = data;

      if (!senderId || !profile2Id) {
        socket.emit("error", "Los IDs de perfil no pueden ser undefined");
        return;
      }

      try {
        const chatId = await getChatIdSvc(senderId, profile2Id);
        socket.emit("chatId", chatId);
        socket.join(chatId);
      } catch (error) {
        console.error(error);
        socket.emit("error", "Error interno en el servidor");
      }
    });

    socket.join(senderId);

    socket.on("send chat message", async (data) => {
      const { message, receptorId, chatId } = data;

      if (!message) {
        socket.emit("error", "El mensaje o el chatId no pueden ser undefined");
        return;
      }

      try {
        const newMessage = await sendMessage(senderId, receptorId, message);
        console.log("MENSAJE: =======================")
        console.log(newMessage)
        socket.to(chatId).emit("chat message", newMessage);
        console.log("Enviando mensaje a sala", chatId);
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
        const messages = await getMessagesChat(chatId);
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
