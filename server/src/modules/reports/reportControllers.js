import { createReportSvc } from "./reportServices.js";

export const createReportCtrl = async (req, res) => {
    const { reportableType, reportableId, reason, description } = req.body;
    const { id } = req.user.profile;
    try {
        if (reportableType !== 'post' && reportableType !== 'profile' && reportableType !== 'job') return res.status(400).json()
        const report = await createReportSvc(reportableType, description, reportableId, reason, id)
        if (!report) return res.status(400).json()
        res.status(201).json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}

