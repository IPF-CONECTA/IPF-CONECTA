import { getUnverifiedCompaniesSvc, getUnverifiedCompanyByIdSvc, updateCompanyStatusSvc } from "./companyServices.js"
import { validate as isValidUUID } from 'uuid';

export const getUnverifiedCompaniesCtrl = async (req, res) => {
    try {
        const unverifiedCompanies = await getUnverifiedCompaniesSvc()
        if (unverifiedCompanies.length == 0) res.status(404).json({ message: 'No se encontraron empresas sin verificar' })
        res.status(200).json(unverifiedCompanies)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUnverifiedCompanyByIdCtrl = async (req, res) => {
    try {
        const { id } = req.params
        if (!isValidUUID(id)) throw new Error('La empresa seleccionada no es valida')
        if (!id) throw new Error('No se seleccionó ninguna empresa')
        const company = await getUnverifiedCompanyByIdSvc(id)
        if (!company) return res.status(404).json({ message: 'No se encontró la empresa seleccionada' })
        res.status(200).json(company)
    } catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor' })
    }
}

export const updateCompanyStatusCtrl = async (req, res) => {
    const { id, status } = req.params
    try {
        if (status !== 'Aprobada' && status !== 'Rechazada') throw new Error('Estado en la solicitud invalido')
        if (!isValidUUID(id)) throw new Error('La empresa seleccionada no es valida')
        await updateCompanyStatusSvc(id, status)
        res.status(201).json({ message: 'La empresa fue actualizada correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}