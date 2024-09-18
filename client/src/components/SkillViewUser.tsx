/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import styles from "../../public/css/skillUser.module.css"

// Función para obtener habilidades con búsqueda y paginación
const fetchSkills = async (searchQuery = '', page = 1, limit = 8) => {
  const response = await fetch(`http://localhost:4000/find-skills?query=${searchQuery}&page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Error al obtener habilidades');
  return await response.json();
};

// Función para vincular una habilidad a la cuenta del usuario
const linkSkillToUser = async (skillId) => {
  const response = await fetch('http://localhost:4000/link-skill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skillId })
  });
  if (!response.ok) throw new Error('Error al vincular habilidad');
  return await response.json();
};

export default function SkillViewUser() {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [linkedSkills, setLinkedSkills] = useState([]); // Lista de habilidades vinculadas

  // Cargar habilidades al montar o cuando cambie la búsqueda o la página
  useEffect(() => {
    fetchSkills(searchQuery, page).then(data => {
      setSkills(data.skills);
      setTotalPages(data.totalPages);
    }).catch(console.error);

    // Obtener habilidades vinculadas al usuario
    fetchLinkedSkills().then(data => {
      setLinkedSkills(data.linkedSkills);
    }).catch(console.error);
  }, [searchQuery, page]);

  // Función para obtener habilidades vinculadas
  const fetchLinkedSkills = async () => {
    const response = await fetch('http://localhost:4000/user-skills');
    if (!response.ok) throw new Error('Error al obtener habilidades vinculadas');
    return await response.json();
  };

  // Función para vincular una habilidad
  const linkSkill = async (skillId) => {
    try {
      await linkSkillToUser(skillId);
      // Actualizar las habilidades vinculadas
      const updatedLinkedSkills = [...linkedSkills, skillId];
      setLinkedSkills(updatedLinkedSkills);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Función para determinar si una habilidad está vinculada
  const isSkillLinked = (skillId) => {
    return linkedSkills.includes(skillId);
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
              {isSkillLinked(skill.id) ? (
                <span className={styles.linkedTag}>Vinculada</span>
              ) : (
                <button 
                  onClick={() => linkSkill(skill.id)} 
                  className={styles.linkButton}>
                  Vincular
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No se encontraron habilidades.</p>
      )}

      <div className={styles.pagination}>
        <button className={styles.pageButton} onClick={prevPage} disabled={page === 1}>
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button className={styles.pageButton} onClick={nextPage} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
