import React, { useState } from "react";
import styles from "./css/addJobs.module.css";

const AddJob = ({ companies, onAddJob }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    companyId: "",
    locationType: "",
    locationId: "",
    modalityId: "",
    contractTypeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const company = companies.find(c => c.id === jobData.companyId);
    const newJob = {
      ...jobData,
      company: company.name,
      companyImage: company.logoUrl
    };
    onAddJob(newJob);
    setJobData({
      title: "",
      description: "",
      companyId: "",
      locationType: "",
      locationId: "",
      modalityId: "",
      contractTypeId: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
      <p>Agregar Trabajo</p>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={jobData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="companyId">Empresa</label>
        <select
          id="companyId"
          name="companyId"
          value={jobData.companyId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una empresa</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="locationType">Tipo de Ubicación</label>
        <input
          type="text"
          id="locationType"
          name="locationType"
          value={jobData.locationType}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="locationId">ID de Ubicación (opcional)</label>
        <input
          type="text"
          id="locationId"
          name="locationId"
          value={jobData.locationId}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="modalityId">ID de Modalidad</label>
        <input
          type="text"
          id="modalityId"
          name="modalityId"
          value={jobData.modalityId}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="contractTypeId">ID de Tipo de Contrato</label>
        <input
          type="text"
          id="contractTypeId"
          name="contractTypeId"
          value={jobData.contractTypeId}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Agregar Trabajo
      </button>
    </form>
  );
};

export default AddJob;
