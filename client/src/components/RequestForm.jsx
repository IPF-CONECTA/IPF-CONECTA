import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/panel.css";

export default function RequestForm({ addRequest }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setmessage] = useState("");
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      companyName.trim() === "" ||
      message.trim() === ""
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    addRequest({ name, email, companyName, message, image, logo });
    setName("");
    setEmail("");
    setCompanyName("");
    setmessage("");
    setImage(null);
    setLogo(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="AdminPanel">
      <div className="Header">
        <h1>Generar Solicitud</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex align-items-center">
          <img src={image || "https://via.placeholder.com/40"} alt="Usuario" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Nombre"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Correo Electrónico"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="form-control"
            placeholder="Nombre de la Empresa"
          />
        </div>
        <div className="mb-3">
          <textarea
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            className="form-control"
            placeholder="Justificación"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="ApproveButton">
          Agregar Solicitud
        </button>
      </form>
    </div>
  );
}
