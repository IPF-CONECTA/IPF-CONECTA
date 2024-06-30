import { User } from './userModel.js'
import { generateVerificationCode } from '../../helpers/generateCode.js'
import { ALL_ROLES } from '../../constant/roles.js';


export const getUsers = async () => {
    const users = await User.findAll()
    return users
}

export const getUserById = async (id) => {
    const user = await User.findByPk(id)
    return user
}

export const createUser = async (user) => {

    if (!Object.keys(ALL_ROLES).includes(user.role)) { throw new Error('Rol no valido') }

    const roleId = roles[user.role];
    user = {
        names: user.names,
        surnames: user.surnames,
        roleId: roleId,
        password: user.password,
        email: user.email,
        userState: 'none'
    }
    return User.create(user)

}
