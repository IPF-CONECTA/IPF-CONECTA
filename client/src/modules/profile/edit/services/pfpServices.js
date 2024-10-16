import axios from "axios";
import { authService } from "../../../auth/services/authService";

export const changePfp = async (file) => {
    console.log(file)
    try {
        const formData = new FormData();
        formData.append("images", file);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const res = await axios.post(
            "http://localhost:4000/update-profile-pic",
            formData,
            { headers: { Authorization: `Bearer ${authService.getToken()}` } }
        );
        console.log(res)
        return { status: res.status }
    } catch (error) {
        console.log(error)
        return { status: error.status }
    }

}