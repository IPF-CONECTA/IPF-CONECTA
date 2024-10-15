import { sequelize } from "./db.js";
import { createRoles } from "../modules/roles/roleModel.js";
import { User } from "../modules/users/userModel.js";
import { Post } from "../modules/posts/postModel.js";
import { Like } from "../modules/posts/likes/likeModel.js";
import { Report } from "../modules/reports/reportModel.js";
import {
  ReportReason,
  createReportReasons,
} from "../modules/reports/reportReasonModel.js";
import { Follower } from "../modules/followers/followerModel.js";
import { Job } from "../modules/recruiters/job/jobModel.js";
import { JobSkills } from "../modules/recruiters/job/jobSkills/jobSkillsModel.js";
import {
  Country,
  createCountries,
} from "../modules/ubications/models/countryModel.js";
import { City, createCities } from "../modules/ubications/models/cityModel.js";
import { Skill, createSkills } from "../modules/skills/skillsModel.js";
import {
  UserState,
  createUserStates,
} from "../modules/users/states/userStateModel.js";
import {
  LangLevel,
  createLangLevels,
} from "../modules/langs/langLevelsModel.js";
import { Lang, createLangs } from "../modules/langs/langModel.js";
import {
  State,
  createStates,
} from "../modules/ubications/models/stateModel.js";
import {
  CompanyIndustry,
  createCompanyIndustry,
} from "../modules/recruiters/companies/companyIndustry/companyIndustryModel.js";
import { Company } from "../modules/recruiters/companies/companyModel.js";
import {
  ContractType,
  createContractTypes,
} from "../modules/recruiters/job/contractTypes/contractTypeModel.js";
import { createRelations } from "./relations.js";
import {
  Modality,
  createModalities,
} from "../modules/recruiters/job/jobModalities/modalityModel.js";
import { Repost } from "../modules/posts/reposts/repostModel.js";
import { WorkExperience } from "../modules/users/workExperiences/experiencesModel.js";
import { Project } from "../modules/users/project/projectModel.js";
import { Idea } from "../modules/ideas/ideaModel.js";
import { LangsUser } from "../modules/users/langs_user/langsUserModel.js";
export const createTablesAndRelations = async () => {
  console.time("Db created in:");
  await createRelations();
  console.log("Relations created successfully");
  await sequelize.sync({ force: false });
  await Project.sync({ force: true })
  console.log("Tables created successfully");

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
  // await createContractTypes();
  // await createCompanyIndustry();
  // await createModalities();

  console.log("Data created successfully");
  console.timeEnd("Db created in:");
};
