import React, { useState, useEffect } from 'react';
import styles from "../../public/css/SkillViewUser.module.css";

// Función para obtener habilidades desde el backend
const fetchSkills = async (searchQuery = '', page = 1, limit = 8) => {
  try {
    const response = await fetch(`http://localhost:4000/find-skills?query=${searchQuery}&page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Error al obtener habilidades');
    return await response.json();
  } catch (error) {
    console.error('Error fetching skills:', error.message);
    return { skills: [], totalPages: 1 };  // Estructura consistente
  }
};

// Función para obtener el profileId desde el backend
const fetchProfileId = async () => {
  try {
      const response = await fetch('http://localhost:4000/get-user-profile');
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      // manejar el profileId aquí
  } catch (error) {
      console.error("Error fetching profileId:", error.message);
  }
};



// Función para vincular una habilidad al perfil del usuario
const linkSkill = async (skillId) => {
  const token = localStorage.getItem('token');  // Mantiene el token desde localStorage
  
  if (!token) {
    console.error('Token no disponible, inicie sesión nuevamente');
    return;
  }

  try {
    const profileId = await fetchProfileId(token);  // Obtiene el profileId desde el backend
    if (!profileId) {
      console.error('profileId no disponible');
      return;
    }

    const response = await fetch('http://localhost:4000/link-skill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ profileId, skillId }),  // Usa profileId obtenido del backend
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Habilidad vinculada:', result);
    return result;
  } catch (error) {
    console.error('Error linking skill:', error.message);
  }
};

export default function SkillViewUser() {
  const [skills, setSkills] = useState([]);
  const [linkedSkills, setLinkedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      try {
        const data = await fetchSkills(searchQuery, page);
        setSkills(data.skills);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Error al cargar habilidades.');
        console.error('Error en loadSkills:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, [searchQuery, page]);

  const handleLinkSkill = async (skillId) => {
    const result = await linkSkill(skillId);
    if (result && result.skill) {
      setLinkedSkills(prev => [...prev, result.skill]);
    }
  };

  const isSkillLinked = (skillId) => {
    return linkedSkills.some(skill => skill.id === skillId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) {
    return <p>Cargando habilidades...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
                <span className={styles.linked}>Vinculada</span>
              ) : (
                <button
                  onClick={() => handleLinkSkill(skill.id)}
                  className={styles.linkButton}
                >
                  Aprender
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
        <span className="mt-3">Página {page} de {totalPages}</span>
        <button className={styles.pageButton} onClick={nextPage} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
