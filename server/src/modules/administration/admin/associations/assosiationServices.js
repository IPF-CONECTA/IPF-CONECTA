import { Profile } from "../../../profile/profileModel.js";
import { Association } from "../../../recruiters/associations/associationModel.js";
import { CompanyIndustry } from "../../../recruiters/companies/companyIndustry/companyIndustryModel.js";
import { Company } from "../../../recruiters/companies/companyModel.js";
import { CompanyUbication } from "../../../recruiters/companies/companyUbication/companyUbicationModel.js";
import { City } from "../../../ubications/models/cityModel.js";
import { Country } from "../../../ubications/models/countryModel.js";
import { State } from "../../../ubications/models/stateModel.js";
import { User } from "../../../users/userModel.js";

export const getAssociations = async (status) => {
  try {
    const associations = await Association.findAll({
      where: { status: status },
      attributes: ["id", "status", "message"],
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: ["id", "names", "surnames", "profilePic"],
          include: {
            model: User,
            attributes: ['email', 'username']
          }
        },
        {
          model: Company,
          as: "company",
          attributes: ["id", "name", "logoUrl"],
        },
      ],
    });
    return associations;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAssociationById = async (id) => {
  try {
    const association = await Association.findByPk(id, {
      where: { status: "Pendiente" },
      attributes: ["id", "message", "status"],
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: ["id", "profilePic", "names", "surnames",],
          include: {
            model: User,
            attributes: ['email', 'username']
          }
        },
        {
          model: Company,
          as: "company",
          attributes: [
            "id",
            "logoUrl",
            "name",
            "description",
            "industryId",
            "webUrl",
            "cantEmployees",
            "countryOriginId",
          ],
          include: [
            {
              model: CompanyIndustry,
              attributes: ["name"],
            },
            {
              model: Country,
              attributes: ["name", "emoji", "id"],
            },
            {
              model: CompanyUbication,
              include: [{
                model: Country,
                attributes: ["name", "emoji"],
              },
              {
                model: State,
                attributes: ["name"],
              },
              {
                model: City,
                attributes: ["name"],
              }]
            }
          ],
        },
      ],
    });
    if (!association) throw new Error("No se encontro la verificacion");
    return association;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateAssociation = async (id, status, justification) => {
  try {
    const isApprovedAssociation = await Association.findByPk(id);
    if (!isApprovedAssociation) throw new Error("No se encontro la asociacion");
    if (isApprovedAssociation.status == "Aprobada")
      throw new Error("La asociacion ya fue aprobada");
    const updatedAssociation = await Association.update(
      { status, justification },
      { where: { id } }
    );
    const updatedCompany = await Company.update(
      { status },
      { where: { id: isApprovedAssociation.companyId } }
    );
    if (updatedAssociation[0] === 0 && updatedCompany[0] === 0)
      throw new Error("Actualización fallida o verificación no encontrada");
    return updatedAssociation;
  } catch (error) {
    throw new Error(error.message);
  }
};
