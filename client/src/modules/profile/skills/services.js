import axios from "axios"
import { authService } from "../../auth/services/authService"

export const deleteSkill = async (id) => {
    try {
        const res = await axios.post(`http://localhost:4000/skillProfile/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        })
        return { data: res.data, status: res.status }
    } catch (error) {
        return { status: res.status, message: res.message }
    }
}