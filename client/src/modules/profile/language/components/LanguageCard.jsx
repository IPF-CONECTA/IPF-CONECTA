import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getUserLanguages,
  addLanguage,
  getAvailableLanguages,
  getAvailableLanguageLevels,
} from "../services/languageService.js";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";

export const LanguageSelector = () => {
  const { username } = useParams();
  const [profileLanguages, setProfileLanguages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableLanguageLevels, setAvailableLanguageLevels] = useState([]);

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

  useEffect(() => {
    fetchUserLanguages();
    fetchAvailableLanguages();
    fetchAvailableLanguageLevels();
  }, [username]);

  const handleAddLanguage = async () => {
    if (!selectedLanguage || !selectedLevel) {
      alert("Por favor, selecciona un idioma y un nivel.");
      return;
    }
    try {
      const newLanguage = await addLanguage(
        username,
        selectedLanguage.value,
        selectedLevel
      );
      setProfileLanguages((prevLanguages) => [...prevLanguages, newLanguage]);
      setShowModal(false);
      setSelectedLanguage(null);
      setSelectedLevel("");
    } catch (error) {
      console.error("Error adding language:", error);
    }
  };

  const languageOptions = availableLanguages.map((language) => ({
    value: language.id,
    label: language.name,
  }));

  const languageLevelOptions = availableLanguageLevels.map((level) => ({
    value: level.id,
    label: level.level,
  }));

  return (
    <div className="border-bottom w-100">
      <div className="p-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="fs-5 fw-bold">Idiomas</span>
          <div className="d-flex justify-content-end">
            <button
              className="btn d-flex p-0 align-items-center me-3"
              onClick={() => setShowModal(true)}
            >
              <span className="material-symbols-outlined text-dark-emphasis">
                add
              </span>
            </button>
            <Link
              to={`/languages/${username}/edit`}
              className="btn d-flex p-0 align-items-center"
            >
              <span className="material-symbols-outlined text-dark-emphasis">
                edit
              </span>
            </Link>
          </div>
        </div>

        <ul className="list-group w-100">
          {profileLanguages.map((language) => {
            const langDetails = availableLanguages.find(
              (lang) => lang.id === language.langId
            );
            const levelDetails = availableLanguageLevels.find(
              (level) => level.id === language.langLevelId
            );

            return (
              <li
                key={language.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  Idioma: {langDetails ? langDetails.name : "Desconocido"} -
                  Nivel del Idioma:{" "}
                  {levelDetails ? levelDetails.level : "Desconocido"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Idioma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <Select
              options={languageOptions}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              placeholder="Seleccionar idioma..."
              isClearable
              isSearchable
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="languageLevel">Nivel del idioma:</label>
            <Select
              options={languageLevelOptions}
              value={languageLevelOptions.find(
                (level) => level.value === selectedLevel
              )}
              onChange={(option) => setSelectedLevel(option.value)}
              placeholder="Seleccionar nivel..."
              isClearable
              isSearchable
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddLanguage}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
