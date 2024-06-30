import { sequelize } from "./db.js"
import { Role, createRoles } from "../modules/roles/roleModel.js";
import { User } from "../modules/users/userModel.js";
import { Post } from "../modules/posts/postModel.js";
import { Like } from "../modules/likes/likeModel.js";
import { Report } from "../modules/reports/reportModel.js";
import { ReportReason, createReportReasons } from "../modules/reports/reportReasonModel.js";
import { Follower } from "../modules/followers/followerModel.js";
import { Country, createCountries } from "../modules/ubications/models/countryModel.js";
import { City, createCities } from "../modules/ubications/models/cityModel.js";
import { Skill, createSkills } from "../modules/skills/skillsModel.js";
import { UserState, createUserStates } from "../modules/users/states/userStateModel.js";
import { LangLevel, createLangLevels } from "../modules/langs/langLevelsModel.js";
import { Lang, createLangs } from "../modules/langs/langModel.js";
import { State, createStates } from "../modules/ubications/models/stateModel.js";
import { CompanySector, createCompanySectors } from "../modules/recruiters/companies/companySectors/companySectorsModel.js";
import { Company } from "../modules/recruiters/companies/companyModel.js";
export const createTablesAndRelations = async () => {
    console.time("Db created in:");
    await sequelize.sync({ force: false });
    console.log('Tables created successfully');
    // ===================================================================================
    // || COMENTAR LO DE ABAJO UNA VEZ IMPORTADAS LAS TABLAS Y CAMBIAR { force: false } ||
    // ===================================================================================
    // await createRoles();
    // await createUserStates();
    // await createLangLevels();
    // await createSkills();
    // await createReportReasons();
    // await createLangs();
    // await createCountries();
    // await createStates();
    // await createCities();
    // await createCompanySectors();
    console.log('Data created successfully');
    console.timeEnd("Db created in:");
}
