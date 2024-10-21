import axios from "axios";
import { authService } from "../../../auth/services/authService";
export const jobsServices = {
  getJobsByUsername: async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/get-jobs/${username}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      return { status: error.status };
    }
  },

  deleteJob: async (jobId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/delete-job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      return { status: error.status };
    }
  },
};
