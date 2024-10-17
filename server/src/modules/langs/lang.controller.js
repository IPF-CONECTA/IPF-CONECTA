import {
  getAllLangsSvc,
  getLangLevelsSvc
} from "./langService.js";

export const getLangs = async (req, res) => {
  try {
    const langs = await getAllLangsSvc();
    res.status(200).json(langs);
  } catch (error) {
    console.error("Error al obtener los idiomas:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los idiomas" });
  }
};

export const getLangLevels = async (req, res) => {
  try {
    const langLevels = await getLangLevelsSvc();
    res.status(200).json(langLevels);
  } catch (error) {
    console.error("Error al obtener los niveles de idioma:", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los niveles de idioma" });
  }
};

