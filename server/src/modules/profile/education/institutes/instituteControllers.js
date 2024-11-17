import { findInstitutes, findInstituteById } from "./instituteServices.js";

export const findInstituteCtrl = async (req, res) => {
  try {
    const { query } = req.query;
    const institutes = await findInstitutes(query);
    if (institutes.length === 0) {
      return res
        .status(404)
        .send("No se encontraron institutos con ese nombre");
    }
    res.status(200).json(institutes);
  } catch (error) {
    console.error("Failed to find institutes:", error);
    res.status(500).send("Failed to find institutes");
  }
};
