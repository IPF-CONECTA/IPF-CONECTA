import axios from "axios";
import { authService } from "../../auth/services/authService";

export const findCompanies = async (search) => {
  console.log(search);
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

export const findCompany = async (id) => {
  try {
    const res = await axios.get(`http://localhost:4000/get-company/${id}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};
