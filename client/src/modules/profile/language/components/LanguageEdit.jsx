import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { getProfile } from "../../../feed/services/feedServices";
import {
  getUserLanguages,
  deleteLanguage,
  getAvailableLanguages,
  getAvailableLanguageLevels,
  updateLanguage,
} from "../services/languageService.js";
import { Header } from "../../components/ProfileHeader";
import { Nav, SideBar } from "../../../ui/components";
import { useNoti } from "../../../../hooks/useNoti";
import styles from "../../../../../public/css/allSkills.module.css";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts.jsx";

export const LanguagesEdit = () => {
  const { username } = useParams();
  const [profileLanguages, setProfileLanguages] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableLanguageLevels, setAvailableLanguageLevels] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLang, setNewLang] = useState(null);
  const [newLangLevel, setNewLangLevel] = useState(null);
  const [editingLanguageId, setEditingLanguageId] = useState(null);
  const noti = useNoti();
  const navigate = useNavigate();

  const fetchUserLanguages = async () => {
    try {
      const languages = await getUserLanguages(username);
      setProfileLanguages(languages);
    } catch (error) {
      console.error("Error fetching user's languages:", error);
    }
  };

  const fetchAvailableLanguages = async () => {
    try {
      const languages = await getAvailableLanguages();
      setAvailableLanguages(
        languages.map((lang) => ({ value: lang.id, label: lang.name }))
      );
    } catch (error) {
      console.error("Error fetching available languages:", error);
    }
  };

  const fetchAvailableLanguageLevels = async () => {
    try {
      const levels = await getAvailableLanguageLevels();
      setAvailableLanguageLevels(
        levels.map((level) => ({ value: level.id, label: level.level }))
      );
    } catch (error) {
      console.error("Error fetching available language levels:", error);
    }
  };

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
  };

  useEffect(() => {
    fetchUserLanguages();
    fetchAvailableLanguages();
    fetchAvailableLanguageLevels();
    fetchProfile();
  }, [username]);

  const confirmDelete = async () => {
    if (!selectedLanguage) {
      return;
    }
    try {
      const res = await deleteLanguage(selectedLanguage.id);
      if (!res || (res && res.status !== 204)) {
        throw new Error("Error en la respuesta de la API");
      }
      noti("Idioma eliminado", "success");
      await fetchUserLanguages();
      setOpenConfirmDelete(false);
      setSelectedLanguage(null);
    } catch (error) {
      console.error("Error al eliminar el idioma:", error);
      noti(
        error.response
          ? error.response.data.message
          : "Ocurrió un error al eliminar el idioma",
        "error"
      );
    }
  };

  const handleEditClick = (language) => {
    setIsDialogOpen(true);
    setEditingLanguageId(language.id);
    setNewLang({
      value: language.langId,
      label: getLanguageName(language.langId),
    });
    setNewLangLevel({
      value: language.langLevelId,
      label: getLanguageLevelName(language.langLevelId),
    });
  };

  const handleSaveEdit = async () => {
    try {
      await updateLanguage(
        editingLanguageId,
        newLang.value,
        newLangLevel.value
      );
      noti("Idioma actualizado con éxito", "success");
      setIsDialogOpen(false);
      await fetchUserLanguages();
    } catch (error) {
      console.error("Error updating language:", error);
      noti("Error al actualizar el idioma", "error");
    }
  };

  const getLanguageName = (langId) => {
    const language = availableLanguages.find((lang) => lang.value === langId);
    return language ? language.label : "Idioma desconocido";
  };

  const getLanguageLevelName = (levelId) => {
    const level = availableLanguageLevels.find((lvl) => lvl.value === levelId);
    return level ? level.label : "Nivel desconocido";
  };

  return (
    <>
      <SideBar />
      <div className="d-flex justify-content-evenly px-5 pt-4">
        <div className={`${styles.profileContainer} border rounded`}>
          <Header profileData={profileData} setProfileData={setProfileData} />
          <section>
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex">
                <button
                  className="btn p-0 d-flex align-items-center me-2"
                  type="button"
                  onClick={() => navigate(`/perfil/${username}`)}
                >
                  <span className="material-symbols-outlined">
                    arrow_back_ios
                  </span>
                </button>
                <span className="fs-5 fw-bold">Idiomas</span>
              </div>
            </div>
            <ul className="p-0 m-0 list-unstyled">
              {profileLanguages && profileLanguages.length >= 1 ? (
                profileLanguages.map((language) => (
                  <li key={language.id}>
                    <div className="d-flex justify-content-between p-2">
                      <span>
                        Idioma: {getLanguageName(language.langId)} - Nivel:{" "}
                        {getLanguageLevelName(language.langLevelId)}
                      </span>
                      <div className="d-flex">
                        <IconButton onClick={() => handleEditClick(language)}>
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedLanguage(language);
                            setOpenConfirmDelete(true);
                          }}
                        >
                          <span className="material-symbols-outlined">
                            do_not_disturb_on
                          </span>
                        </IconButton>
                      </div>
                    </div>
                    <hr className="m-0 p-0" />
                  </li>
                ))
              ) : (
                <li className="list-group-item text-secondary">
                  No se han agregado idiomas a tu perfil.
                </li>
              )}
            </ul>
            <Dialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>Editar Idioma</DialogTitle>
              <DialogContent
                dividers
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <div className="form-group">
                  <Select
                    options={availableLanguages}
                    value={newLang}
                    onChange={setNewLang}
                    placeholder="Seleccionar idioma..."
                    isClearable
                    isSearchable
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 1300 }),
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="languageLevel">Nivel del idioma:</label>
                  <Select
                    options={availableLanguageLevels}
                    value={newLangLevel}
                    onChange={setNewLangLevel}
                    placeholder="Seleccionar nivel..."
                    isClearable
                    isSearchable
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 1300 }),
                    }}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleSaveEdit}
                  style={{ backgroundColor: "#212529", color: "#fff" }}
                >
                  Guardar cambios
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openConfirmDelete}
              onClose={() => setOpenConfirmDelete(false)}
              maxWidth={"xs"}
            >
              <div className="p-3">
                <span className="fs-3 fw-semibold">Confirmar eliminación</span>
                <p className="mb-3">
                  ¿Estás seguro de que deseas eliminar
                  <span className="fw-semibold">
                    {" "}
                    {selectedLanguage?.[0]}
                  </span>{" "}
                  de tu perfil?
                </p>
                <div className="w-100 d-flex justify-content-end">
                  <button
                    className="btn btn-outline-warning me-2 fw-semibold"
                    onClick={() => setOpenConfirmDelete(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-outline-danger fw-semibold"
                    onClick={confirmDelete}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </Dialog>
          </section>
        </div>
      </div>
    </>
  );
};
