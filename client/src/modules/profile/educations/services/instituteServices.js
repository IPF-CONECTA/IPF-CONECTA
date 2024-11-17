import axios from "axios";

export const instituteServices = {
  findInstitute: async (query) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/find-institute?query=${query}`
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      return { status: error.response?.status || 500 };
    }
  },
};
