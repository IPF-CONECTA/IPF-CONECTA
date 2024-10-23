import jwt from "jsonwebtoken";
import { validate as isValidUUID } from "uuid";

import { Profile } from "../../profile/profileModel.js";
import upload from "../../../config/multerConfig.js";
import { Company } from "./companyModel.js";
import { sendContactCompany } from "./mailServices/contactCompany.js";
import { associateNewCompanySvc } from "../associations/associationServices.js";
import {
  findCompaniesSvc,
  getApprovedCompaniesSvc,
} from "./companyServices.js";
import { getCompanyByIdSvc } from "../../administration/admin/companies/companyServices.js";
import { resizeImage } from "../../../helpers/resizeImages.js";

export const sendContactCompanyCtrl = async (req, res) => {
  const { from, name, subject, message } = req.body;
  try {
    await sendContactCompany(from, name, subject, message);
    return res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApprovedCompaniesCtrl = async (req, res) => {
  try {
    const companies = await getApprovedCompaniesSvc();
    if (companies.length === 0) {
      return res.status(404).json({ message: "No se encontraron empresas" });
    }
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const associateNewCompanyCtrl = async (req, res) => {
  try {
    const { id } = req.user.profile;
    const { company, message } = req.body;
    const profile = await Profile.findByPk(id, { attributes: ["names"] });
    if (!profile) throw new Error("Usuario no encontrado");
    if (
      !company ||
      !company.name ||
      !company.industryId ||
      !company.description ||
      !company.cantEmployees ||
      !company.countryOriginId
    ) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }
    const logoUrl = req.file ? await resizeImage(req.file.filename, "logoUrls", 200, 200) : null;
    const association = await associateNewCompanySvc(message, id, {
      ...company,
      logoUrl,
    });

    if (!association) throw new Error("Error al asociar la empresa");
    res.status(201).json({ message: "Empresa asociada correctamente", id: association });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findCompanyCtrl = async (req, res) => {
  let { company } = req.query;
  if (!company) company = "";
  try {
    const companies = await findCompaniesSvc(company);
    if (companies.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron empresas para tu búsqueda" });
    }
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyByIdCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidUUID(id)) throw new Error("ID inválido");

    const company = await getCompanyByIdSvc(id);
    if (!company) {
      return res.status(404).json({ message: "No se encontró la empresa" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};
