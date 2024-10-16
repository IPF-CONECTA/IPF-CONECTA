import axios from "axios";
import { authService } from "../../auth/services/authService";

export const findCompanies = async (search) => {
  console.log(search)
  try {
    const res = await axios.get(
      `http://localhost:4000/find-companies?company=${search}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
