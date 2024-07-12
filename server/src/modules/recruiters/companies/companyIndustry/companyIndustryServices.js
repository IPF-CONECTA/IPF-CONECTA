import { CompanyIndustry } from "./companyIndustryModel.js";

export const getIndustriesSvc = async () => {
  try {
    const industries = await CompanyIndustry.findAll();
    return industries;
  } catch (error) {
    throw new Error(error.message);
  }
};
