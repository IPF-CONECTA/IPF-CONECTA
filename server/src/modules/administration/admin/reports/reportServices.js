import { Op } from "sequelize";
import { Report } from "../../../reports/reportModel.js";
import { ReportReason } from "../../../reports/reasons/reasonModel.js";
import { Profile } from "../../../profile/profileModel.js";
import { User } from "../../../users/userModel.js";
import { getJobByIdSvc } from "../../../recruiters/job/jobServices.js";
import { getPostByIdSvc } from "../../../posts/postServices.js";
import { getProfileById } from "../../../profile/profileServices.js";

export const getReportsSvc = async (reportableType, status, reasonId, orderBy) => {
    const where = {
        [Op.and]: [
            reportableType && { reportableType },
            status && { status },
            reasonId && { reasonId },
        ].filter(Boolean),
    };

    const order = [];
    if (orderBy === 'date_asc') {
        order.push(['createdAt', 'ASC']);
    } else if (orderBy === 'date_desc') {
        order.push(['createdAt', 'DESC']);
    } else if (orderBy === 'severity_asc') {
        order.push([{ model: ReportReason }, 'severity', 'ASC']);
    } else if (orderBy === 'severity_desc') {
        order.push([{ model: ReportReason }, 'severity', 'DESC']);
    }

    return await Report.findAll({
        where,
        include: [
            {
                model: ReportReason,
            },
            {
                model: Profile,
                attributes: ["profilePic", "names", "surnames"],
                include: [{
                    model: User,
                    attributes: ["username"]
                }]
            }
        ],
        order,
    });
};

export const getReportByIdSvc = async (id) => {
    const report = await Report.findByPk(id, {
        include: [
            {
                model: ReportReason,
            },
        ],
    });

    if (!report) throw new Error("No se encontró el reporte");

    let data;
    switch (report.reportableType) {
        case "job":
            (data = await getJobByIdSvc(report.reportableId));

            report.dataValues.profile = data.job.profile;
            break;
        case "post":
            (data = await getPostByIdSvc(report.reportableId));
            console.log(data)
            report.dataValues.profile = data.profile.dataValues;
            break;
        case "profile":
            data = await getProfileById(report.reportableId)
            report.dataValues.profile = data
            break;
        default:
            break;
    }
    return report;
}


export const resolveReportSvc = async (id, action, suspendEnds, reason) => {
    try {
        const report = await Report.findByPk(id);
        let data;
        let profile;
        switch (report.reportableType) {
            case "job":
                data = await getJobByIdSvc(report.reportableId);
                profile = data.job.profile;
                break;
            case "post":
                data = await getPostByIdSvc(report.reportableId);
                profile = data.profile;
                break;
            case "profile":
                profile = await getProfileById(report.reportableId);
                break;
            default:
                break;
        }
        if (!profile || !profile.user) {
            throw new Error("No se encontró el perfil o el usuario asociado");
        }
        switch (action) {
            case "ignore":
                await report.update({ status: "resolved", adminAction: action });
                break;
            case "delete":
                await data.destroy()
                await report.update({ status: "resolved", adminResponse: reason, adminAction: action });
                break;
            case "suspend":
                await data.destroy()
                await User.update({ suspensionExpires: suspendEnds }, { where: { id: profile.user.id } });
                await report.update({ status: "resolved", adminResponse: reason, suspendEnds, adminAction: action });
                break;
            case "ban":
                await data.destroy()
                await User.update({ banned: true }, { where: { id: profile.user.id } });
                await report.update({ status: "resolved", adminResponse: reason, adminAction: action });
                break;
            default:
                break;
        }
        return report;
    } catch (error) {
        throw error
    }
}