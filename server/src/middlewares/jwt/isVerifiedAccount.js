import jwt from "jsonwebtoken";
import { User } from "../../modules/users/userModel.js";
import { getUserById } from "../../modules/users/userServices.js";
import { verifyToken } from "../../helpers/verifyToken.js";

export const isVerifiedAccount = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error("Inicie sesion para continuar");
    token = token.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const verified = await User.findByPk(userId, {
      attributes: ["verified"],
    });
    if (!verified) {
      throw new Error("Confirme su correo electronico para continuar");
    }
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res.status(401).json({ message: "Inicie sesion para continuar" });
    }
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
};
export const isToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
   
    if (!token) {
      throw new Error("Inicie sesion para continuar");
    }

    token = token.split(" ")[1];
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.message === "jwt malformed") {
      console.log({ errrrrrrrrrrrrrrrrrrrrrrror: error });
      return res.status(401).json({ message: "Inicie sesion para continuar" });
    }
    res.status(401).json({ message: error.message });
  }
};
