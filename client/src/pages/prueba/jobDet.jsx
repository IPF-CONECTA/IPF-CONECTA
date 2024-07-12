import React from "react";
import styles from "./css/jobDet.module.css";

const JobDetail = ({ job, company, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2>{job.title}</h2>
        <p><strong>Posición:</strong> {job.position}</p>
        <p><strong>Descripción:</strong> {job.description}</p>
        <p><strong>Ubicación:</strong> {job.location}</p>
        <h3>Información de la Empresa</h3>
        {company ? (
          <>
            <img src={company.logoUrl} alt={company.name} className={styles.companyImage} />
            <p><strong>Nombre:</strong> {company.name}</p>
            <p><strong>Descripción:</strong> {company.description}</p>
            <p><strong>Industria:</strong> {company.industryId}</p>
            <p><strong>Tipo de Ubicación:</strong> {company.locationType}</p>
            <p><strong>Dirección:</strong> {company.address}</p>
          </>
        ) : (
          <p>Información de la empresa no disponible.</p>
        )}
      </div>
    </div>
  );
};

export default JobDetail;