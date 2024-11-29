import axios from "axios";
import { BASE_URL } from "../../../../constants/BASE_URL";

export const getUserLanguages = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/langs/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user's languages:", error);
    throw error;
  }
};

export const getAvailableLanguages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/langs`);
    const uniqueLanguages = Array.from(
      new Set(response.data.map((lang) => lang.id))
    ).map((id) => response.data.find((lang) => lang.id === id));
    return uniqueLanguages;
  } catch (error) {
    console.error("Error fetching available languages:", error);
    throw error;
  }
};

export const getAvailableLanguageLevels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/lang-levels`);
    return response.data;
  } catch (error) {
    console.error("Error fetching available language levels:", error);
    throw error;
  }
};

export const addLanguage = async (username, langId, langLevelId) => {
  try {
    const response = await axios.post(`${BASE_URL}/langs/${username}`, {
      langId,
      langLevelId,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding language:", error);
    throw error;
  }
};

export const updateLanguage = async (
  editingLanguageId,
  langId,
  langLevelId
) => {
  try {
    await axios.put(`${BASE_URL}/langs/${editingLanguageId}`, {
      langId,
      langLevelId,
    });
  } catch (error) {
    console.error("Error updating language:", error);
    throw error;
  }
};

export const deleteLanguage = async (languageId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/langs/${languageId}`);
    return response;
  } catch (error) {
    console.error("Error deleting language:", error.response ? error.response.data : error.message);
    throw error;
  }
};

