import React, { useState, useEffect } from "react";
import RequestForm from "../components/RequestForm";
import RequestList from "../components/RequestList";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/panel.css";

export default function Panel() {
  const [requests, setRequests] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const addRequest = (request) => {
    setRequests([...requests, request]);
  };

  const acceptRequest = (index) => {
    setAlert({
      show: true,
      message: `Solicitud de ${requests[index].name} aceptada.`,
      type: "success",
    });
    const newRequests = requests.filter((_, i) => i !== index);
    setRequests(newRequests);
  };

  const rejectRequest = (index, reason) => {
    setAlert({
      show: true,
      message: `Solicitud de ${requests[index].name} rechazada. Razón: ${reason}`,
      type: "danger",
    });
    const newRequests = requests.filter((_, i) => i !== index);
    setRequests(newRequests);
  };

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(
        () => setAlert({ show: false, message: "", type: "" }),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div>
      <RequestForm addRequest={addRequest} />
      {alert.show && (
        <div className="container mt-3">
          <Alert
            variant={alert.type}
            onClose={() => setAlert({ show: false, message: "", type: "" })}
            dismissible
          >
            {alert.message}
          </Alert>
        </div>
      )}
      <RequestList
        requests={requests}
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
      />
    </div>
  );
}
