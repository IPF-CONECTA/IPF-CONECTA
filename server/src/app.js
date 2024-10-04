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
import { sendMessage } from "./modules/chat/message/messageServices.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
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

  // const {
  //   profile: { id },
  // } = await verifyToken(token);
  // console.log("Usuario conectado:", id);
  let id = 1;
  socket.on("chat message", (msg, receptorId) => {
    console.log("Mensaje recibido:", msg);
    // sendMessage(receptorId, msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
