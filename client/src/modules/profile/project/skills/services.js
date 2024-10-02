import axios from "axios"
import { authService } from "../../../auth/services/authService"

export const getSkills = async (username) => {
    try {
        const res = await axios.get(`http://localhost:4000/skillsProfile/${username}`,
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