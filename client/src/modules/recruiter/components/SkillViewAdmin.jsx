/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import styles from "../../../../public/css/skillViewAdmin.module.css";

// Función para obtener habilidades con búsqueda y paginación
const fetchSkills = async (searchQuery = '', page = 1, limit = 8) => {
  const response = await fetch(`http://localhost:4000/find-skills?query=${searchQuery}&page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Error al obtener habilidades');
  return await response.json();
};

// Función para agregar una nueva habilidad al backend
const addSkillToBackend = async (name) => {
  const response = await fetch('http://localhost:4000/create-skill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!response.ok) throw new Error('Error al agregar habilidad');
  return await response.json();
};

// Función para eliminar una habilidad del backend
const deleteSkillFromBackend = async (id) => {
  const response = await fetch(`http://localhost:4000/delete-skill/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar habilidad');
  return await response.json();
};

export default function SkillViewAdmin() {
  const [skills, setSkills] = useState([]);
  const [isAddingSkill, setIsAddingSkill] = useState(false); // Controla el modal de agregar habilidades
  const [newSkillName, setNewSkillName] = useState('');      // Almacena la nueva habilidad
  const [skillToDelete, setSkillToDelete] = useState(null);  // Habilidad a eliminar
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Cargar habilidades al montar o cuando cambie la búsqueda o la página
  useEffect(() => {
    fetchSkills(searchQuery, page).then(data => {
      setSkills(data.skills);
      setTotalPages(data.totalPages);
    }).catch(console.error);
  }, [searchQuery, page]);

  // Función para agregar una nueva habilidad
  const addSkill = async () => {
    if (!newSkillName) return;
    try {
      const newSkill = await addSkillToBackend(newSkillName);
      setSkills([...skills, newSkill]);
      setIsAddingSkill(false);  // Cerrar el modal
      setNewSkillName('');       // Limpiar el campo de entrada
    } catch (error) {
      console.error(error.message);
    }
  };

  // Función para eliminar una habilidad
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
      <div className={styles.header}>
        <h2 className={styles.title}>Habilidades</h2>
        <button onClick={() => setIsAddingSkill(true)} className={styles.addButton}>
          Agregar Habilidad
        </button>
      </div>
      
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
              <button 
                onClick={() => setSkillToDelete(skill)} 
                className={styles.deleteButton}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No se encontraron habilidades.</p>
      )}

      <div className={styles.pagination}>
        <button className={styles.pageButton} onClick={prevPage} disabled={page === 1}>
          Anterior
        </button  >
        <span className="mt-3">Página {page} de {totalPages}</span>
        <button className={styles.pageButton}  onClick={nextPage} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>

      {isAddingSkill && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Agregar Habilidad</h3>
            <input
              type="text"
              placeholder="Nombre de la habilidad..."
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className={styles.newSkillInput}
            />
            <button onClick={addSkill} className={styles.addButton}>
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
