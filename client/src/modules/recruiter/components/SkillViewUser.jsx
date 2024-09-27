import React, { useState, useEffect } from 'react'; 
import styles from "../../../../public/css/SkillViewUser.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

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
    throw new Error('Token no disponible, inicie sesión nuevamente');
  }

  try {
    const userId = await fetchUserId();
    if (!userId) {
      throw new Error('userId no disponible');
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
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

// Función para desvincular una habilidad del usuario
const unlinkSkill = async (skillId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token no disponible, inicie sesión nuevamente');
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
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export default function SkillViewUser() {
  const [skills, setSkills] = useState([]);
  const [linkedSkills, setLinkedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      try {
        const data = await fetchSkills(searchQuery, page);
        setSkills(data.skills);
        setTotalPages(data.totalPages);
      } catch (err) {
        setErrorMessage('Error al cargar habilidades: ' + err.message);
        console.error('Error en loadSkills:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, [searchQuery, page]);

  // Debounce para la búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      const loadUserSkills = async () => {
        try {
          const userId = await fetchUserId();
          if (userId) {
            const userSkills = await fetchUserSkills(userId);
            setLinkedSkills(userSkills);
          }
        } catch (err) {
          setErrorMessage('Error al cargar habilidades vinculadas: ' + err.message);
          console.error('Error en loadUserSkills:', err.message);
        }
      };

      loadUserSkills();
    }, 300); // Ajusta el tiempo de debounce aquí (300 ms)

    return () => {
      clearTimeout(handler); // Limpiar el timeout
    };
  }, [searchQuery]); // Dependencia del estado de búsqueda

  const handleLinkSkill = async (skillId) => {
    try {
      const result = await linkSkill(skillId);
      if (result) {
        // Actualizar el estado de habilidades vinculadas inmediatamente
        setLinkedSkills(prev => [...prev, result]);

        // Actualizar el estado de habilidades disponibles, marcando la habilidad como vinculada
        setSkills(prevSkills =>
          prevSkills.map(skill =>
            skill.id === result.id ? { ...skill, linked: true } : skill
          )
        );

        // Mostrar mensaje de éxito
        setSuccessMessage('Habilidad vinculada con éxito!');
        
        // Limpiar el mensaje después de 3 segundos
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('Error al vincular la habilidad: ' + error.message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleUnlinkSkill = async (skillId) => {
    try {
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

        // Mostrar mensaje de éxito
        setSuccessMessage('Habilidad desvinculada con éxito!');
        
        // Limpiar el mensaje después de 3 segundos
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('Error al desvincular la habilidad: ' + error.message);
      setTimeout(() => setErrorMessage(''), 3000);
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

  const closeSuccessMessage = () => {
    setSuccessMessage('');
  };

  const closeErrorMessage = () => {
    setErrorMessage(null);
  };

  if (loading) {
    return <p>Cargando habilidades...</p>;
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

      {/* Mostrar mensaje de éxito */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" aria-label="Close" onClick={closeSuccessMessage}></button>
        </div>
      )}

      {/* Mostrar mensaje de error */}
      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
          <button type="button" className="btn-close" aria-label="Close" onClick={closeErrorMessage}></button>
        </div>
      )}

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
                    className={`${styles.unlinkButton} btn btn-danger btn-sm ms-2`}
                  >
                    Desvincular
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleLinkSkill(skill.id)}
                  className={`${styles.linkButton} btn btn-primary btn-sm ms-2`}
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
        <button className="btn btn-info me-2" onClick={prevPage} disabled={page === 1}>
          Anterior
        </button>
        <span className="mx-3">Página {page} de {totalPages}</span>
        <button className="btn btn-info ms-2" onClick={nextPage} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
