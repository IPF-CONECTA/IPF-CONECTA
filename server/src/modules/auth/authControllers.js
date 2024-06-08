import { authSignUp, sendVerifyCode, verifyAccount } from "./authServices.js";
import jwt from "jsonwebtoken";
export const authSignUpController = async (req, res) => {
    const { user } = req.body;
    try {
        const token = await authSignUp(user)
        res.status(201).json({ message: 'Usuario registrado con exito', token })
    } catch (error) {
        if (error.message.includes("El usuario ya existe")) {
            res.status(400).json({ message: error.message });
        } else if (error.message.includes("Rol no valido")) {
            res.status(400).json({ message: error.message });
        } else {
            console.log(error.message)
            res.status(500).json({ message: "Hubo un error en el servidor." + error.message });
        }
    }
};
``
export const verifyAccountController = async (req, res) => {
    const { recibedCode } = req.body;
    const { token } = req.headers
    try {
        if (!token) {
            throw new Error('Inicie sesion para confirmar el correo')
        }
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        await verifyAccount(userId, recibedCode)
        res.status(201).json({ message: 'Cuenta confirmada exitosamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const sendEmailVerificationController = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) {
            throw new Error('Inicie sesion para confirmar el correo')
        }
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        await sendVerifyCode(userId)
        res.status(200).json({ message: 'Correo de verificacion enviado correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}