import axios from "axios";
import { BASE_URL } from "../../../../constants/BASE_URL";
export const instituteServices = {
  findInstitute: async (query) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/find-institute?query=${query}`
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      return { status: error.response?.status || 500 };
    }
  },
};
