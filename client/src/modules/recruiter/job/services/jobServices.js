import axios from "axios";
import { authService } from "../../../auth/services/authService";
import { BASE_URL } from "../../../../constants/BASE_URL";
export const getJobs = async (query = "", page) => {
  try {
    if (!page) {
      page = 1;
    }
    const res = await axios.get(
      `${BASE_URL}/job/search?query=${query}&page=${page}`
    );
    return res;
  } catch (error) {
    return error;
  }
};
export const getJobInfo = async (jobId, authenticated) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/get-job/${jobId}`,
      authenticated && {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { data: res.data, status: res.status };
  } catch (error) {
    return { status: error.status };
  }
}
export const getCompaniesByUser = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get-companies-by-user`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return { status: error.status };
  }
};

export const getModalities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-modalities`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error fetching modalities:", error);
    return { status: error.status };
  }
};

export const getContractTypes = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get-contract-types`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error fetching contract types:", error);
    return { status: error.status };
  }
};

export const findSkills = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/find-skills?query=${query}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
