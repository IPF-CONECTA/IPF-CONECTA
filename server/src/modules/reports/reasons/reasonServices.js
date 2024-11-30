import { ReportReason } from "./reasonModel.js"

export const getReportReasons = async () => {
    try {
        return await ReportReason.findAll()
    } catch (error) {
        throw error
    }
}