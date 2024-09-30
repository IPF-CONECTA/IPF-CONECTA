import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { __dirname } from "./helpers/__dirname.js";
import { connectDB } from "./config/db.js";
const app = express();
import { createTablesAndRelations } from "./config/sync.js";
import router from "./modules/users/userRoutes.js";
import { routes } from "./export.routes.js";
import path from "path";

import { Server } from "socket.io";
import { createServer } from "http";

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

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("Mensaje recibido:", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
