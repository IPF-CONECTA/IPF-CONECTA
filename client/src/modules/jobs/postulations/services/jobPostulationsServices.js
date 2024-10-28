import axios from "axios";

export const jobPostulationsServices = {
  getPostulationsByJobId: async (jobId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/postulations/${jobId}`
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
