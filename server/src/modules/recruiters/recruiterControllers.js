import jwt from "jsonwebtoken";
import { createAssociation } from "./recruiterServices.js";
import { User } from "../users/userModel.js";

export const getAllCompaniesCtrl = async (req, res) => {
    try {
        const companies = await getAllCompanies()
        if (companies.length === 0) {
            res.status(404).json({ message: 'No se encontraron empresas' })
        }
        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const associateExistingCompanyCtrl = async (req, res) => {
    const { token } = req.headers
    if (!token) throw new Error('Inicie sesion para asociar la empresa')
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    const { companyId } = req.body

    try {
        const { names } = await User.findByPk(userId)
        await useCompany(userId, companyId)
        const message = `¡Gracias por registrarte en IPF-CONNECTA, ${names}!

                        Tu cuenta ha sido creada exitosamente y ahora está en proceso de verificación.

                        Recibirás un correo electrónico una vez que tu cuenta haya sido verificada.

                        Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.

                        Atentamente,
                        El Equipo de IPF-CONNECTA
                        `
        res.status(201).json({ status: 'Hecho', title: '¡Registro Exitoso! Tu Cuenta Está en Proceso de Verificación', message: message })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const associateNewCompanyCtrl = async (req, res) => {
    const { token } = req.headers
    if (!token) throw new Error('Inicie sesion para asociar la empresa')
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    const { company } = req.body
    console.log(company)
    try {
        const names = await User.findByPk(userId, { attributes: ['names'] })
        await createAssociation(userId, company)
        const message = `Gracias por registrarte en IPF-CONNECTA, ${names}!
        
                        Tu cuenta ha sido creada exitosamente y ahora está en proceso de verificación.

                        Recibirás un correo electrónico una vez que tu cuenta haya sido verificada.

                        Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.

                        Atentamente,
                        El Equipo de IPF-CONNECTA`
        res.status(201).json({ status: 'Hecho', title: '¡Registro Exitoso! Tu Cuenta Está en Proceso de Verificación', message: message })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}







