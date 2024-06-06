import { User } from './userModel.js'
import { generateUUID } from '../../helpers/generateUUID.js'
import { generateVerificationCode } from '../../helpers/generateCode.js'
import { v4 } from 'uuid';

export const getUsers = async () => {

    const users = await User.findAll()
    return users

}

export const createUser = async (user) => {

    const roles = {
        'recruiter': 'ca5a1c39-8169-4665-9486-b9f756633d32',
        'student': '4e13ae18-f8aa-44aa-a27f-edb337554219',
        'admin': '4a7481a6-39ce-4c74-ab1c-8d643e7e85d8',
        'superAdmin': 'd961a013-6b45-4481-8a45-bc20116ed75a',
        'investor': 'f17613bc-ed5f-4d2d-bc72-f018ac830d06'
    }

    if (!Object.keys(roles).includes(user.role)) {
        throw new Error('Rol no valido')
    }

    const roleId = roles[user.role];
    user = {
        names: user.names,
        surnames: user.surnames,
        roleId: roleId,
        password: user.password,
        email: user.email,
        verifyCode: generateVerificationCode(),
    }
    return User.create(user)

}