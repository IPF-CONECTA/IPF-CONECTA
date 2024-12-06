import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getUserLanguages,
  addLanguage,
  getAvailableLanguages,
  getAvailableLanguageLevels,
} from "../services/languageService.js";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Select from "react-select";
import { getProfile } from "../../../feed/services/feedServices.js";

export const LanguageSelector = ({ own }) => {
  const { username } = useParams();
  const [profileLanguages, setProfileLanguages] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
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
    fetchAvailableLanguages();
    fetchAvailableLanguageLevels();
    fetchProfile();
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
      setShowDialog(false);
      setSelectedLanguage(null);
      setSelectedLevel("");
    } catch (error) {
      console.error("Error adding language:", error);
    }
  };

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status == 200) {
      fetchUserLanguages();
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
    (own || profileLanguages.length > 0) && (
      <div className="border-bottom w-100">
        <div className="p-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="fs-5 fw-bold">Idiomas</span>
            <div className="d-flex justify-content-end">
              <button
                className="btn d-flex p-0 align-items-center me-3"
                onClick={() => setShowDialog(true)}
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
            {profileLanguages.length > 0 ? (
              profileLanguages.map((language) => {
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
              })
            ) : (
              <li className="list-group-item border rounded p-2 text-secondary">
                No se han agregado idiomas a tu perfil.
              </li>
            )}
          </ul>
        </div>

        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Agregar Idioma</DialogTitle>
          <DialogContent
            dividers
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <div className="form-group">
              <Select
                options={languageOptions}
                value={selectedLanguage}
                onChange={setSelectedLanguage}
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
                options={languageLevelOptions}
                value={languageLevelOptions.find(
                  (level) => level.value === selectedLevel
                )}
                onChange={(option) => setSelectedLevel(option.value)}
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
              onClick={handleAddLanguage}
              style={{ backgroundColor: "#212529", color: "#fff" }}
            >
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
};
