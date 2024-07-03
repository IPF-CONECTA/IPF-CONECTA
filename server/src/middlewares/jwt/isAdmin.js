import jwt from "jsonwebtoken";
import { User } from "../../modules/users/userModel.js"
import { ALL_ROLES } from "../../constant/roles.js";

export const isAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) throw new Error('Inicie sesion para continuar')
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        const user = await User.findByPk(userId)
        if (!user) throw new Error('No se encontro el usuario, vuelva a iniciar sesion')
        console.log(user)
        if (user.roleId !== ALL_ROLES.admin) {
            throw new Error('No tiene permisos para realizar esta accion')
        }
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}