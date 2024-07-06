import { User } from "../users/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BASIC_ROLES } from "../../constant/roles.js";
import { sendRecoverPasswordEmail } from "./mailServices/recoverPassMail.js";
import { generateVerificationCode } from "../../helpers/generateCode.js";
import { sendConfirmAccount } from "./mailServices/confirmAccount.js";
export const authSignUpSvc = async (user) => {

    try {
        const existingUser = await User.findOne({ where: { email: user.email } });

        if (existingUser) { throw new Error('El usuario ya existe en nuestro sistema.'); }

        const roleId = BASIC_ROLES[user.role];
        if (!roleId) { throw new Error('Rol no valido'); }

        const createdUser = await User.create({
            names: user.names,
            surnames: user.surnames,
            email: user.email,
            roleId: roleId,
            password: user.password,
            cuil: user.cuil,
            state: 1
        })
        const token = jwt.sign({ userId: createdUser.id }, process.env.TOKEN_SECRET_KEY);
        await sendConfirmAccountSvc(createdUser.id)
        return token

    } catch (error) {
        throw new Error(


            error.message)
    }
};

// WORK IN PROCESS
export const authLogInSvc = async (user) => {
    try {
        const existingUser = await User.findOne({ where: { email: user.email } })
        if (!existingUser) {
            throw new Error('No se encontro una cuenta con ese email')
        }
        const validPassword = await bcrypt.compare(user.password, existingUser.password);
        if (!validPassword) throw new Error("Contraseña incorrecta");

        const token = jwt.sign({ userId: existingUser.id }, process.env.TOKEN_SECRET_KEY);

        return { token, name: existingUser.names }

    } catch (error) {
        throw new Error(error.message)
    }
}

export const sendConfirmAccountSvc = async (userId) => {
    try {
        const newVerifyCode = generateVerificationCode()
        await User.update({ verifyCode: newVerifyCode }, { where: { id: userId } })
        const { verifyCode, email, names, verified } = await User.findByPk(userId);
        if (verified == true) {
            throw new Error('Correo ya verificado')
        }
        if (!verifyCode || !email || !names) {
            throw new Error('Error interno en el servidor, inicie sesion nuevamente')
        }
        await sendConfirmAccount(email, verifyCode, names)
    } catch (error) {
        throw new Error(error.message)
    }
}


export const confirmAccountSvc = async (userId, receivedCode) => {
    try {
        const { verified, verifyCode } = await User.findByPk(userId);


        if (verified == true) {
            throw new Error('Correo ya verificado')
        }
        else if (verifyCode !== receivedCode) {
            throw new Error('Codigo incorrecto')
        }

        await User.update({ verified: true, verifyCode: null }, { where: { id: userId } });

    } catch (error) {
        throw new Error(error.message)
    }
}

export const sendRecoverPasswordSvc = async (email) => {
    try {
        const { names, id } = await User.findOne({ where: { email: email } })
        if (!id) {
            throw new Error('No se encontro una cuenta con ese correo electronico')
        }
        const newVerifyCode = generateVerificationCode()
        await User.update({ verifyCode: newVerifyCode }, { where: { email: email } })

        const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET_KEY);
        await sendRecoverPasswordEmail(email, newVerifyCode, names)
        return token
    } catch (error) {
        throw new Error(error)
    }
}

export const recoverPasswordSvc = async (email, receivedCode, newPass) => {
    const { verifyCode } = await User.findOne({ where: { email: email } })

    if (verifyCode !== receivedCode) {
        throw new Error('El codigo ingresado es incorrecto')
    }
    const passhash = await bcrypt.hash(newPass, 10);

    try {
        User.update({ password: passhash, verifyCode: null }, { where: { email: email, verifyCode: verifyCode } })
    } catch (error) {
        throw new Error(error)
    }

}