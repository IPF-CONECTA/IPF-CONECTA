import { Association } from "./associationModel.js";
import { createCompany } from "../companies/companyServices.js";
import { Company } from "../companies/companyModel.js";
import { Country } from "../../locations/models/countryModel.js";
import { State } from "../../locations/models/stateModel.js";
import { CompanyIndustry } from "../companies/companyIndustry/companyIndustryModel.js";

export const createAssociation = async (profileId, companyId, message) => {
  console.log(companyId);
  try {
    const association = await Association.create({
      profileId,
      companyId: companyId.id,
      message,
    });
    return association;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const associateNewCompanySvc = async (message, profileId, company) => {
  try {
    const newCompany = await createCompany(company);
    const association = await Association.create({
      profileId,
      companyId: newCompany.id,
      message,
    });
    return newCompany.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getApprovedAssociationsByUser = async (profileId) => {
  try {
    const associations = await Association.findAll({
      where: {
        profileId: profileId,
      },
      include: [
        {
          model: Company,
          as: "company",
          include: [
            {
              model: Country,
            },
            {
              model: CompanyIndustry,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    return associations;
  } catch (error) {
    throw error;
  }
};
