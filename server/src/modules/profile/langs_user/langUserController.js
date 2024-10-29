import {
  fetchLangsByProfileId,
  createLang,
  modifyLang,
  removeLang,
} from "./langUserService.js";

import { getProfileIdByUsername } from "../userServices.js";

export const getLangsByProfileId = async (req, res) => {
  try {
    const { username } = req.params;
    const profileId = await getProfileIdByUsername(username);
    const langs = await fetchLangsByProfileId(profileId);
    res.json(langs);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ message: "Error fetching languages" });
  }
};

export const addLang = async (req, res) => {
  try {
    const { langId, langLevelId } = req.body;
    const { username } = req.params;
    const profileId = await getProfileIdByUsername(username);
    const newLang = await createLang(langId, langLevelId, profileId);
    res.status(201).json(newLang);
  } catch (error) {
    console.error("Error adding language:", error);
    res.status(500).json({ message: "Error adding language" });
  }
};

export const updateLang = async (req, res) => {
  try {
    const { id } = req.params;
    const { langId, langLevelId } = req.body;
    const updatedLang = await modifyLang(id, langId, langLevelId);
    res.json(updatedLang);
  } catch (error) {
    console.error("Error updating language:", error);
    res.status(500).json({ message: "Error updating language" });
  }
};

export const deleteLang = async (req, res) => {
  try {
    const { id } = req.params;
    await removeLang(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting language:", error);
    res.status(500).json({ message: "Error deleting language" });
  }
};
