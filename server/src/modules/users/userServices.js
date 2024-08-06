import { User } from './userModel.js'
import { ALL_ROLES } from '../../constant/roles.js';
import bcrypt from 'bcryptjs'

export const getUsers = async () => {
    const users = await User.findAll()
    return users
}

export const getUserById = async (id) => {
    const user = await User.findByPk(id)
    return user
}

export const createUser = async (user) => {
    try {
        const roleId = ALL_ROLES[user.role];
        const hashpass = await bcrypt.hash(user.password, 10)

        user = {
            names: user.names,
            surnames: user.surnames,
            roleId: roleId,
            password: hashpass,
            email: user.email,
            userStateId: 1
        }

        const existingUser = await User.findOne({ where: { email: user.email } });

        if (existingUser) { throw new Error('El usuario ya existe en nuestro sistema.'); }
        return User.create(user)
    } catch (error) {
        console.log(error)
    }

}
