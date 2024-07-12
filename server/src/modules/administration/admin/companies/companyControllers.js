import { getCompaniesSvc, getCompanyByIdSvc, updateCompanyStatusSvc } from "./companyServices.js"
import { validate as isValidUUID } from 'uuid';

export const getCompaniesCtrl = async (req, res) => {
    try {
        const { status } = req.params
        if (!status) throw new Error('Error en la solicitud, intente de nuevo')
        const validStatus = ['Aprobada', 'Rechazada', 'Pendiente']
        if (!validStatus.includes(status)) throw new Error('Error en la solicitud, intente de nuevo')
        const Companies = await getCompaniesSvc(status)
        if (Companies.length == 0) res.status(404).json({ message: 'No se encontraron empresas sin verificar' })
        res.status(200).json(Companies)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCompanyByIdCtrl = async (req, res) => {
    try {
        const { id } = req.params
        if (!isValidUUID(id)) throw new Error('La empresa seleccionada no es valida')
        if (!id) throw new Error('No se seleccionó ninguna empresa')
        const company = await getCompanyByIdSvc(id)
        if (!company) return res.status(404).json({ message: 'No se encontró la empresa seleccionada' })
        res.status(200).json(company)
    } catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor' })
    }
}

export const updateCompanyStatusCtrl = async (req, res) => {
    const { id, status } = req.params
    const { justification } = req.body
    try {
        if (status !== 'Aprobada' && status !== 'Rechazada') throw new Error('Estado en la solicitud invalido')
        if (!isValidUUID(id)) throw new Error('La empresa seleccionada no es valida')
        if (status == 'Rechazada') {
            if (!justification) throw new Error('Justifique el motivo del rechazo')
            if (justification.length < 5) throw new Error('La justificacion debe tener al menos 5 caracteres')
        }
        if (status == 'Aprobada' && justification) throw new Error('No debe presentar justificacion si aprueba la empresa')
        await updateCompanyStatusSvc(id, status)
        res.status(201).json({ message: 'La empresa fue actualizada correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}