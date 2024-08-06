import React, { useState, useEffect } from "react";
import RequestForm from "../components/RequestForm";
import RequestList from "../components/RequestList";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/panel.css";
import { getVerifications } from "../services/adminServices";
import { Nav } from "./Nav";
import { useNoti } from "../hooks/useNoti";
import { set } from "react-hook-form";

export default function Panel() {
  const [associations, setAssociations] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [tab, setTab] = useState("Pendiente");
  const noti = useNoti();

  useEffect(() => {
    setAssociations([]);

    const getAssociations = async () => {
      const { data, statusCode } = await getVerifications(tab);
      if (statusCode === 404) {
        return noti("No se encontraron asociaciones", "warning");
      }
      if (statusCode !== 200) {
        return noti("Error al obtener las solicitudes", "error");
      }
      setAssociations(data);
    };

    getAssociations();
  }, [tab]);

  const handleTabClick = async (tab) => {
    setTab(tab);
    setAssociations([]);
  };

  const acceptRequest = (index) => {
    setAlert({
      show: true,
      message: `Solicitud de ${associations[index].name} aceptada.`,
      type: "success",
    });
    const newAssociations = associations.filter((_, i) => i !== index);
    setAssociations(newAssociations);
  };

  const rejectRequest = (index, reason) => {
    setAlert({
      show: true,
      message: `Solicitud de ${associations[index].name} rechazada. Razón: ${reason}`,
      type: "danger",
    });
    const newAssociations = associations.filter((_, i) => i !== index);
    setAssociations(newAssociations);
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
    <>
      <Nav />
      <div>
        <button
          className="btn btn-success"
          onClick={() => handleTabClick("Pendiente")}
        >
          Pendientes
        </button>
        <button
          className="btn btn-success"
          onClick={() => handleTabClick("Aprobada")}
        >
          Aprobadas
        </button>
        <button
          className="btn btn-success"
          onClick={() => handleTabClick("Rechazada")}
        >
          Rechazadas
        </button>
        {/*<RequestForm addRequest={addRequest} />
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
        )} */}

        <RequestList associations={associations} />
      </div>
    </>
  );
}
