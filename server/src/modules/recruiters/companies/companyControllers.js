import { sendContactCompany } from "./mailServices/contactCompany.js";
import jwt from 'jsonwebtoken'
import { associateNewCompanySvc } from "../associations/associationServices.js";
import { User } from "../../users/userModel.js";
import { findCompaniesSvc, getApprovedCompaniesSvc } from "./companyServices.js";
import { getCompanyByIdSvc } from "../../administration/admin/companies/companyServices.js";
import { validate as isValidUUID } from 'uuid';

export const sendContactCompanyCtrl = async (req, res) => {
    const { from, name, subject, message } = req.body;
    try {
        await sendContactCompany(from, name, subject, message)
        return res.status(200).json({ message: 'Correo enviado correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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
        const { token } = req.headers
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
    const { query } = req.params
    if (!query) query = ''
    try {
        const companies = await findCompaniesSvc(query)
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