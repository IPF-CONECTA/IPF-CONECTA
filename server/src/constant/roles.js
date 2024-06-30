import { Role } from '../modules/roles/roleModel.js'

export const getRoles = async () => {
    const roles = await Role.findAll()
    console.log(roles)
    return {
        'recruiter': roles.find(role => role.name === 'recruiter').id,
        'student': roles.find(role => role.name === 'student').id,
        'investor': roles.find(role => role.name === 'investor').id,
        'admin': roles.find(role => role.name === 'admin').id,
        'superAdmin': roles.find(role => role.name === 'superAdmin').id
    }
}
export const getBasicRoles = async () => {
    const roles = await Role.findAll()
    return {
        'recruiter': roles.find(role => role.name === 'recruiter').id,
        'student': roles.find(role => role.name === 'student').id,
        'investor': roles.find(role => role.name === 'investor').id
    }

}

export const ALL_ROLES = await getRoles()
export const BASIC_ROLES = await getBasicRoles()