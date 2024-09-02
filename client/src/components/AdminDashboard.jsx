import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para manejar la redirección
import styles from "../../public/css/dashboard.module.css";
import axios from "axios";

export const AdminDashboard = () => {
  const [associations, setAssociations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate(); // Para redirigir

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/get-associations/Pendiente", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setAssociations(response.data.associations || []);
      } catch (error) {
        console.error("Error fetching associations:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/get-companies/Aprobada", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setCompanies(response.data.companies || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchAssociations();
    fetchCompanies();
  }, []);

  const handleManageClick = (type) => {
    // Redirigir a la página de administración según el tipo
    navigate(`/admin/manage-${type}`);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Asociaciones</h2>
        <div className={styles.sectionContent}>
          {associations.slice(0, 3).map((assoc) => (
            <div key={assoc.id} className={styles.card}>
              <p className={styles.cardDescription}>Mensaje: {assoc.message}</p>
              <p className={styles.cardDescription}>Usuario: {assoc.profile.names} {assoc.profile.surnames}</p>
              <img src={assoc.profile.profilePic} alt="Profile" className={styles.profilePic} />
              <p className={styles.cardDescription}>Empresa: {assoc.company.name}</p>
              <img src={assoc.company.logoUrl} alt="Company Logo" className={styles.companyLogo} />
            </div>
          ))}
          {associations.length === 0 && (
            <p className={styles.noData}>No hay asociaciones disponibles.</p>
          )}
        </div>
        <button 
          className={styles.manageButton} 
          onClick={() => handleManageClick('associations')}
        >
          Administrar Asociaciones
        </button>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Empresas</h2>
        <div className={styles.sectionContent}>
          {companies.slice(0, 4).map((company) => (
            <div key={company.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{company.name}</h3>
              <img src={company.logoUrl} alt="Company Logo" className={styles.companyLogo} />
            </div>
          ))}
          {companies.length === 0 && (
            <p className={styles.noData}>No hay empresas disponibles.</p>
          )}
        </div>
        <button 
          className={styles.manageButton} 
          onClick={() => handleManageClick('companies')}
        >
          Administrar Empresas
        </button>
      </div>
    </div>
  );
};
