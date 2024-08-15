import { sendContactCompany } from "./mailServices/contactCompany.js";
import jwt from 'jsonwebtoken'
import { associateNewCompanySvc } from "../associations/associationServices.js";
import { User } from "../../users/userModel.js";
import { findCompaniesSvc, getApprovedCompaniesSvc } from "./companyServices.js";
import { getCompanyByIdSvc } from "../../administration/admin/companies/companyServices.js";
import { validate as isValidUUID } from 'uuid';

import { Company } from './companyModel.js';
import { upload } from "../../../multerConfig.js";
export const sendContactCompanyCtrl = async (req, res) => {
    const { from, name, subject, message } = req.body;
    try {
        await sendContactCompany(from, name, subject, message)
        return res.status(200).json({ message: 'Correo enviado correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Controlador para subir el logo y crear una empresa
export const uploadCompanyLogo = async (req, res) => {
  try {
    const { name, description, industryId, countryOriginId, cantEmployees } = req.body;

    // Tomar la ruta del logo si se subió
    const logoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newCompany = await Company.create({
      name,
      description,
      industryId,
      countryOriginId,
      cantEmployees,
      logoUrl
    });

    res.status(201).json({ message: "Empresa creada correctamente", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApprovedCompaniesCtrl = async (req, res) => {
    try {
        const companies = await getApprovedCompaniesSvc()
        if (companies.length === 0) {
            return res.status(404).json({ message: 'No se encontraron empresas' })
        }
        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const associateNewCompanyCtrl = async (req, res) => {
    try {
        let token = req.headers.authorization
        token = token.split(' ')[1]
        console.log('Token extraído:', token);
        if (!token) throw new Error('Inicie sesion para asociar la empresa')
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        const { company, message } = req.body
        const { names } = await User.findByPk(userId, { attributes: ['names'] })
        if (!names) throw new Error('Usuario no encontrado')
        const association = await associateNewCompanySvc(message, userId, company)
        if (!association) throw new Error('Error al asociar la empresa')
        res.status(201).json({ message: 'Empresa asociada correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const findCompanyCtrl = async (req, res) => {
    let { company } = req.query
    if (!company) company = ''
    try {
        const companies = await findCompaniesSvc(company)
        if (companies.length == 0) return res.status(404).json({ message: 'No se encontraron trabajos para tu busqueda' })

        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

export const getCompanyByIdCtrl = async (req, res) => {
    try {
        const { id } = req.params
        if (!isValidUUID(id)) throw new Error('Error')
        const company = await getCompanyByIdSvc(id)
        if (!company) return res.status(404).json({ message: 'No se encontró la empresa' })
        res.status(200).json(company)
    } catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor' })
    }
}