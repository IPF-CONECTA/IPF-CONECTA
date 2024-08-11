import jwt from "jsonwebtoken";
import { User } from "../../modules/users/userModel.js";
import { getUserById } from "../../modules/users/userServices.js";

export const isVerifiedAccount = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error("Inicie sesion para continuar");
    token = token.split(" ")[1];
    console.log(token);
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const verified = await User.findByPk(userId, {
      attributes: ["verified"],
    });
    console.log(verified);
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
        let token = req.headers.authorization
        console.log(req.headers.authorization)
        if (!token) {
            console.log('NO ES USUARIO HABILITADO -================================================')
            console.log(token)
            throw new Error('Inicie sesion para continuar')
        }

        token = token.split(' ')[1]

        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        const isUser = await getUserById(userId)
        if (!isUser) {
            throw new Error('Error al verificar el token, inicie sesion nuevamente')
        }
        console.log('SI ES USUARIO HABILITADO')
        req.user = isUser
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
    req.user = isUser;
    console.log("--------PASO VALIDACIÖN IS TOKEN ----------");
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      return res.status(401).json({ message: "Inicie sesion para continuar" });
    }
    res.status(401).json({ message: error.message });
  }
};
