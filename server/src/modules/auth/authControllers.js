import jwt from "jsonwebtoken";
import { authSignUpSvc, confirmAccountSvc, recoverPasswordSvc, sendConfirmAccountSvc, sendRecoverPasswordSvc } from './authServices.js'


export const authSignUpCtrl = async (req, res) => {
    const { user } = req.body;
    try {
        const token = await authSignUpSvc(user)
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
export const confirmAccountCtrl = async (req, res) => {
    const { receivedCode } = req.body;
    const { token } = req.headers
    try {
        if (!token) {
            throw new Error('Inicie sesion para confirmar el correo')
        }
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        await confirmAccountSvc(userId, receivedCode)
        res.status(201).json({ message: 'Cuenta confirmada exitosamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const sendConfirmAccountCtrl = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) {
            throw new Error('Inicie sesion para confirmar el correo')
        }
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        await sendConfirmAccountSvc(userId)
        res.status(200).json({ message: 'Correo de verificacion enviado correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const sendRecoverPasswordCtrl = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new Error({ message: 'Ingrese un correo electronico para recuperar su contraseña' })
    }
    try {
        await sendRecoverPasswordSvc(email)
        res.status(200).json({ message: 'El correo fue enviado con exito. Verifique su bandeja de entrada' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error interno en el servidor' })
    }
}

export const recoverPasswordCtrl = async (req, res) => {
    const { token } = req.headers;
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    const { receivedCode, newPass, newPassConfirm } = req.body

    try {
        await recoverPasswordSvc(userId, receivedCode, newPass, newPassConfirm)
        res.status(201).json({ message: 'Contraseña modificada correctamente' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}