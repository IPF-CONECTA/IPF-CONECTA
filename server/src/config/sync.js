import { createLangLevels } from "../modules/langs/langLevelsModel.js";
import { createLangs } from "../modules/langs/langModel.js";
import { Project } from "../modules/profile/project/projectModel.js";
import { createUserStates } from "../modules/profile/states/userStateModel.js";
import { createCompanyIndustry } from "../modules/recruiters/companies/companyIndustry/companyIndustryModel.js";
import { createContractTypes } from "../modules/recruiters/job/contractTypes/contractTypeModel.js";
import { createModalities } from "../modules/recruiters/job/jobModalities/modalityModel.js";
import { createReportReasons } from "../modules/reports/reportReasonModel.js";
import { createRoles } from "../modules/roles/roleModel.js";
import { Skillable } from "../modules/skills/skillable/skillableModel.js";
import { createSkills } from "../modules/skills/skillsModel.js";
import { createCities } from "../modules/locations/models/cityModel.js";
import { createCountries } from "../modules/locations/models/countryModel.js";
import { createStates } from "../modules/locations/models/stateModel.js";
import { sequelize } from "./db.js";
import { createRelations } from "./relations.js";
import { Attachment } from "../modules/attachment/attachmentModel.js";

export const createTablesAndRelations = async () => {
  console.time("Db created in:");

  await createRelations();
  console.log("Relations created successfully");
  // await sequelize.sync({ force: true });
  // await Attachment.sync({ force: true })
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
