import React from "react";

import "../../public/nav.css";
import "../../public/support.css";

export const Support = () => {
  return (
    <>
      <main>
        <div className="support-container">
          <h2 className="support-header">Soporte de Usuarios - IPF-Conecta</h2>
          <p>
            Si tienes algún problema o necesitas asistencia, por favor llena el
            siguiente formulario y nuestro equipo de soporte se pondrá en
            contacto contigo lo antes posible.
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="issue">Descripción del problema</label>
              <textarea id="issue" name="issue" rows="4" required></textarea>
            </div>
            <div className="form-group">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
