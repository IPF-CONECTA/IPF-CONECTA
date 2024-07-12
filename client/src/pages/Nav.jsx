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
    <nav className="nav-container">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Logo" className="logoImage" />
        </Link>
      </div>
      <div className="buttons">
        {authState.isLogged ? (
          <>
            <button onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span>
            </button>
            <Link to="/messages" className="messages-button d-flex">
              <span className="material-symbols-outlined">chat</span>
            </Link>
            {authState.role === "admin" ? (
              <Link to="/admin" className="admin-button d-flex">
                <span className="material-symbols-outlined">
                  admin_panel_settings
                </span>
              </Link>
            ) : null}
          </>
        ) : (
          <>
            <Link to="/login" className="login-button d-flex">
              <span className="material-symbols-outlined">login</span>
            </Link>
            <Link to="/support" className="support-button d-flex">
              <span className="material-symbols-outlined">support_agent</span>
            </Link>
          </>
        )}
        <Link to="/community" className="community-button d-flex">
          <span className="material-symbols-outlined">diversity_3</span>
        </Link>
      </div>
    </nav>
  );
};
