import React from "react";
import "../../public/main.css";

export const Menu = () => {
  return (
    <main className="Menu">
      <div className="Padre">
        <div>
          <h1>¿Qué es IPF - CONECTA?</h1>
          <p>
            IPF - CONECTA es una plataforma de intercambio de información y
            servicios entre los diferentes actores del sector de la construcción
            en la Región de Murcia.
          </p>
        </div>
        <div className="Hijo">
          <img
            src="../../public/ipf conecta.jpg"
            width="500px"
            height="350px"
          />
        </div>
      </div>
    </main>
  );
};
