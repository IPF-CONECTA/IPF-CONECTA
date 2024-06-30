import { sequelize } from "./db.js"
import { Role } from "../modules/roles/roleModel.js";
import { User } from "../modules/users/userModel.js";
import { Post } from "../modules/posts/postModel.js";
import { Like } from "../modules/likes/likeModel.js";
import { Report } from "../modules/reports/reportModel.js";
import { ReportReason } from "../modules/reports/reportReasonModel.js";
import { Follower } from "../modules/followers/followerModel.js";
import { Country } from "../modules/ubications/models/countryModel.js";
import { City } from "../modules/ubications/models/cityModel.js";
import { Skill } from "../modules/skills/skillsModel.js";
import { UserState } from "../modules/users/states/userStateModel.js";
import { LangLevel } from "../modules/langs/langLevelsModel.js";
import { Lang } from "../modules/langs/langModel.js";
import { State } from "../modules/ubications/models/stateModel.js";
import { CompanySector } from "../modules/recruiters/companies/companySectors/companySectorsModel.js";
import { Company } from "../modules/recruiters/companies/companyModel.js";
import { Association } from "../modules/recruiters/associations/associationModel.js";

export const createRelations = async () => {
    Role.hasMany(User, {
        foreignKey: 'roleId',
    });
    User.belongsTo(Role, {
        foreignKey: 'roleId'
    });
    User.hasMany(Post, {
        foreignKey: 'userId',
    });
    User.hasMany(Association, {
        foreignKey: 'userId',
    });

}