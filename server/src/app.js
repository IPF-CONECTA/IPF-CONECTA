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

import { v2 as cloudinary } from "cloudinary";

app.use(cors());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("combined"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

routes(app);

connectDB();
createTablesAndRelations();
app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
