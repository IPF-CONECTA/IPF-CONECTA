import axios from "axios";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
import qs from 'query-string';
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
    return { data: res.data.associations, status: res.status };
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
    return {
      status: error.status,
      error:
        error.response?.data ||
        error.response.data.errors ||
        "Hubo un error al actualizar el estado de la solicitud",
    };
  }
};

export const getReports = async (status, reportableType, reasonId, orderBy, page) => {
  try {
    const queryParams = {
      ...(status && { status }),
      ...(reportableType && { reportableType }),
      ...(reasonId && { reasonId }),
      ...(orderBy && { orderBy }),
      ...(page && { page }),
    };

    const queryString = qs.stringify(queryParams);
    const res = await axios.get(`${BASE_URL}/admin/report?${queryString}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      }
    })
    return { status: res.status, data: res.data }
  } catch (error) {
    return { status: error.status }
  }
}

export const getReportById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/report/${id}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      }
    })
    return { status: res.status, data: res.data }
  } catch (error) {
    return { status: error.status }
  }
}

export const resolveReport = async (data, id) => {
  try {
    const res = await axios.patch(`${BASE_URL}/admin/report/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      }
    })
    return { status: res.status }
  } catch (error) {
    return { status: error.status }
  }
}