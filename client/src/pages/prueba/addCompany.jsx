import React, { useState } from "react";
import styles from "./css/addCompany.module.css";

const AddCompany = ({ onAddCompany }) => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    industryId: "",
    locationType: "",
    locationId: "",
    address: "",
    logoUrl: "",
    cantEmployees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCompany(companyData);
    setCompanyData({
      name: "",
      description: "",
      industryId: "",
      locationType: "",
      locationId: "",
      address: "",
      logoUrl: "",
      cantEmployees: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
      <p>Agregar  Compañia</p>
        <label htmlFor="name">Nombre de la Empresa</label>
        <input
          type="text"
          id="name"
          name="name"
          value={companyData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={companyData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="industryId">ID de Industria</label>
        <input
          type="number"
          id="industryId"
          name="industryId"
          value={companyData.industryId}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="locationType">Tipo de Ubicación</label>
        <input
          type="text"
          id="locationType"
          name="locationType"
          value={companyData.locationType}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="locationId">ID de Ubicación</label>
        <input
          type="number"
          id="locationId"
          name="locationId"
          value={companyData.locationId}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address">Dirección (Opcional)</label>
        <input
          type="text"
          id="address"
          name="address"
          value={companyData.address}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="logoUrl">URL del Logo</label>
        <input
          type="url"
          id="logoUrl"
          name="logoUrl"
          value={companyData.logoUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="cantEmployees">Cantidad de Empleados (Opcional)</label>
        <input
          type="text"
          id="cantEmployees"
          name="cantEmployees"
          value={companyData.cantEmployees}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Agregar Empresa
      </button>
    </form>
  );
};

export default AddCompany;