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
    return { skills: [], totalPages: 1 }; // Estructura consistente
  }
};

// Función para obtener el userId desde el backend
const fetchUserId = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token no disponible');
  }

  try {
    const response = await fetch('http://localhost:4000/get-user/self', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error fetching userId:", error.message);
    return null;
  }
};

// Nueva función para obtener habilidades vinculadas al usuario
const fetchUserSkills = async (userId) => {
  try {
    const response = await fetch(`http://localhost:4000/get-user-skills/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener habilidades vinculadas');
    }

    const data = await response.json();
    return data.skills || [];
  } catch (error) {
    console.error('Error fetching user skills:', error.message);
    return [];
  }
};

// Función para vincular una habilidad al usuario
const linkSkill = async (skillId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token no disponible, inicie sesión nuevamente');
    return;
  }

  try {
    const userId = await fetchUserId();
    if (!userId) {
      console.error('userId no disponible');
      return;
    }

    const response = await fetch('http://localhost:4000/add-skill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, skillId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Habilidad vinculada:', result);
    return result.skill; // Asegúrate de retornar solo la habilidad vinculada
  } catch (error) {
    console.error('Error linking skill:', error);
    alert('Error al vincular la habilidad: ' + error.message);
  }
};

// Función para desvincular una habilidad del usuario
const unlinkSkill = async (skillId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token no disponible, inicie sesión nuevamente');
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/unlink-skill', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ skillId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Habilidad desvinculada:', result);
    return result;
  } catch (error) {
    console.error('Error unlinking skill:', error);
    alert('Error al desvincular la habilidad: ' + error.message);
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
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      try {
        const data = await fetchSkills(searchQuery, page);
        setSkills(data.skills);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Error al cargar habilidades: ' + err.message);
        console.error('Error en loadSkills:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const loadUserSkills = async () => {
      const userId = await fetchUserId();
      if (userId) {
        const userSkills = await fetchUserSkills(userId);
        setLinkedSkills(userSkills);
      }
    };

    loadSkills();
    loadUserSkills(); // Cargar habilidades vinculadas
  }, [searchQuery, page]);

  const handleLinkSkill = async (skillId) => {
    const result = await linkSkill(skillId);
    if (result) {
      // Actualizar el estado de habilidades vinculadas
      setLinkedSkills(prev => [...prev, result]);

      // Actualizar el estado de habilidades disponibles para marcar la habilidad como vinculada
      setSkills(prevSkills =>
        prevSkills.map(skill =>
          skill.id === result.id ? { ...skill, linked: true } : skill
        )
      );

      setSuccessMessage('Habilidad vinculada con éxito!');
    }
  };

  const handleUnlinkSkill = async (skillId) => {
    const result = await unlinkSkill(skillId);
    if (result) {
      // Actualizar el estado de habilidades vinculadas
      setLinkedSkills(prev => prev.filter(skill => skill.id !== skillId));

      // Actualizar el estado de habilidades disponibles para marcar la habilidad como desvinculada
      setSkills(prevSkills =>
        prevSkills.map(skill =>
          skill.id === skillId ? { ...skill, linked: false } : skill
        )
      );

      setSuccessMessage('Habilidad desvinculada con éxito!');
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
                <>
                  <span className={styles.linked}>Vinculada</span>
                  <button
                    onClick={() => handleUnlinkSkill(skill.id)}
                    className={styles.unlinkButton}
                  >
                    Desvincular
                  </button>
                </>
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
      
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

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
