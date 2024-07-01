import { Role } from '../modules/roles/roleModel.js'

export const getRoles = async () => {
    const roles = await Role.findAll()
    console.log(roles)
    return {
        'recruiter': 123,
        'student': 123,
        'investor': 123,
        'admin': 123,
        'superAdmin': 123
    }
}
export const getBasicRoles = async () => {
    const roles = await Role.findAll()
    return {
        'recruiter': 123,
        'student': 123,
        'investor': 123,
    }

}

export const ALL_ROLES = await getRoles()
export const BASIC_ROLES = await getBasicRoles()