import { Op } from "sequelize";
import {
  getAllLocations,
  getLocation,
  getLocationType,
} from "../../../helpers/getLocationType.js";
import { CompanyIndustry } from "./companyIndustry/companyIndustryModel.js";
import { Company } from "./companyModel.js";
import { Profile } from "../../profile/profileModel.js";

export const getApprovedCompaniesSvc = async () => {
  try {
    const companies = await Company.findAll({
      where: { status: "Aprobada" },
      attributes: {
        exclude: ["status", "justification", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: CompanyIndustry,
          attributes: ["name"],
        },
      ],
    });
    const enrichedCompanies = getAllLocations(companies);
    return enrichedCompanies;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createCompany = async (company) => {
  try {
    const newCompany = await Company.create({
      name: company.name,
      description: company.description,
      logoUrl: company.logoUrl,
      industryId: company.industryId,
      countryOriginId: company.countryOriginId,
      cantEmployees: company.cantEmployees,
      webUrl: company.webUrl,
    });
    if (!newCompany) throw new Error("No se pudo crear la empresa");
    return newCompany;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateCompany = async (company) => {
  try {
    const updatedCompany = await Company.update(
      {
        name: company.name,
        description: company.description,
        industryId: company.industryId,
        locationId: company.locationId,
        address: company.address,
        logoUrl: company.logoUrl,
        cantEmployees: company.cantEmployees,
      },
      { where: { id: company.id } }
    );
    if (updatedCompany.length < 1)
      throw new Error("No se pudo actualizar la empresa");
    return updatedCompany;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findCompaniesSvc = async (company) => {
  const companies = await Company.findAll({
    where: {
      [Op.or]: [{ name: { [Op.iLike]: `%${company}%` } }],
      status: "Aprobada",
    },
    limit: 6,
    attributes: ["id", "name", "logoUrl"],
  });
  return companies;
};

export const getCompanyByIdSvc = async (id) => {
  try {
    const company = await Company.findByPk(id, {
      attributes: { exclude: ["status", "justification", "updatedAt"] },
      include: [
        {
          model: Association,
          attributes: ["id"],
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: ["id", "profilePic", "names", "surnames", "email"],
            },
          ],
        },
      ],
    });
    return company;
  } catch (error) {
    throw new Error(error.message);
  }
};
