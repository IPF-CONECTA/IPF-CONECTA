import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { __dirname } from './helpers/__dirname.js';
import { connectDB } from './config/db.js';
const app = express();
import { createTablesAndRelations } from './config/sync.js';
import router from './modules/users/userRoutes.js';

app.use(cors());
app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(morgan('combined'));


app.use(router)

connectDB()
createTablesAndRelations()
app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})