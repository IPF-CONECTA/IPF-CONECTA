import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../public/iconoipf.png";
import "../../public/nav.css";
import { authContext } from "../context/auth/Context";

export const Nav = () => {
  const { authState, logout } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logoImage}
            alt="Logo"
            width="35"
            height="40"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {authState.isLogged ? (
              <>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn nav-link">
                    <span className="material-symbols-outlined">logout</span>
                  </button>
                </li>
                <li className="nav-item">
                  <Link to="/messages" className="nav-link">
                    <span className="material-symbols-outlined">chat</span>
                  </Link>
                </li>
                {authState.role === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link">
                        <span className="material-symbols-outlined">
                          admin_panel_settings
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/panel" className="nav-link">
                        <span className="material-symbols-outlined">
                          admin_panel_settings
                        </span>
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <span className="material-symbols-outlined">login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/support" className="nav-link">
                    <span className="material-symbols-outlined">
                      support_agent
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link to="/buscar-empleo" className="nav-link">
                <span className="material-symbols-outlined">work</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/community" className="nav-link">
                <span className="material-symbols-outlined">diversity_3</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
