import { Association } from "./associationModel.js";
import { createCompany } from "../companies/companyServices.js";
import { Company } from "../companies/companyModel.js";
import { Country } from "../../ubications/models/countryModel.js";
import { State } from "../../ubications/models/stateModel.js";
import { CompanyIndustry } from "../companies/companyIndustry/companyIndustryModel.js";

export const createAssociation = async (userId, companyId, message) => {
    try {
        const association = await Association.create({
            userId,
            companyId,
            message,
        });
        return association;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const associateNewCompanySvc = async (message, userId, company) => {
    try {
        const newCompany = await createCompany(company);
        const association = await Association.create({
            userId,
            companyId: newCompany.id,
            message,
        });
        return association, newCompany.id;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getApprovedAssociationsByUser = async (profileId) => {
    try {
        const associations = await Association.findAll({
            where: {
                userId: profileId,
            },
            include: [{
                model: Company,
                as: 'company',
                include: [{
                    model: Country,
                }, {
                    model: CompanyIndustry,
                    attributes: ['name']
                }]
            }]
        })
        return associations
    } catch (error) {
        throw error
    }
}