import axios from "axios";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { authService } from "../../../auth/services/authService";

export const jobPostulationsServices = {
  getPostulationsByJobId: async (jobId) => {
    try {
      const res = await axios.get(`${BASE_URL}/postulations/${jobId}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      return {
        status: error.status,
        error: error.response?.data || "Hubo un error al obtener las ideas",
      };
    }
  },

  changeJobPostulationStatus: async (jobPostulationId) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/change-job-postulation-status/${jobPostulationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      return {
        status: error.status,
        error:
          error.response?.data ||
          "Hubo un error al intentar cambiar el estado de la postulación",
      };
    }
  },
};
