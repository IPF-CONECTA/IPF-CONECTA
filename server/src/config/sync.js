import { sequelize } from "./db.js"
import { v4 as generateId } from 'uuid';
import { Role } from "../models/role.js";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import { Like } from "../models/like.js";
import { Report } from "../models/report.js";
import { ReportReason } from "../models/reportReason.js";
import { Follower } from "../models/follower.js";
import { Country } from "../models/country.js";
import { State } from "../models/state.js";
import { City } from "../models/city.js";
export const createTablesAndRelations = async () => {
    await sequelize.sync({ force: false })
    console.log('Tables created successfully')

    // await Role.bulkCreate([
    //     { name: 'superAdmin' },
    //     { name: 'admin' },
    //     { name: 'student' },
    //     { name: 'recruiter' },
    //     { name: 'investor' }
    // ]);
    // await ReportReason.bulkCreate([
    //     { reason: 'Explotación infantil', severity: 10 },
    //     { reason: 'Amenazas o violencia', severity: 9 },
    //     { reason: 'Organizaciones extremistas o peligrosas', severity: 9 },
    //     { reason: 'Incitación al odio', severity: 8 },
    //     { reason: 'Contenido sexual', severity: 8 },
    //     { reason: 'Fraude o estafa', severity: 8 },
    //     { reason: 'Acoso', severity: 7 },
    //     { reason: 'Autolesiones', severity: 7 },
    //     { reason: 'Productos y servicios ilegales', severity: 7 },
    //     { reason: 'Contenido explícito', severity: 6 },
    //     { reason: 'Desinformación', severity: 3 },
    //     { reason: 'Mensaje no deseado (spam)', severity: 3 },
    //     { reason: 'Cuenta falsa', severity: 3 },
    //     { reason: 'Infracción', severity: 2 },
    // ])

}