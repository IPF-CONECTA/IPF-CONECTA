import jwt from "jsonwebtoken";
import { ALL_ROLES } from "../../constant/roles.js"
import { User } from "../../modules/users/userModel.js"
import { Association } from "../../modules/recruiters/associations/associationModel.js";


export const isRecruiter = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) throw new Error('Inicie sesion para continuar')
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        const { roleId } = await User.findByPk(userId, { attributes: ['roleId'] })

        if (roleId !== ALL_ROLES.recruiter) {
            throw new Error('No tiene permisos para realizar esta accion')
        }
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const isApprovedAssociation = async (req, res, next) => {
    try {
        const { token } = req.headers
        const { companyId } = req.body.jobOffer
        if (!token) throw new Error('Inicie sesion para continuar')
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        const association = Association.findOne({ where: { userId: userId, companyId: companyId } })
        if (!association) throw new Error('No tiene permiso para realizar esta accion')
        if (association.status == 'Rechazada') throw new Error('No tiene permiso para publicar una oferta para esta empresa. Su asociacion con esta fue rechazada.')
        if (association.status == 'Pendiente') throw new Error('No puede publicar ofertas para esta empresa, su asociacion esta siendo revisada.')
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}