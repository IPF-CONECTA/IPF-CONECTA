import React from "react";
import "../../public/nav.css";
import logoImage from "../../public/iconoipf.png";

export const Navigation = () => {
  return (
    <nav>
      <div className="logo">
        <a href="#">
          <img src={logoImage} alt="Logo" className="logoImage" />
        </a>
      </div>
      <div className="buttons">
        <button className="register-button">
          <span class="material-symbols-outlined">app_registration</span>
          Registrarse
        </button>
        <button className="login-button">
          <span class="material-symbols-outlined">login</span>Iniciar sesión
        </button>
        <button className="support-button">
          <span class="material-symbols-outlined">support_agent</span>Soporte
        </button>
        <button className="community-button">
          <span class="material-symbols-outlined">diversity_3</span>Comunidad
        </button>
        <button className="messages-button">
          <span class="material-symbols-outlined">chat</span>Mensajes
        </button>
      </div>
    </nav>
  );
};
