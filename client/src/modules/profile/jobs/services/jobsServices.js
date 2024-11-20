import axios from "axios";
import { authService } from "../../../auth/services/authService";
import { BASE_URL } from "../../../../constants/BASE_URL";
export const jobsServices = {
  createJob: async (jobData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/create-job`,
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
        `${BASE_URL}/get-jobs/${username}`,
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
        `${BASE_URL}/delete-job/${jobId}`,
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
        `${BASE_URL}/update-job/${jobId}`,
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
  getJobById: async (jobId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get-job/${jobId}`,
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
