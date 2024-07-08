import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/panel.css";

export default function RequestList({
  requests,
  acceptRequest,
  rejectRequest,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRequests = requests.filter((request) =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRejectRequest = (index) => {
    const reason = prompt("Por favor, proporciona una razón para el rechazo:");
    if (reason) {
      rejectRequest(index, reason);
    }
  };

  return (
    <div className="AdminPanel">
      <div className="Header">
        <h1>Panel de Solicitudes</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
          placeholder="Buscar por nombre"
        />
      </div>
      <div className="Content">
        <div className="CompanyList">
          <h2>Solicitudes Pendientes</h2>
          <ul className="Companies">
            {filteredRequests.map((request, index) => (
              <li
                key={index}
                className="Company"
                onClick={() => setSelectedRequest(request)}
              >
                <div>
                  <img
                    src={request.image || "https://via.placeholder.com/40"}
                    alt="Usuario"
                  />
                  <div>
                    <strong>{request.name}</strong>
                    <p>{request.email}</p>
                  </div>
                </div>
                <img
                  src={request.logo || "https://via.placeholder.com/40"}
                  alt="Empresa"
                />
                <button
                  onClick={() => acceptRequest(index)}
                  className="ApproveButton"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleRejectRequest(index)}
                  className="RejectButton"
                >
                  Rechazar
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedRequest && (
          <div className="CompanyDetails">
            <h2>Detalles de la Solicitud</h2>
            <img
              src={selectedRequest.image || "https://via.placeholder.com/100"}
              alt="Usuario"
            />
            <h3>{selectedRequest.name}</h3>
            <h4>{selectedRequest.email}</h4>
            <img
              src={selectedRequest.logo || "https://via.placeholder.com/100"}
              alt="Empresa"
            />
            <h4>{selectedRequest.companyName}</h4>
            <p>{selectedRequest.justification}</p>
          </div>
        )}
      </div>
    </div>
  );
}
