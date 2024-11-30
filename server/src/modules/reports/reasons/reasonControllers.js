import { getReportReasons } from "./reasonServices.js"

export const getReportReasonsCtrl = async (req, res) => {
    try {
        const reasons = await getReportReasons()
        res.status(200).json(reasons)
    } catch (error) {
        res.status(500).json()
    }
}