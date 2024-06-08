import { User } from "../users/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { basicRoles } from "../../constant/roles.js";
import { sendRecoverPasswordEmail } from "./mailServices/recoverPassMail.js";
import { generateVerificationCode } from "../../helpers/generateCode.js";
import { sendConfirmAccount } from "./mailServices/confirmAccount.js";
export const authSignUpSvc = async (user) => {

    try {
        const existingUser = await User.findOne({ where: { email: user.email } });

        if (existingUser) { throw new Error('El usuario ya existe en nuestro sistema.'); }



        if (!Object.keys(basicRoles).includes(user.role)) { throw new Error('Rol no valido') }

        const roleId = basicRoles[user.role];
        const passhash = await bcrypt.hash(user.password, 10);

        const createdUser = await User.create({
            names: user.names,
            surnames: user.surnames,
            email: user.email,
            roleId: roleId,
            password: passhash,
        })
        const token = jwt.sign({ userId: createdUser.id }, process.env.TOKEN_SECRET_KEY);

        return token

    } catch (error) {
        throw new Error("Hubo un error: " + error.message)
    }
};

// WORK IN PROCESS
export const authLogInSvc = async (user) => {
    try {
        const existingUser = await User.findOne({ where: { email: user.email } })
        if (!existingUser) {
            existingUser = await User.findOne({ where: {} })
        }
    } catch (error) {

    }
}

export const sendConfirmAccountSvc = async (userId) => {
    try {
        const { verifyCode, email, names } = await User.findByPk(userId);
        sendConfirmAccount(email, verifyCode, names)
    } catch (error) {
        throw new Error(error.message)
    }
}


export const confirmAccountSvc = async (userId, recibedCode) => {
    try {
        const { verified, verifyCode } = await User.findByPk(userId);


        if (verified == true) {
            throw new Error('Correo ya verificado')
        }
        else if (verifyCode !== recibedCode) {
            throw new Error('Codigo incorrecto')
        }
        else {
            await User.update({ verified: true, verifyCode: null }, { where: { id: userId } });
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const sendRecoverPasswordSvc = async (email) => {
    try {
        const existingAccount = await User.findOne({ where: { email: email } })
        if (!existingAccount) {
            throw new Error('No se encontro una cuenta con ese correo electronico')
        }
        else {
            const { email, verifyCode, names } = existingAccount
            if (verifyCode == null) {
                verifyCode = generateVerificationCode()
                console.log(verifyCode)
                await User.update({ verifyCode: verifyCode }, { where: { email: email } })
            }
            await sendRecoverPasswordEmail(email, verifyCode, names)
        }
    } catch (error) {
        throw new Error(error)
    }
}