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
};
