import { getReportByIdSvc, getReportsSvc, resolveReportSvc } from "./reportServices.js";

export const getReportsFiltered = async (req, res) => {
    const { reportableType, status, reasonId, orderBy } = req.query;
    const pageAsNumber = Number.parseInt(req.query.page)
    let page = 1
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
        page = pageAsNumber
    }
    try {
        const reports = await getReportsSvc(reportableType, status, reasonId, orderBy, page - 1)
        console.log(reports)
        if (reports.count == 0) return res.status(404).json()
        res.status(200).json(reports)
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}

export const getReportByIdCtrl = async (req, res) => {
    const { id } = req.params

    try {
        const report = await getReportByIdSvc(id)
        if (!report) return res.status(404).json()
        res.status(200).json(report)
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}

export const resolveReport = async (req, res) => {
    const { id } = req.params
    const { action, duration, reason } = req.body

    try {
        const report = await getReportByIdSvc(id)
        if (!report) return res.status(404).json()
        console.log(action, duration, reason, id)
        await resolveReportSvc(id, action, duration, reason)
        res.status(204).json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}