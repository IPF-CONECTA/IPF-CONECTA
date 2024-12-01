import jwt from "jsonwebtoken";
import {
  authIsEmailAvailableSvc,
  authIsUsernameAvailableSvc,
  authLogInSvc,
  authSignUpSvc,
  confirmAccountSvc,
  recoverPasswordSvc,
  sendConfirmAccountSvc,
  sendRecoverPasswordSvc,
} from "./authServices.js";
import bcrypt from "bcryptjs";
import { BASIC_ROLES } from "../../constant/roles.js";

export const authSignUpCtrl = async (req, res) => {
  const { user } = req.body;
  try {
    if (!Object.keys(BASIC_ROLES).includes(user.role)) { throw new Error('Rol no valido') }



    if (user.role !== "student") {
      user.cuil = null;
    }

    user.password = await bcrypt.hash(user.password, 10);

    const token = await authSignUpSvc(user);

    res.status(201).json({
      message:
        "Por favor, verifique su cuenta con el código que se ha enviado a su correo",
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const authIsEmailAvailableCtrl = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json();
    const isEmail = await authIsEmailAvailableSvc(email);
    if (!isEmail) return res.status(200).json();
    res.status(409).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
export const authIsUsernameAvailableCtrl = async (req, res) => {
  const { username } = req.body;
  try {
    if (!username) return res.status(400).json();
    const isUsername = await authIsUsernameAvailableSvc(username);
    if (!isUsername) return res.status(200).json();
    res.status(409).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
export const authLogInCtrl = async (req, res) => {
  const { user } = req.body;
  try {
    const response = await authLogInSvc(user);
    if (!response.token) {
      throw new Error("No se pudo iniciar sesión");
    }
    res.status(200).json({
      message: `¡Bienvenido/a, ${response.existingUser.profile.names}!`,
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const confirmAccountCtrl = async (req, res) => {
  const { receivedCode } = req.body;
  const { id } = req.user;
  try {
    if (!receivedCode) {
      throw new Error("Ingrese el código de verificación");
    }

    const data = await confirmAccountSvc(id, receivedCode);
    res.status(201).json({ message: "Cuenta confirmada exitosamente", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendConfirmAccountCtrl = async (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  try {
    if (!token) {
      throw new Error("Inicie sesión para confirmar el correo");
    }
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    await sendConfirmAccountSvc(userId);
    res
      .status(200)
      .json({ message: "Correo de verificación enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendRecoverPasswordCtrl = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new Error({
      message: "Ingrese un correo electrónico para recuperar su contraseña",
    });
  }
  try {
    const token = await sendRecoverPasswordSvc(email);
    res.status(200).json({
      message:
        "El correo fue enviado con éxito. Verifique su bandeja de entrada",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recoverPasswordCtrl = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    if (!token) {
      throw new Error(
        "Vuelva a recuperar su contraseña con su correo. Si el problema persiste, contacte al administrador"
      );
    }
    const { email } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const { receivedCode, newPass, newPassConfirm } = req.body;
    if (!receivedCode || !newPass || !newPass) {
      throw new Error("Ingrese los datos necesarios para continuar");
    } else if (newPass !== newPassConfirm) {
      throw new Error("Las contraseñas no coinciden");
    }
    await recoverPasswordSvc(email, receivedCode, newPass, newPassConfirm);
    res.status(201).json({ message: "Contraseña modificada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const existingUser = req.user;
  const token = jwt.sign(
    { userId: existingUser.id },
    process.env.TOKEN_SECRET_KEY
  );
  return res.status(200).json({ existingUser, token });
};
