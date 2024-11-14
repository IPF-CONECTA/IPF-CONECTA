import { getProfileIdByUsername } from "../../users/userServices.js";
import {
  createEducationSvc,
  getEducationSvc,
  getEducationByIdSvc,
  updateEducationSvc,
  deleteEducationSvc,
} from "./educationServices.js";

export const createEducationCtrl = async (req, res) => {
  try {
    const { id: profileId } = req.user.profile;
    const { education } = req.body;
    console.log("HOLA HOLA");
    console.log(education);
    const newEducation = await createEducationSvc(profileId, education);
    if (!newEducation)
      return res.status(400).json({ error: "No se pudo crear la educación" });

    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getEducationsByUsernameCtrl = async (req, res) => {
  try {
    const { username } = req.params;
    const profileId = await getProfileIdByUsername(username);
    const educations = await getEducationSvc(profileId);
    return res.status(200).json(educations);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getEducationByIdCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await getEducationByIdSvc(id);
    if (!education)
      return res.status(404).json({ error: "Educación no encontrada" });

    return res.status(200).json(education);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const editEducationCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { education } = req.body;

    console.log({ id, education });
    const updatedEducation = await updateEducationSvc(id, education);
    return res.status(200).json(updatedEducation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteEducationCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEducation = await deleteEducationSvc(id);
    if (!deletedEducation)
      return res.status(404).json({ error: "Educación no encontrada" });

    return res.status(200).json(deletedEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
