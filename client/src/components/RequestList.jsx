import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RequestList({
  requests,
  acceptRequest,
  rejectRequest,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRequests = requests.filter((request) =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center">Panel de Solicitudes</h1>
      <div className="mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
          placeholder="Buscar por nombre"
        />
      </div>
      <div
        className="request-list-container"
        style={{
          maxHeight: "400px",
          overflowX: "auto",
          overflowY: "auto",
          marginBottom: "20px",
          margin: "20px",
        }}
      >
        <ul className="list-group">
          {filteredRequests.map((request, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <img
                  src={request.image || "https://via.placeholder.com/40"}
                  alt="Usuario"
                  className="me-3"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <strong>{request.name}</strong>: {request.message}
              </div>
              <div>
                <button
                  onClick={() => acceptRequest(index)}
                  className="btn btn-success btn-sm me-2"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => rejectRequest(index)}
                  className="btn btn-danger btn-sm"
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
