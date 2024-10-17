import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getUserLanguages,
  updateLanguage,
  deleteLanguage,
} from "../services/languajeService.js";
import { Button } from "react-bootstrap";

export const LanguagesEdit = () => {
  const { username } = useParams();
  const [profileLanguages, setProfileLanguages] = useState([]);

  const fetchUserLanguages = async () => {
    try {
      const languages = await getUserLanguages(username);
      setProfileLanguages(languages);
    } catch (error) {
      console.error("Error fetching user's languages:", error);
    }
  };

  useEffect(() => {
    fetchUserLanguages();
  }, [username]);

  const handleUpdate = async (language) => {
    alert(`Editar idioma: ${language.langId}`);
  };

  const handleDelete = async (languageId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este idioma?")) {
      try {
        await deleteLanguage(languageId);
        setProfileLanguages((prevLanguages) =>
          prevLanguages.filter((lang) => lang.id !== languageId)
        );
      } catch (error) {
        console.error("Error deleting language:", error);
      }
    }
  };

  return (
    <div className="bg-body-tertiary w-100">
      <div className="p-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="fs-5 fw-bold">Editar Idiomas</span>
          <Link to={`/perfil/${username}`} className="btn btn-secondary">
            Volver
          </Link>
        </div>

        <ul className="list-group w-100">
          {profileLanguages.map((language) => (
            <li
              key={language.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                Idioma: {language.langId} - Nivel del Idioma:{" "}
                {language.langLevelId}
              </span>
              <div>
                <Button
                  variant="warning"
                  onClick={() => handleUpdate(language)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(language.id)}
                  className="ms-2"
                >
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
