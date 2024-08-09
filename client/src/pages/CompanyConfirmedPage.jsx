import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../public/css/confirm-company.module.css";

export const CompanyConfirmedPage = () => {
  const navigate = useNavigate();

  setTimeout(() => navigate("/"), 3000);
  
  return (
    <div className={styles.confirm}>
      <h1>Registro de Empresa Exitoso</h1>
      <p>
        Tu empresa ha sido registrada correctamente y ahora se encuentra en
        revisión. Por favor, espera a que la empresa sea confirmada.
      </p>
    </div>
  );
};
