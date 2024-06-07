import { User } from "../users/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { basicRoles } from "../../constant/roles.js";
export const authSignUp = async (user) => {

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
export const authLogIn = async (user) => {
    try {
        const existingUser = await User.findOne({ where: { email: user.email } })
        if (!existingUser) {
            existingUser = await User.findOne({ where: {} })
        }
    } catch (error) {

    }
}


export const verifyAccount = async (userId, recibedCode) => {
    try {
        const user = await User.findByPk(userId);
        if (user.verified == true) {
            throw new Error('Correo ya verificado')
        }
        else if (user.verifyCode !== recibedCode) {
            throw new Error('Codigo incorrecto')
        }
        else {

            await User.update({ verified: true }, { where: { id: userId } });
        }
    } catch (error) {
        throw new Error(error.message)
    }
}