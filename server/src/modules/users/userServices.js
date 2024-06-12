import { User } from './userModel.js'
import { generateVerificationCode } from '../../helpers/generateCode.js'
import { basicRoles } from '../../constant/roles.js';


export const getUsers = async () => {
    const users = await User.findAll()
    return users
}

export const createUser = async (user) => {

    if (!Object.keys(basicRoles).includes(user.role)) { throw new Error('Rol no valido') }

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