import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RequestForm({ addRequest }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || message.trim() === "") {
      alert("Por favor, ingresa un nombre y un mensaje.");
      return;
    }
    addRequest({ name, message, image });
    setName("");
    setMessage("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Generar Solicitud</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex align-items-center">
          <img
            src={image || "https://via.placeholder.com/40"}
            alt="Usuario"
            className="me-3"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Nombre"
          />
        </div>
        <div className="mb-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            placeholder="Mensaje"
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
        <button type="submit" className="btn btn-success">
          Agregar Solicitud
        </button>
      </form>
    </div>
  );
}
