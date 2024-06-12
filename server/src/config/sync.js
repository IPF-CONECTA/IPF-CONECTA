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
export const createTablesAndRelations = async () => {
    await sequelize.sync({ force: false })
    console.log('Tables created successfully')
    // await createUserStates()
    // await createLangLevels()
    // await createRoles()
    // await createSkills()
    // await createReportReasons()
    // await createLangs()
    // await createCountries()
    // await createStates()
    // await createCities()
}