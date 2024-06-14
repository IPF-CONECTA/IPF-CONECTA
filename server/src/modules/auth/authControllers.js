import jwt from "jsonwebtoken";
import { authSignUpSvc, confirmAccountSvc, recoverPasswordSvc, sendConfirmAccountSvc, sendRecoverPasswordSvc } from './authServices.js'
import bcrypt from "bcryptjs";
import { BASIC_ROLES } from "../../constant/roles.js";
import { getAllCompanies } from "../recruiters/recruiterServices.js";
import { getUserById } from "../users/userServices.js";


export const authSignUpCtrl = async (req, res) => {
    const { user } = req.body;
    try {
        if (!user.email || !user.password || !user.role) {
            throw new Error('Ingrese los datos necesarios para continuar')
        }


        if (!Object.keys(BASIC_ROLES).includes(user.role)) { throw new Error('Rol no valido') }

        if (user.role == 'student') {
            if (!user.cuil) {
                throw new Error('Ingrese su CUIL')
            }
            else if (user.cuil.length !== 11) {
                throw new Error('El CUIL debe tener 11 digitos')
            }
        }
        else {
            user.cuil = null
        }

        user.password = await bcrypt.hash(user.password, 10);

        const token = await authSignUpSvc(user)

        res.status(201).json({ message: 'Por favor, verifique su cuenta con el codigo que se ha enviado a su correo', token })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};


export const authLogInCtrl = async (req, res) => {
    const { user } = req.body;
    if (!user.email) throw new Error('Ingrese el email para continuar')
    else if (!user.password) throw new Error('Ingrese la contrase')
    try {

        const token = await authLogInCtrl(user)
        res.status(200).json({ message: 'Sesion iniciada correctamente', token })

    } catch (error) {
        res.status(error.status)
    }
}
export const confirmAccountCtrl = async (req, res) => {
    const { receivedCode } = req.body;
    const { token } = req.headers
    try {
        if (!receivedCode) {
            throw new Error('Ingrese el codigo de verificacion')
        }
        if (!token) {
            throw new Error('Inicie sesion para confirmar el correo')
        }
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        await confirmAccountSvc(userId, receivedCode)
        const user = await getUserById(userId)

        switch (user.roleId) {
            case BASIC_ROLES.student:
                if (!user.cuil) throw new Error('Ingrese su CUIL')
                else if (user.cuil.length !== 11) throw new Error('El CUIL debe tener 11 digitos')
                res.status(201).json({ message: 'Cuenta confirmada exitosamente' })
            case BASIC_ROLES.recruiter:
                try {
                    const companies = getAllCompanies()
                    if (companies.length === 0) throw new Error('No se encontraron empresas')
                    res.status(200).json({ message: 'Cuenta confirmada exitosamente', companies })
                } catch (error) {
                    res.status(500).json({ message: error.message })
                }
        }

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
        const token = await sendRecoverPasswordSvc(email)
        res.status(200).json({ message: 'El correo fue enviado con exito. Verifique su bandeja de entrada', token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const recoverPasswordCtrl = async (req, res) => {

    try {
        const { token } = req.headers;
        if (!token) {
            throw new Error('Hubo un error, vuelva a recuperar su contraseña con su correo. Si el problema persiste, contacte al administrador')
        }
        const { email } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        const { receivedCode, newPass, newPassConfirm } = req.body
        if (!receivedCode || !newPass || !newPass) {
            throw new Error('Ingrese los datos necesarios para continuar')
        }
        else if (newPass !== newPassConfirm) {
            throw new Error('Las contraseñas no coinciden')
        }
        await recoverPasswordSvc(email, receivedCode, newPass, newPassConfirm)
        res.status(201).json({ message: 'Contraseña modificada correctamente' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}