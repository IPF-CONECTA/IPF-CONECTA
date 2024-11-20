import axios from "axios"
import { authService } from "../../auth/services/authService"
import { BASE_URL } from "../../../constants/BASE_URL"
export const getSkills = async (username) => {
    try {
        const res = await axios.get(`${BASE_URL}/skillsProfile/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`
                }
            }
        )
        return { data: res.data, status: res.status }
    } catch (error) {
        return { status: error.status }
    }
}

export const deleteSkill = async (skillableId, skillId) => {
    try {
        const res = await axios.post(`${BASE_URL}/skillable/${skillableId}/${skillId}`, {}, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        })
        return { data: res.data, status: res.status }
    } catch (error) {
        return { status: error.status, message: error.message }
    }
}

