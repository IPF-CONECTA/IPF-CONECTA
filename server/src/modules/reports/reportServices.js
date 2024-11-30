import { Report } from "./reportModel.js"

export const createReportSvc = async (reportableType, description, reportableId, reasonId, profileId) => {
    return await Report.create({
        reportableType,
        reportableId,
        description,
        reasonId,
        profileId
    })
}

