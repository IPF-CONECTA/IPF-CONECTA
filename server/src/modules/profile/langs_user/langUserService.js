import { LangsUser } from "./langsUserModel.js";

export const fetchLangsByProfileId = async (profileId) => {
  return await LangsUser.findAll({ where: { profileId } });
};

export const createLang = async (langId, langLevelId, profileId) => {
  return await LangsUser.create({ langId, langLevelId, profileId });
};

export const modifyLang = async (id, langId, langLevelId) => {
  return await LangsUser.update({ langId, langLevelId }, { where: { id } });
};

export const removeLang = async (id) => {
  return await LangsUser.destroy({ where: { id } });
};
