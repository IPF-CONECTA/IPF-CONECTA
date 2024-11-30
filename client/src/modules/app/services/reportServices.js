import axios from "axios";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";

export const report = async (data, reportableType, reportableId) => {
    data.reportableType = reportableType
    data.reportableId = reportableId
    try {
        const res = await axios.post(`${BASE_URL}/report`, data, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`
            },
        });
        return { status: res.status };
    } catch (error) {
        console.error("Error reporting:", error);
        return { status: error.status };
    }
}

export const getReportReasons = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/report-reasons`, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        })
        return { status: res.status, data: res.data }
    } catch (error) {
        return { status: error.status }
    }
}