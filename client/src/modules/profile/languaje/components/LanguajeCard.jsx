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
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [editingLanguageId, setEditingLanguageId] = useState(null);

  const fetchUserLanguages = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/langs/${username}`);
      console.log("Idiomas del usuario:", response.data); 
      setProfileLanguages(response.data);
    } catch (error) {
      console.error("Error fetching user's languages:", error);
    }
  };

  const fetchAvailableLanguages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/langs");
      const uniqueLanguages = Array.from(
        new Set(response.data.map((lang) => lang.id))
      ).map((id) => {
        return response.data.find((lang) => lang.id === id);
      });
      setAvailableLanguages(uniqueLanguages);
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

  const addLanguage = async () => {
    if (!selectedLanguage || !selectedLevel) {
      alert("Por favor, selecciona un idioma y un nivel.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:4000/langs/${username}`, {
        langId: selectedLanguage.value,
        langLevelId: selectedLevel,
        username,
      });

      console.log("Idioma creado:", response.data);

      const newLanguage = {
        id: response.data.id,
        langId: selectedLanguage.value,
        langName: selectedLanguage.label,
        langLevelName: availableLanguageLevels.find(level => level.id === selectedLevel)?.level || "",
        levelId: selectedLevel,
      };

      setProfileLanguages((prevLanguages) => [
        ...prevLanguages,
        newLanguage, 
      ]);
      
      setShowModal(false);
    } catch (error) {
      console.error("Error adding language:", error);
    }
  };

  const updateLanguage = async () => {
    if (!editingLanguageId || !selectedLevel) {
      alert("Por favor, selecciona un nivel.");
      return;
    }
    try {
      await axios.put(`http://localhost:4000/langs/${editingLanguageId}`, {
        langId: selectedLanguage.value,
        levelId: selectedLevel,
        
      });
      fetchUserLanguages();
      setShowModal(false);
      setEditingLanguageId(null);
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  const deleteLanguage = async (languageId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este idioma?")) {
      try {
        await axios.delete(`http://localhost:4000/langs/${languageId}`);
        fetchUserLanguages();
      } catch (error) {
        console.error("Error deleting language:", error);
      }
    }
  };

  const handleEdit = (language) => {
    setSelectedLanguage({ value: language.langId, label: language.langName });
    setSelectedLevel(language.levelId);
    setEditingLanguageId(language.id);
    setShowModal(true);
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
              onClick={() => {
                setSelectedLanguage(null);
                setSelectedLevel("");
                setEditingLanguageId(null);
                setShowModal(true);
              }}
              className="btn d-flex align-items-center"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        <ul className="list-group w-100">
          {profileLanguages.map((language) => (
            <li
              key={language.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {language.langName} - {language.langLevelName}
              </span>
              <div>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(language)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => deleteLanguage(language.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingLanguageId ? "Actualizar Idioma" : "Agregar Idioma"}
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
            <Button
              variant="primary"
              onClick={editingLanguageId ? updateLanguage : addLanguage}
            >
              {editingLanguageId ? "Actualizar" : "Guardar"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
