import axios from "axios";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
export const findCompanies = async (search) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/find-companies?company=${search}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { status: res.status, data: res.data };
  } catch (error) {
    return { status: error.response.status, data: [] };
  }
};

export const findCompany = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/get-company/${id}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
