import React from "react";
import { Link } from "react-router-dom";
import "../../public/css/NotFound.css"; 
import iconoipf from "../../public/iconoipf.png"; 

export const NotFound = () => {
  return (
    <div className="not-f ound">
      <div className="logo-container">
        <img src={iconoipf} alt="Logo" className="logo" />
      </div>
      <div className="content">
        <h1>404 - Not Found</h1>
        <p>Lo siento, la página que buscas no existe.</p>
        <Link to="/">
          <button className="home-button">Volver al Inicio</button>
        </Link>
      </div>
    </div>
  );
};

