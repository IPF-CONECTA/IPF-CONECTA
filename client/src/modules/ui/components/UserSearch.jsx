import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/BASE_URL"; // Importación correcta de BASE_URL
import "../../../../public/css/UserSerach.module.css";
import styles from "../../../../public/css/jobSearch.module.css";
import { FaSearch } from "react-icons/fa";
import { authContext } from "../../../context/auth/Context";
import axios from "axios";

function UserSearch({ open }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { authState } = useContext(authContext);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setSearchQuery("");
    setUsers([]);
  }, [open]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.trim() === "") {
        setUsers([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          `${BASE_URL}/search-users?query=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res);

        setUsers(res.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    const debounceTimeout = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const goToProfile = (username) => {
    navigate(`/perfil/${username}`);
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <button
          type="submit"
          onClick={() => setOpen(!open)}
          className={`btn p-0 me-1 d-flex ${styles.searchButton}`}
        >
          <FaSearch
            size={26}
            className="ms-1"
            color={`${authState.isLogged ? "#117bb9" : "#7c848b"}`}
          />
        </button>
        {open && (
          <div
            className={`w-100 border rounded-3 overflow-hidden d-flex align-items-center`}
          >
            <input
              autoComplete="off"
              type="text"
              name="searchBar"
              id="SearchBar"
              value={searchQuery}
              onChange={handleSearchChange}
              className={`w-100 m-0 p-1 border-0`}
              placeholder="Buscar"
            />
          </div>
        )}
      </div>

      {searchQuery && (
        <div
          className="dropdown position-fixed bg-white rounded-3 border overflow-hidden me-3 shadow p-1"
          style={{ zIndex: "1001", width: "180px", left: "50px" }}
        >
          {!loading && !error && users.length > 0 && (
            <div className="dropdown-list">
              {users.slice(0, 3).map((user, index) => (
                <>
                  <div
                    key={user.id}
                    className={`dropdown-item user-container`}
                    onClick={() => goToProfile(user.username)}
                    style={{
                      zIndex: 1000,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        overflow: "hidden",
                      }}
                      className={`d-flex w-100 gap-2 align-items-center text-truncate ${
                        index !== 2 && users.length > index
                          ? "border-bottom"
                          : ""
                      }`}
                    >
                      <img
                        src={
                          user.profile.profilePic
                            ? `${BASE_URL}/images/${user.profile.profilePic}`
                            : "/img/default-avatar.png"
                        }
                        alt={`${user.username} avatar`}
                        className="rounded-circle"
                        height={30}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      <span className="">{user.username}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
          {loading ? (
            <div className="d-flex flex-column gap-2">
              <div className="d-flex gap-1 placeholder-wave">
                <p className="placeholder col-2 rounded-circle bg-dark-subtle fs-4"></p>
                <p className="placeholder col-10 rounded-3 bg-dark-subtle"></p>
              </div>
              <div className="d-flex gap-1 placeholder-wave">
                <p className="placeholder col-2 rounded-circle bg-dark-subtle fs-4"></p>
                <p className="placeholder col-10 rounded-3 bg-dark-subtle"></p>
              </div>
              <div className="d-flex gap-1 placeholder-wave">
                <p className="placeholder col-2 rounded-circle bg-dark-subtle fs-4"></p>
                <p className="placeholder col-10 rounded-3 bg-dark-subtle"></p>
              </div>
            </div>
          ) : (
            error && <p className="text-secondary">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserSearch;
