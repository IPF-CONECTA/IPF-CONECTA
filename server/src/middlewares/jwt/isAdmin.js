import jwt from "jsonwebtoken";
import { User } from "../../modules/users/userModel.js";
import { ALL_ROLES } from "../../constant/roles.js";

export const isAdmin = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) throw new Error('Inicie sesion para continuar');

        token = token.split(' ')[1];
        token = token.replace(/"/g, '');

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        } catch (err) {
            throw new Error('Token inválido o expirado');
        }

        const { userId } = decoded;

        const user = await User.findByPk(userId);
        if (!user) throw new Error('No se encontro el usuario, vuelva a iniciar sesion');

        if (user.roleId !== ALL_ROLES.admin) {
            throw new Error('No tiene permisos para realizar esta accion');
        }

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};