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

// =========================================================================================================================
// || SI SE INICIA POR PRIMERA VEZ LA BD O SE REINICIA, DESCOMENTAR LO DE ABAJO Y COMENTAR EL CODIGO CON LLAMADAS A LA BD ||
// =========================================================================================================================


// export const getRoles = async () => {
//     const roles = await Role.findAll()
//     console.log(roles)
//     return {
//         'recruiter': 123,
//         'student': 123,
//         'investor': 123,
//         'admin': 123,
//         'superAdmin': 123
//     }
// }
// export const getBasicRoles = async () => {
//     const roles = await Role.findAll()
//     return {
//         'recruiter': 123,
//         'student': 123,
//         'investor': 123,
//     }

// }

export const ALL_ROLES = await getRoles()
export const BASIC_ROLES = await getBasicRoles()