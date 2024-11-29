import axios from "axios";
import { authService } from "../../../auth/services/authService";
import { BASE_URL } from "../../../../constants/BASE_URL";
export const educationsServices = {
  getEducations: async (username) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/educations/profile/${username}`,
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
  createEducation: async (education) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/educations/add`,
        { education },
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
  editEducation: async (id, education) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/educations/${id}/edit`,
        { education },
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
  deleteEducation: async (id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/educations/${id}/delete`,
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
