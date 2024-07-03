import jwt from "jsonwebtoken";
import { ALL_ROLES } from "../../constant/roles.js"
import { User } from "../../modules/users/userModel.js"

export const isStudent = async (req, res, next) => {
    const { token } = req.headers
    if (!token) throw new Error('Inicie sesion para continuar')
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    const user = await User.findByPk(userId)
    if (user.roleId !== ALL_ROLES.student) {
        throw new Error('No tiene permisos para realizar esta accion')
    }
    next()
}