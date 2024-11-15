import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import { getProfile } from "../../../feed/services/feedServices";
import {
  getUserLanguages,
  deleteLanguage,
  getAvailableLanguages,
  getAvailableLanguageLevels,
  updateLanguage,
} from "../services/languageService.js";
import { Header } from "../../components/ProfileHeader";
import { Nav } from "../../../ui/components";
import { useNoti } from "../../../../hooks/useNoti";
import styles from "../../../../../public/css/allSkills.module.css";

export const LanguagesEdit = () => {
  const { username } = useParams();
  const [profileLanguages, setProfileLanguages] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableLanguageLevels, setAvailableLanguageLevels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
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
      setIsModalOpen(false);
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
                      <div className="d-flex">
                        <Button
                          onClick={() => handleEditClick(language)}
                          className="me-2"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                          }}
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedLanguage(language);
                            setOpenConfirmDelete(true);
                          }}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                          }}
                        >
                          <span className="material-symbols-outlined">
                            do_not_disturb_on
                          </span>
                        </Button>
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

            <Modal
              show={isModalOpen}
              onHide={() => setIsModalOpen(false)}
              centered
              size="sm"
            >
              <Modal.Header closeButton>
                <Modal.Title>Editar idioma</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Select
                  value={newLang}
                  onChange={setNewLang}
                  options={availableLanguages}
                  className="mb-3"
                  isSearchable
                />
                <Select
                  value={newLangLevel}
                  onChange={setNewLangLevel}
                  options={availableLanguageLevels}
                  className="mb-3"
                  isSearchable
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    backgroundColor: "gray",
                    border: "none",
                    color: "black",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  style={{
                    backgroundColor: "green",
                    border: "none",
                    color: "black",
                  }}
                >
                  Guardar
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={openConfirmDelete}
              onHide={() => setOpenConfirmDelete(false)}
              centered
              size="sm"
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirmar eliminación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  ¿Estás seguro de que deseas eliminar{" "}
                  <strong>{getLanguageName(selectedLanguage?.langId)}</strong>{" "}
                  de tu perfil?
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => setOpenConfirmDelete(false)}
                  style={{
                    backgroundColor: "yellow",
                    border: "none",
                    color: "black",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={confirmDelete}
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    color: "black",
                  }}
                >
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </section>
        </div>
        <RecomendedAccounts />
      </div>
    </>
  );
};
