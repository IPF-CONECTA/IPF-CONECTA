import { sequelize } from "./db.js"
import { Role } from "../modules/roles/roleModel.js";
import { User } from "../modules/users/userModel.js";
import { Post } from "../modules/posts/postModel.js";
import { Like } from "../modules/likes/likeModel.js";
import { Report } from "../modules/reports/reportModel.js";
import { ReportReason } from "../modules/reports/reportReasonModel.js";
import { Follower } from "../modules/followers/followerModel.js";
import { Country } from "../modules/ubications/models/countryModel.js";
import { State } from "../modules/ubications/models/stateModel.js";
import { City } from "../modules/ubications/models/cityModel.js";
export const createTablesAndRelations = async () => {
    await sequelize.sync({ force: false })
    console.log('Tables created successfully')

    // await Role.bulkCreate([
    // { name: 'superAdmin' },
    // { name: 'admin' },
    // { name: 'student' },
    // { name: 'recruiter' },
    // { name: 'investor' }
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