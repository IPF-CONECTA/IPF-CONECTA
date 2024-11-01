import axios from "axios";
import { authService } from "../../../auth/services/authService";
import { BASE_URL } from "../../../../constants/BASE_URL";

export const changePfp = async (file) => {
    try {
        const formData = new FormData();
        formData.append("images", file);

        const res = await axios.post(
            "http://localhost:4000/update-profile-pic",
            formData,
            { headers: { Authorization: `Bearer ${authService.getToken()}` } }
        );
        return { data: res.data, status: res.status }
    } catch (error) {
        console.log(error)
        return { status: error.status }
    }

}

export const updatePersonalDetails = async (data) => {
    try {
        const res = await axios.put(`${BASE_URL}/update-profile`, data, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });
        return { status: res.status }
    } catch (error) {
        console.log(error)
        return { status: error.status }
    }
}

export const getPrefixes = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/prefixes`);
        return { data: res.data, status: res.status }
    } catch (error) {
        console.log(error)
        return { status: error.status }
    }
}