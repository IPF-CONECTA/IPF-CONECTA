import axios from "axios";
import { authService } from "../../auth/services/authService";

export const jobsServices = {
  getMyJobs: async () => {
    try {
      const response = await axios.get(`http://localhost:4000/get-my-jobs`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      return { status: error.status };
    }
  },
};
