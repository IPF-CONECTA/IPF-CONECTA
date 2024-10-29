import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../../../../public/css/dashboard.module.css";
import { BASE_URL } from "../../../constants/BASE_URL";
// URL base de tu servidor para imágenes

export const AdminDashboard = () => {
  const [associations, setAssociations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/get-associations/Pendiente",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAssociations(response.data.associations || []);
      } catch (error) {
        console.error("Error fetching associations:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/get-companies/Aprobada",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompanies(response.data.companies || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchAssociations();
    fetchCompanies();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Asociaciones</h2>
        <div className={styles.sectionContent}>
          {associations.slice(0, 3).map((assoc) => (
            <div key={assoc.id} className={styles.card}>
              <p className={styles.cardDescription}>Mensaje: {assoc.message}</p>
              <p className={styles.cardDescription}>
                Usuario: {assoc.profile.names} {assoc.profile.surnames}
              </p>
              <img
                src={`${BASE_URL}/images/${assoc.profile.profilePic}`}
                alt="Profile"
                className={styles.profilePic}
              />
              <p className={styles.cardDescription}>
                Empresa: {assoc.company.name}
              </p>
              <img
                src={`${BASE_URL}/logoUrl/${assoc.company.logoUrl}`}
                alt="Company Logo"
                className={styles.companyLogo}
              />
            </div>
          ))}
          {associations.length === 0 && (
            <p className={styles.noData}>No hay asociaciones disponibles.</p>
          )}
        </div>
        <button
          className={styles.manageButton}
          onClick={() => navigate("/admin/asociaciones")}
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
              <img
                src={`${BASE_URL}/logoUrl/${company.logoUrl}`}
                alt="Company Logo"
                className={styles.companyLogo}
              />
            </div>
          ))}
          {companies.length === 0 && (
            <p className={styles.noData}>No hay empresas disponibles.</p>
          )}
        </div>
        <button
          className={styles.manageButton}
          onClick={() => navigate("/admin/empresas")}
        >
          Administrar Empresas
        </button>
      </div>
    </div>
  );
};
