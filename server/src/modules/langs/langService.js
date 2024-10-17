import { Lang } from "./langModel.js";
import { LangLevel } from "./langLevelsModel.js";

export const getAllLangsSvc = async () => {
  try {
    const langs = await Lang.findAll();
    return langs;
  } catch (error) {
    throw new Error("Error al obtener los idiomas desde la base de datos");
  }
};

export const getLangLevelsSvc = async () => {
  try {
    const langLevels = await LangLevel.findAll();
    return langLevels;
  } catch (error) {
    throw new Error(
      "Error al obtener los niveles de idioma desde la base de datos"
    );
  }
};



