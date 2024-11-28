import { sequelize } from "./db.js";
import { createRelations } from "./relations.js";

import { Job } from "../modules/recruiters/job/jobModel.js";

import { Project } from "../modules/profile/project/projectModel.js";
import { Skillable } from "../modules/skills/skillable/skillableModel.js";

import { Attachment } from "../modules/attachment/attachmentModel.js";
import { Experience } from "../modules/profile/experiences/experiencesModel.js";

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

import { createReportReasons } from "../modules/reports/reportReasonModel.js";
import { createContractTypes } from "../modules/recruiters/job/contractTypes/contractTypeModel.js";
import { createCompanyIndustry } from "../modules/recruiters/companies/companyIndustry/companyIndustryModel.js";
import { createInstitutes } from "../modules/profile/education/institutes/instituteModel.js";
import { Education } from "../modules/profile/education/educationModel.js";

export const createTablesAndRelations = async () => {
  console.time("Db created in:");
  // await sequelize.sync({ force: true })
  await createRelations();
  console.log("Relations created successfully");
  // await sequelize.sync({ force: false });
  // await Experience.sync({ force: true })
  console.log("Tables created successfully");
  // ===================================================================================
  // || COMENTAR LO DE ABAJO UNA VEZ IMPORTADAS LAS TABLAS Y CAMBIAR { force: false } ||
  // // ===================================================================================
  // await Attachment.sync({ force: true });
  // await createRoles();
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
  // await createInstitutes()
  console.log("Data created successfully");
  console.timeEnd("Db created in:");
};
