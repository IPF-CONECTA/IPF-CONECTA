import axios from "axios";
import { authService } from "../../../auth/services/authService";

export const educationsServices = {
  getEducations: async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/educations/profile/${username}`,
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
        "http://localhost:4000/educations/add",
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
        `http://localhost:4000/educations/${id}/edit`,
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
};
