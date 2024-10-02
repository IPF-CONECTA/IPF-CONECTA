import axios from "axios";
import { authService } from "../../auth/services/authService";

export const updateAbout = async (data, username) => {
  try {
    const res = await axios.patch(
      "http://localhost:4000/about",
      {
        username,
        about: data.about,
      },
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );

    return { data: res.data, status: res.status };
  } catch (error) {
    return { status: error.status };
  }
};
export const deleteAbout = async (username) => {
  try {
    const res = await axios.delete(`http://localhost:4000/about/${username}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { status: res.status };
  } catch (error) {
    return { status: error.status };
  }
};
