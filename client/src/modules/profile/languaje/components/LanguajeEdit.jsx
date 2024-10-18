import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../../../feed/services/feedServices";
import {
  getUserLanguages,
  deleteLanguage,
  getAvailableLanguages,
  getAvailableLanguageLevels,
} from "../services/languajeService.js";
import { Header } from "../../components/ProfileHeader";
import { Nav } from "../../../ui/components";
import { RecomendedAccounts } from "../../../feed/components/RecomendedAccounts";
import { useNoti } from "../../../../hooks/useNoti";
import Dialog from "@mui/material/Dialog";
import styles from "../../../../../public/css/allSkills.module.css";

export const LanguagesEdit = () => {
  const { username } = useParams();
  const [profileLanguages, setProfileLanguages] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableLanguageLevels, setAvailableLanguageLevels] = useState([]);
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
      setAvailableLanguages(languages);
    } catch (error) {
      console.error("Error fetching available languages:", error);
    }
  };

  const fetchAvailableLanguageLevels = async () => {
    try {
      const levels = await getAvailableLanguageLevels();
      setAvailableLanguageLevels(levels);
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

  const getLanguageName = (langId) => {
    const language = availableLanguages.find((lang) => lang.id === langId);
    return language ? language.name : "Idioma desconocido";
  };

  const getLanguageLevelName = (levelId) => {
    const level = availableLanguageLevels.find((lvl) => lvl.id === levelId);
    return level ? level.level : "Nivel desconocido";
  };

  return (
    <>
      <Nav />
      <div className="d-flex justify-content-evenly px-5">
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
                      <div>
                        <button
                          onClick={() => {
                            setSelectedLanguage(language);
                            setOpenConfirmDelete(true);
                          }}
                          type="button"
                          className="btn p-0 d-flex align-items-center"
                        >
                          <span className="material-symbols-outlined fw-light">
                            do_not_disturb_on
                          </span>
                        </button>
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
                    {getLanguageName(selectedLanguage?.langId)}
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
        <RecomendedAccounts />
      </div>
    </>
  );
};
