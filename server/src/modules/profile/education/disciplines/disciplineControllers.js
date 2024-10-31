import {
  getDisciplineByIdSvc,
  getDisciplinesSvc,
} from "./disciplineServices.js";

export const getDisciplinesCtrl = async (req, res) => {
  try {
    const disciplines = await getDisciplinesSvc();
    res.status(200).json(disciplines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDisciplineByIdCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const discipline = await getDisciplineByIdSvc(id);

    res.status(200).json(discipline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
