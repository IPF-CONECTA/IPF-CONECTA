import jwt from "jsonwebtoken";
import { ALL_ROLES } from "../../constant/roles"
import { User } from "../../modules/users/userModel"


export const isRecruiter = async (req, res, next) => {
    const { token } = req.headers
    if (!token) throw new Error('Inicie sesion para continuar')
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    const user = await User.findByPk(userId)
    if (user.roleId !== ALL_ROLES.recruiter) {
        throw new Error('No tiene permisos para realizar esta accion')
    }
    next()
}
