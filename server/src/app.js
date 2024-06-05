import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { __dirname } from './helpers/__dirname.js';
import { connectDB } from './config/db.js';
const app = express();
import { v4 } from 'uuid';
import { createTablesAndRelations } from './config/sync.js';

console.log('hola')
console.log(v4())
console.log(process.env.PORT)
app.use(cors());
app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(
    morgan('combined', {
        stream: {
            write: (message) => {
                createLogs(message, __dirname(), '../../logs');
            }
        }
    })
);




connectDB()
createTablesAndRelations()
app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})