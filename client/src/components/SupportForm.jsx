import React, { useState } from "react";
import axios from "axios";
import { useNoti } from "../hooks/useNoti";
import { useNavigate } from "react-router-dom";

import "../../public/support.css";

export const SupportForm = () => {
  const noti = useNoti();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:4000/contact", {
        from: email,
        name: name,
        subject: "Consulta de Soporte IPF-Conecta",
        message: issue,
      });

      if (response.status === 200) {
        noti("¡Correo enviado correctamente!", "success");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(
          "Error al enviar el formulario. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
      noti(
        "Error al enviar el formulario. Por favor, inténtalo de nuevo.",
        "error"
      );
    }
  };

  return (
    <>
      <main className="d-flex align-items-center mt-3 ">
        <div className="support-container border">
          <form onSubmit={handleSubmit} className="border-0 shadow-none p-0">
            <h2 className="support-header">
              Soporte de Usuarios - IPF-Conecta
            </h2>
            <p>
              Si tienes algún problema o necesitas asistencia, por favor llena
              el formulario y nuestro equipo de soporte se pondrá en contacto
              contigo lo antes posible.
            </p>
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="issue">Mensaje</label>
              <textarea
                id="issue"
                name="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                rows="4"
                required
              ></textarea>
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
