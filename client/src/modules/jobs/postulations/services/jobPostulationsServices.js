import axios from "axios";
import { BASE_URL } from "../../../../constants/BASE_URL";
export const jobPostulationsServices = {
  getPostulationsByJobId: async (jobId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/postulations/${jobId}`
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      return {
        status: error.status,
        error: error.response?.data || "Hubo un error al obtener las ideas",
      };
    }
  },
};
