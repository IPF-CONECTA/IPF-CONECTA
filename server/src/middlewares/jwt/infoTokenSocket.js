import { verifyToken } from "../../helpers/verifyToken.js";

import jwt from "jsonwebtoken";
import { getUserById } from "../../modules/users/userServices.js";

export const socketHandShake = async (socket, next) => {
  try {
    const token = socket.handshake.auth.Authorization;
    console.log(token);
    if (!token) {
      return next(new Error("Inicie sesión primero"));
    }
    const { id } = await verifyToken(token.split(" ")[1]);
    if (!id) {
      return next(new Error("Token inválido"));
    }
    const user = await getUserById(id);
    if (!user) {
      return next(new Error("Usuario no encontrado"));
    }

    socket.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new Error("Token expirado, inicie sesión nuevamente"));
    }
    return next(new Error("No se pudo obtener el usuario"));
  }
};
