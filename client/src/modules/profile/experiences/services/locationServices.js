import axios from "axios"
import { BASE_URL } from "../../../../constants/BASE_URL"
export const findLocation = async (query) => {
    try {
        const res = await axios.get(`${BASE_URL}/find-location?query=${query}`)
        return { data: res.data, status: res.status }
    } catch (error) {
        return { status: error.status }
    }
}