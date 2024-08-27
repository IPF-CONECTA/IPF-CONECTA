import jwt from "jsonwebtoken";
import { ALL_ROLES } from "../../constant/roles.js"
import { User } from "../../modules/users/userModel.js"

export const isStudent = async (req, res, next) => {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    if (!token) throw new Error('Inicie sesion para continuar')
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    const { roleId } = await User.findByPk(userId, {
        attributes: ['roleId']
    })
    if (roleId !== ALL_ROLES.student) {
        throw new Error('No tiene permisos para realizar esta accion')
    }
    next()
}