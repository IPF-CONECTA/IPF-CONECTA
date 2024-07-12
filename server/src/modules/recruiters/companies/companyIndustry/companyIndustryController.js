import { getIndustriesSvc } from "./companyIndustryServices.js";

export const getIndustriesCtrl = async (req, res) => {
    try {
        const industries = await getIndustriesSvc()
        res.status(200).json(industries)
    } catch (error) {
        throw new Error(error.message)
    }
}   