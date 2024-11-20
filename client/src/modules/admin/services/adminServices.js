import axios from "axios";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
export const getAssociationsSvc = async (status) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/admin/get-associations/${status}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { data: res.data, status: res.status };
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);
    return { data: [], status: error.status };
  }
};

export const updateAssociationStatus = async (id, status, justification) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/admin/update-association-status/${id}/${status}`,
      { justification },
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { status: res.status };
  } catch (error) {
    return { status: error.status, error: error.response?.data || error.response.data.errors || "Hubo un error al actualizar el estado de la solicitud" };
  }
};
