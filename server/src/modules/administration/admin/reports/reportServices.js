import { Op } from "sequelize";
import { Report } from "../../../reports/reportModel.js";
import { ReportReason } from "../../../reports/reasons/reasonModel.js";
import { Profile } from "../../../profile/profileModel.js";
import { User } from "../../../users/userModel.js";

export const getReports = async (reportableType, status, reasonId, orderBy) => {
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
