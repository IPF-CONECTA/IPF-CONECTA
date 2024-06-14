import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../public/iconoipf.png";
import "../../public/nav.css"; 

export const Nav = () => {
  return (
    <nav className="nav-container">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Logo" className="logoImage" />
        </Link>
      </div>
      <div className="buttons">
        <Link to="/register" className="register-button">
          <span className="material-symbols-outlined">app_registration</span>
          Registrarse
        </Link>
        <Link to="/login" className="login-button">
          <span className="material-symbols-outlined">login</span>Iniciar sesión
        </Link>
        <Link to="/support" className="support-button">
          <span className="material-symbols-outlined">support_agent</span>
          Soporte
        </Link>
        <Link to="/community" className="community-button">
          <span className="material-symbols-outlined">diversity_3</span>
          Comunidad
        </Link>
        <Link to="/messages" className="messages-button">
          <span className="material-symbols-outlined">chat</span>Mensajes
        </Link>
      </div>
    </nav>
  );
};