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

export const updateLangSvc = async (id, langData) => {
  try {
    const lang = await Lang.findByPk(id);
    if (!lang) {
      throw new Error("El idioma no existe");
    }
    await lang.update(langData); 
    return lang;
  } catch (error) {
    throw new Error("Error al actualizar el idioma en la base de datos");
  }
};

export const updateLangLevelSvc = async (id, levelData) => {
  try {
    const langLevel = await LangLevel.findByPk(id);
    if (!langLevel) {
      throw new Error("El nivel de idioma no existe");
    }
    await langLevel.update(levelData); 
    return langLevel;
  } catch (error) {
    throw new Error(
      "Error al actualizar el nivel de idioma en la base de datos"
    );
  }
};

export const deleteLangSvc = async (profileId, langId) => {
  try {
    const lang = await Lang.findByPk(profileId, langId);
    if (!lang) {
      throw new Error("El idioma no existe");
    }
    await lang.destroy();
    return "Idioma eliminado con éxito";
  } catch (error) {
    throw new Error("Error al eliminar el idioma en la base de datos");
  }
};

export const deleteLangLevelSvc = async (id) => {
  try {
    const langLevel = await LangLevel.findByPk(id);
    if (!langLevel) {
      throw new Error("El nivel de idioma no existe");
    }
    await langLevel.destroy();
  } catch (error) {
    throw new Error("Error al eliminar el nivel de idioma en la base de datos");
  }
};
