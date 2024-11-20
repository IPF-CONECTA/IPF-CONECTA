import axios from "axios";
import { authService } from "../../../auth/services/authService";
import { BASE_URL } from "../../../../constants/BASE_URL";
export const disciplinesServices = {
  getDisciplines: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/disciplines`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      return { status: error.status };
    }
  },
  getDiscipline: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/disciplines/${id}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      return { status: error.status };
    }
  },
};
