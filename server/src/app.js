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



app.use(cors());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("combined"));

// Exponer la carpeta `uploads` de forma pública
app.use('/uploads', express.static('uploads'));



routes(app);
connectDB();
createTablesAndRelations();
app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
