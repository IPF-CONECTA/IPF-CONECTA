import axios from "axios";
import { authService } from "./authService";
export const getVerifications = async (status) => {
    try {
        const res = await axios.get(`http://localhost:4000/admin/get-associations/${status}`, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,

            }
        });
        const data = res.data.associations;
        const statusCode = res.status;
        return { data, statusCode };
    } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
        return { data: [], statusCode: error.response?.status };
    }
}

export const updateAssociationStatus = async (index, status, justification = null) => {
    try {
        const res = await axios.put(
            `http://localhost:4000/admin/update-association-status/${index}/${status}`,
            { justification },
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                },
            }
        );
        return res.status;
    } catch (error) {
        console.error("Error al actualizar el estado de la solicitud:", error);
        return error.response?.status;
    }
}