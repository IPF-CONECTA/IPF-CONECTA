import axios from "axios";
import { authService } from "../../../auth/services/authService";
export const jobsServices = {
  createJob: async (jobData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/create-job",
        { jobData },
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { status: error.status, messages: error.response.data.errors };
    }
  },
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
  updateJob: async (jobId, jobData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/update-job/${jobId}`,
        { jobData },
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
