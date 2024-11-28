import { Report } from "./reportModel.js"

export const createReportSvc = async (reportableType, reportableId, reasonId, profileId) => {
    return await Report.create({
        reportableType,
        reportableId,
        reasonId,
        profileId
    })
}

export const getReportsByTypeSvc = async (reportableType, status) => {
    return await Report.findAll({
        where: {
            reportableType,
            status
        }
    })
}