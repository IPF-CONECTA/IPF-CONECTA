import jwt from "jsonwebtoken";
import { getUserById } from "../modules/users/userServices.js";

export const verifyToken = async (token) => {
  const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("Error al verificar el token, inicie sesión nuevamente");
  }
  else if (user.banned) {
    throw new Error("Tu cuenta se encuentra suspendida permanentemente. Revisa la casilla de tu correo electrónico para más información");
  }
  else if (user.suspensionExpires && new Date(user.suspensionExpires) > new Date()) {
    throw new Error(`Tu cuenta se encuentra suspendida temporalmente hasta el ${user.suspensionExpires}. Revisa la casilla de tu correo electrónico para más información`);
  }
  return user;
};
