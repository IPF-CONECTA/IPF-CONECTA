import axios from "axios"

export const findUbication = async (query) => {
    try {
        const res = await axios.get(`http://localhost:4000/find-ubication?query=${query}`)
        return { data: res.data, status: res.status }
    } catch (error) {
        return { status: error.status }
    }
}