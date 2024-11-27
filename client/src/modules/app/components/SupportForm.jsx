import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useNoti } from "../../../hooks/useNoti";
import "../../../../public/support.css";
import { BASE_URL } from "../../../constants/BASE_URL";
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
      const response = await axios.post(`${BASE_URL}/contact`, {
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
      <main
        className="d-flex align-items-center justify-content-center gap-3 ms-5"
        style={{ height: "100vh" }}
      >
        <div className=" border d-flex align-items-center p-3 rounded shadow">
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
            <div className="form-group mb-0 ">
              <button
                type="submit"
                className="m-0 btn btn-primary fw-bold fs-5 w-100"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
        <img height={450} src="./img/contact.jpg" alt="contact" />
      </main>
    </>
  );
};
