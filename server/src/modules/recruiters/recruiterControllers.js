import jwt from "jsonwebtoken";
import { User } from "../users/userModel.js";

export const getAllCompaniesCtrl = async (req, res) => {
    try {
        const companies = await getAllCompaniesCtrl()
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
        const message = `¡Gracias por registrarte en IPF-CONECTA, ${names}!

                        Tu vinculación con la compañía está en proceso de verificación.

                        Recibirás un correo electrónico una vez que esta haya sido verificada.

                        Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.

                        Atentamente,
                        El Equipo de IPF-CONECTA
                        `
        res.status(201).json({ status: 'Hecho', title: '¡Registro Exitoso! Tu vinculacion con la empresa en proceso de verificación', message: message })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}





