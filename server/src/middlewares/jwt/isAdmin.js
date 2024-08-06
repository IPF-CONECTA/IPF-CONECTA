import jwt from "jsonwebtoken";
import { User } from "../../modules/users/userModel.js";
import { ALL_ROLES } from "../../constant/roles.js";

export const isAdmin = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log('Authorization Header recibido:', token);

        if (!token) throw new Error('Inicie sesion para continuar');

        token = token.split(' ')[1];
        token = token.replace(/"/g, '');
        console.log('Token extraído:', token);

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            console.log('Token decodificado:', decoded);
        } catch (err) {
            console.error('Error al verificar el token:', err);
            throw new Error('Token inválido o expirado');
        }

        const { userId } = decoded;
        console.log('ID de usuario:', userId);

        const user = await User.findByPk(userId);
        if (!user) throw new Error('No se encontro el usuario, vuelva a iniciar sesion');
        console.log('Usuario encontrado:', user);

        if (user.roleId !== ALL_ROLES.admin) {
            throw new Error('No tiene permisos para realizar esta accion');
        }

        console.log('Permisos verificados, es administrador');
        next();
    } catch (error) {
        console.error('Error en isAdmin middleware:', error.message);
        res.status(401).json({ message: error.message });
    }
};