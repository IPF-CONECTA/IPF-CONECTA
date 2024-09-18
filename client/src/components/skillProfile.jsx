/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import styles from "../../public/css/skillProfile.module.css";

// Función para obtener habilidades con búsqueda y paginación
const fetchSkills = async (searchQuery, page = 1, limit = 10) => {
  const response = await fetch(`http://localhost:4000/find-skills?query=${searchQuery}&page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Error al obtener habilidades');
  return await response.json();
};

export default function SkillsProfile() {
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Cargar habilidades al montar el componente o cuando cambie la búsqueda o página
    fetchSkills(searchQuery, page).then(data => {
      setSkills(data.skills);
      setTotalPages(data.totalPages);
    }).catch(console.error);
  }, [searchQuery, page]);

  const addSkill = async (skill) => {
    try {
      const newSkill = await addSkillToBackend(skill);
      setSkills([...skills, newSkill]);
    } catch (error) {
      console.error(error.message);
    }
    setIsAddingSkill(false);
  };

  const removeSkill = async (id) => {
    try {
      await deleteSkillFromBackend(id);
      setSkills(skills.filter(s => s.id !== id));
    } catch (error) {
      console.error(error.message);
    }
    setSkillToDelete(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reiniciar la página al cambiar la búsqueda
  };

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Habilidades</h2>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar habilidad..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {skills.length > 0 ? (
        <ul className={styles.skillList}>
          {skills.map(skill => (
            <li key={skill.id} className={styles.skill}>
              {skill.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No se encontraron habilidades.</p>
      )}

      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={page === 1}>
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={nextPage} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>

      {isEditing && (
        <div>
          <button onClick={() => setIsAddingSkill(true)} className={styles.addButton}>
            Agregar Habilidad
          </button>
          {skills.length > 0 ? (
            <ul className={styles.editSkillList}>
              {skills.map(skill => (
                <li key={skill.id} className={styles.editSkill}>
                  {skill.name}
                  <button onClick={() => setSkillToDelete(skill)} className={styles.deleteButton}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>No tienes habilidades agregadas</p>
          )}
        </div>
      )}

      {isAddingSkill && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Agregar Habilidad</h3>
            <input
              type="text"
              placeholder="Nombre de la habilidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={() => addSkill(searchQuery)} className={styles.addButton}>
              Agregar
            </button>
            <button onClick={() => setIsAddingSkill(false)} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {skillToDelete && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>¿Estás seguro?</h3>
            <p>Eliminarás permanentemente la habilidad "{skillToDelete.name}".</p>
            <div className={styles.modalActions}>
              <button onClick={() => setSkillToDelete(null)} className={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={() => removeSkill(skillToDelete.id)} className={styles.deleteButton}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
