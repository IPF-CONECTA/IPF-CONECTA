import { getReports } from "./reportServices.js";

export const getReportsFiltered = async (req, res) => {
    const { reportableType, status, reasonId, orderBy } = req.query;

    try {
        const reports = await getReports(reportableType, status, reasonId, orderBy)
        if (reports.length == 0) return res.status(404).json()
        res.status(200).json(reports)
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}