import { Company } from "../../../recruiters/companies/companyModel.js";
import { updateAssociation } from "../associations/assosiationServices.js";
import { deleteCompanySvc, getCompaniesSvc, getCompanyByIdSvc, updateCompanyStatusSvc } from "./companyServices.js"
import { validate as isValidUUID } from 'uuid';

export const getCompaniesCtrl = async (req, res) => {
    try {
        const pageAsNumber = Number.parseInt(req.query.page)
        let page = 1
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
            page = pageAsNumber
        }

        const { status } = req.params
        const validStatus = ['Aprobada', 'Rechazada', 'Pendiente']
        if (!status || !validStatus.includes(status)) throw new Error('Error en la solicitud, intente de nuevo')

        const companies = await getCompaniesSvc(status, page - 1)
        res.status(200).json({ companies: companies.rows, totalPages: Math.ceil(companies.count / 12), total: companies.count })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const getCompanyByIdCtrl = async (req, res) => {
    try {
        const { id } = req.params
        if (!isValidUUID(id)) throw new Error('La empresa seleccionada no es valida')
        if (!id) throw new Error('No se seleccionó ninguna empresa')
        const company = await getCompanyByIdSvc(id)
        if (!company) return res.status(404).json()
        res.status(200).json(company)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
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
            return await updateCompanyStatusSvc(id, status, justification)
        }
        if (status == 'Aprobada' && justification) throw new Error('No debe presentar justificacion si aprueba la empresa')
        const { association } = await updateCompanyStatusSvc(id, status)
        await updateAssociation(association.id, 'Rechazada', 'La empresa fue rechazada, verifique su correo electronico para mas detalles')
        res.status(201).json({ message: 'La empresa fue actualizada correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteCompanyCtrl = async (req, res) => {
    const { id } = req.params
    try {
        if (!isValidUUID(id)) return res.status(400).json({ message: 'La empresa seleccionada no es valida' })
        await deleteCompanySvc(id);
        res.status(200).json({ message: 'La empresa fue eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}