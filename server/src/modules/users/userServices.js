import { User } from './userModel.js'
import { generateUUID } from '../../helpers/generateUUID.js'
import { generateVerificationCode } from '../../../../src/helpers/generateCode.js'
export const getUsers = async () => {

    const users = await User.findAll()
    if (users.length == 0) {
        throw new Error('No se encontraron usuarios')
    }
    return users

}

export const createUser = async () => {
    const user = {
        id: generateUUID(),
        names: 'Hector Ariel',
        surnames: 'Meyer',
        roleId: '2799532b-9a93-4b8b-b08f-f055ddfae331',
        password: 'hola123',
        verifyCode: generateVerificationCode(),
    }
    return User.create(user)

}