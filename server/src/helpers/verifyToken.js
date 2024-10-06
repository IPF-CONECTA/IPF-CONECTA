import jwt from "jsonwebtoken";
import { getUserById } from "../modules/users/userServices.js";

export const verifyToken = async (token) => {
  const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("Error al verificar el token, inicie sesion nuevamente");
  }

  return user;
};
