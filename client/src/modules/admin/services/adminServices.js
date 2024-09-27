import axios from "axios";
import { authService } from "../../auth/services/authService";
export const getAssociationsSvc = async (status) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/admin/get-associations/${status}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    const data = res.data.associations;
    const statusCode = res.status;
    return { data, statusCode };
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);
    return { data: [], statusCode: error.response?.status };
  }
};

export const updateAssociationStatus = async (id, status, justification) => {
  console.log(justification)
  try {
    const res = await axios.patch(
      `http://localhost:4000/admin/update-association-status/${id}/${status}`,
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
