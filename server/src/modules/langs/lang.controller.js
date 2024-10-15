import {
  deleteLangSvc,
  getAllLangsSvc,
  updateLangSvc,
  updateLangLevelSvc,
  deleteLangLevelSvc,
  getLangLevelsSvc,
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

export const updateLang = async (req, res) => {
  try {
    const lang = await updateLangSvc(req.params.id, req.body);
    res.status(200).json(lang);
  } catch (error) {
    console.error("Error al actualizar el idioma:", error);
    res.status(500).json({ error: "Ocurrió un error al actualizar el idioma" });
  }
};

export const updateLangLevel = async (req, res) => {
  try {
    const langLevel = await updateLangLevelSvc(req.params.id, req.body);
    res.status(200).json(langLevel);
  } catch (error) {
    console.error("Error al actualizar el nivel de idioma:", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al actualizar el nivel de idioma" });
  }
};

export const deleteLang = async (req, res) => {
  const langId = req.params.id;
  try {
    const message = await deleteLangSvc(langId);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error al eliminar el idioma:", error);
    res.status(500).json({ error: "Ocurrió un error al eliminar el idioma" });
  }
};

export const deleteLangLevel = async (req, res) => {
  try {
    await deleteLangLevelSvc(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Error al eliminar el nivel de idioma:", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al eliminar el nivel de idioma" });
  }
};
