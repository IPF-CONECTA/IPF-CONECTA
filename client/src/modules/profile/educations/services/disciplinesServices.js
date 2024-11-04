import axios from "axios";
import { authService } from "../../../auth/services/authService";

export const disciplinesServices = {
  getDisciplines: async () => {
    try {
      const res = await axios.get("http://localhost:4000/disciplines", {
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
      const res = await axios.get(`http://localhost:4000/disciplines/${id}`, {
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
