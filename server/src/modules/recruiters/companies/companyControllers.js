import { sendContactCompany } from "./mailServices/contactCompany.js";
import jwt from 'jsonwebtoken'
import { associateNewCompanySvc } from "../associations/associationServices.js";
import { User } from "../../users/userModel.js";
import { getApprovedCompaniesSvc } from "./companyServices.js";

export const sendContactCompanyCtrl = async (req, res) => {
    const { from, name, subject, message } = req.body;
    try {
        await sendContactCompany(from, name, subject, message)
        res.status(200).json({ message: 'Correo enviado correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getApprovedCompaniesCtrl = async (req, res) => {
    try {
        const companies = await getApprovedCompaniesSvc()
        if (companies.length === 0) {
            res.status(404).json({ message: 'No se encontraron empresas' })
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