import { sequelize } from "./db.js";
import { createRelations } from "./relations.js";

import { Job } from "../modules/recruiters/job/jobModel.js";

import { Project } from "../modules/profile/project/projectModel.js";
import { Skillable } from "../modules/skills/skillable/skillableModel.js";

import { Attachment } from "../modules/attachment/attachmentModel.js";
import { Experience } from "../modules/profile/experiences/experiencesModel.js";
import { Profile } from "../modules/profile/profileModel.js";
import { User } from "../modules/users/userModel.js";

import { createLangs } from "../modules/langs/langModel.js";
import { createRoles } from "../modules/roles/roleModel.js";

import { createSkills } from "../modules/skills/skillsModel.js";
import { createCities } from "../modules/locations/models/cityModel.js";
import { createStates } from "../modules/locations/models/stateModel.js";

import { createCountries } from "../modules/locations/models/countryModel.js";
import { createUserStates } from "../modules/profile/states/userStateModel.js";
import { createLangLevels } from "../modules/langs/langLevelsModel.js";
import { createModalities } from "../modules/recruiters/job/jobModalities/modalityModel.js";
import { createDiciplines } from "../modules/profile/education/disciplines/disciplineModel.js";

import { createReportReasons } from "../modules/reports/reasons/reasonModel.js";
import { createContractTypes } from "../modules/recruiters/job/contractTypes/contractTypeModel.js";
import { createCompanyIndustry } from "../modules/recruiters/companies/companyIndustry/companyIndustryModel.js";
import { createInstitutes } from "../modules/profile/education/institutes/instituteModel.js";
import { Education } from "../modules/profile/education/educationModel.js";
import { Report } from "../modules/reports/reportModel.js";
import { Idea } from "../modules/ideas/ideaModel.js";

export const createTablesAndRelations = async () => {
  console.time("Db created in:");
  // await sequelize.sync({ force: true })
  await createRelations();
  console.log("Relations created successfully");
  console.log("Tables created successfully");
  // await User.sync({ force: true });
  // ===================================================================================
  // || COMENTAR LO DE ABAJO UNA VEZ IMPORTADAS LAS TABLAS Y CAMBIAR { force: false } ||
  // // ===================================================================================
  // await Report.sync({ force: false });
  // await Experience.sync({ force: true });
  // await Attachment.sync({ force: true });
  // // await createRoles();
  // await createUserStates();
  // await createLangLevels();
  // await createSkills();
  // await createReportReasons();
  // await createLangs();
  // await createCountries();
  // await createDiciplines();
  // await createStates();
  // await createCities();
  // await createContractTypes();
  // await createCompanyIndustry();
  // await createModalities();
  // await createInstitutes();
  console.log("Data created successfully");
  console.timeEnd("Db created in:");
};
