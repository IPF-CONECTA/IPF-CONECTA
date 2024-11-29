import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../public/css/nav.module.css";

function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.trim() === "") {
        setUsers([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:4000/search-users?query=${searchQuery}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUsers(data);
        } else {
          setError(data.message || "No se encontraron usuarios.");
        }
      } catch (err) {
        setError("Hubo un error al buscar usuarios.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const goToProfile = (username) => {
    navigate(`/perfil/${username}`);
  };

  return (
    <div className="user-search">
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="user-search-input"
      />

      {searchQuery && (
        <div className="dropdown">
          {loading && <p className="loading-text">Cargando...</p>}
          {error && <p className="error-text">{error}</p>}
          {!loading && !error && users.length > 0 && (
            <div className="dropdown-list">
              {users.map((user) => (
                <button
                  key={user.id}
                  className="dropdown-item"
                  onClick={() => goToProfile(user.username)}
                >
                  <div style={{ width: '24px', height: '24px', overflow: 'hidden', borderRadius: '50%' }}>
                    <img
                      src={user.profilePic || "../../../../public/egresado.png"}
                      alt="Avatar"
                      className="user-avatar"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <span className="username">{user.username}</span>
                </button>
              ))}
            </div>
          )}
          {!loading && !error && users.length === 0 && (
            <p className="no-results">No se encontraron usuarios.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserSearch;
