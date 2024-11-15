import { Discipline } from "./disciplineModel.js";

export const getDisciplinesSvc = async () => {
  return await Discipline.findAll();
};
export const getDisciplineByIdSvc = async (id) => {
  return await Discipline.findByPk(id);
};
