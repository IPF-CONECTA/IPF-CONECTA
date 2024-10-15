import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";

export const LanguageSelector = () => {
  const { username } = useParams();

  const [profileLanguages, setProfileLanguages] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableLanguageLevels, setAvailableLanguageLevels] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");

  const fetchUserLanguages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/langs/${username}`
      );
      setProfileLanguages(response.data);
    } catch (error) {
      console.error("Error fetching user's languages:", error);
    }
  };

  const fetchAvailableLanguages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/langs");
      setAvailableLanguages(response.data);
    } catch (error) {
      console.error("Error fetching available languages:", error);
    }
  };

  const fetchAvailableLanguageLevels = async () => {
    try {
      const response = await axios.get("http://localhost:4000/lang-levels");
      setAvailableLanguageLevels(response.data);
    } catch (error) {
      console.error("Error fetching available language levels:", error);
    }
  };

  useEffect(() => {
    fetchUserLanguages();
    fetchAvailableLanguages();
    fetchAvailableLanguageLevels();
  }, [username]);

  const handleModalSave = async () => {
    if (selectedLanguage && selectedLevel) {
      const langData = {
        langId: selectedLanguage.value,
        langLevelId: selectedLevel,
        username,
      };
      try {
        if (editingIndex !== null) {
          await axios.put(
            `http://localhost:4000/langs/${profileLanguages[editingIndex].id}`,
            langData
          );
        } else {
          await axios.post(`http://localhost:4000/langs/${username}`, langData);
        }
        fetchUserLanguages();
      } catch (error) {
        console.error("Error saving language:", error);
      }
    }

    setSelectedLanguage(null);
    setSelectedLevel("");
    setEditingIndex(null);
    setShowModal(false);
  };

  const addLanguage = () => {
    setSelectedLanguage(null);
    setSelectedLevel("");
    setEditingIndex(null);
    setShowModal(true);
  };

  const editLanguage = (index) => {
    setSelectedLanguage({
      value: profileLanguages[index].langId,
      label: profileLanguages[index].langName,
    });
    setSelectedLevel(profileLanguages[index].langLevelId);
    setEditingIndex(index);
    setShowModal(true);
  };

  const deleteLanguage = async (index) => {
    try {
      await axios.delete(
        `http://localhost:4000/langs/${profileLanguages[index].id}`
      );
      fetchUserLanguages();
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  const languageOptions = availableLanguages.map((language) => ({
    value: language.id,
    label: language.name,
  }));

  return (
    <div className="bg-body-tertiary w-100">
      <div className="p-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="fs-5 fw-bold">Idiomas del perfil</span>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={addLanguage}
              className="btn d-flex align-items-center"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        <ul className="list-group w-100">
          {profileLanguages.map((language, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {language.langName} - {language.langLevelName}
              </span>
              <div className="d-flex">
                <button
                  onClick={() => editLanguage(index)}
                  className="btn btn-warning me-2"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  onClick={() => deleteLanguage(index)}
                  className="btn btn-danger"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingIndex !== null ? "Editar Idioma" : "Agregar Idioma"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <Select
                options={languageOptions}
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                placeholder="Buscar idioma..."
                isClearable
                isSearchable
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="languageLevel">Nivel del idioma:</label>
              <select
                id="languageLevel"
                className="form-control"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Seleccione un nivel</option>
                {availableLanguageLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.level}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleModalSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
