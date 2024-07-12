import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import styles from "../../public/main.module.css";
import { useNoti } from "../hooks/useNoti";

export const AdminPanel = () => {
  const showSnackBar = useNoti();
  const [activeTab, setActiveTab] = useState("approved");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);

      try {
        let endpoint = "";
        if (activeTab === "approved") {
          endpoint = "Aprobada";
        } else if (activeTab === "pending") {
          endpoint = "Pendiente";
        } else if (activeTab === "rejected") {
          endpoint = "Rechazada";
        }

        const response = await axios.get(
          `http://localhost:4000/admin/get-companies/${endpoint}`
        );
        if (response.status === 200) {
          setCompanies(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setCompanies([]);
          showSnackBar("No se encontraron empresas", "info");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedCompany(null);
  };

  const handleCompanyClick = async (company) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/get-company/${company.id}`
      );
      setSelectedCompany(response.data);
      console.log(response);
    } catch (error) {
      setError("Error al cargar los detalles de la empresa");
    }
  };

  const handleApprove = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/admin/update-company-status/${selectedCompany.id}/Aprobada`
      );
      showSnackBar("Empresa aprobada y correo electrónico enviado.", "success");
      setSelectedCompany(null);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== selectedCompany.id)
      );
    } catch (error) {
      showSnackBar("Error al aprobar la empresa.", "error");
    }
  };

  const handleReject = async () => {
    const justification = prompt("Por favor ingresa la razón del rechazo:");
    if (justification) {
      try {
        await axios.patch(
          `http://localhost:4000/admin/update-company-status/${selectedCompany.id}/Rechazada`,
          { justification }
        );
        showSnackBar(
          "Empresa rechazada y correo electrónico enviado.",
          "success"
        );
        setSelectedCompany(null);
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.id !== selectedCompany.id)
        );
      } catch (error) {
        showSnackBar("Error al rechazar la empresa.", "error");
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.AdminPanel}>
      <header className={styles.Header}>
        <button onClick={() => handleTabClick("approved")}>
          Empresas Aprobadas
        </button>
        <button onClick={() => handleTabClick("pending")}>
          Empresas pendientes de aprobación
        </button>
        <button onClick={() => handleTabClick("rejected")}>
          Empresas rechazadas
        </button>
      </header>

      <section className={styles.Content}>
        {error ? (
          <div>{error}</div>
        ) : (
          <div className={styles.CompanyList}>
            <h2>
              {activeTab === "approved"
                ? "Empresas Aprobadas"
                : activeTab === "pending"
                ? "Empresas Pendientes de Aprobación"
                : "Empresas Rechazadas"}
            </h2>
            <div className={styles.Companies}>
              {companies.length === 0 ? (
                <p>No hay empresas disponibles en esta categoría.</p>
              ) : (
                companies.map((company) => (
                  <div
                    key={company.id}
                    className={styles.Company}
                    onClick={() => handleCompanyClick(company)}
                  >
                    <img src={company.logoUrl} alt={`${company.name} Logo`} />
                    <h3>{company.name}</h3>
                    {company.companyIndustry && (
                      <p>{company.companyIndustry.name}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {selectedCompany && (
          <div className={styles.ModalContainer}>
            <div className={styles.ModalContent}>
              <div className={styles.ModalHeader}>
                <h3>Detalles de la Empresa</h3>
                <button
                  className={styles.CloseButton}
                  onClick={() => setSelectedCompany(null)}
                >
                  Cerrar
                </button>
              </div>
              <div className={styles.DetailSection}>
                <div className={styles.UserDetails}>
                  <h4>Usuario que lo solicitó:</h4>

                  <p>
                    <strong>Nombres y Apellidos:</strong>{" "}
                    {`${selectedCompany.associations[0].user.names} ${selectedCompany.associations[0].user.surnames}`}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedCompany.associations[0].user.email}
                  </p>
                  <p>
                    <strong>Foto de Perfil:</strong>{" "}
                    <img
                      src={selectedCompany.associations[0].user.profilePic}
                      alt="Foto de perfil"
                      className={styles.ProfilePic}
                    />
                  </p>
                </div>
                <div className={styles.CompanyDetails}>
                  <h4>Datos de la Empresa:</h4>
                  <img
                    src={selectedCompany.logoUrl}
                    alt={`${selectedCompany.name} Logo`}
                    className={styles.CompanyLogo}
                  />
                  <p>
                    <strong>Nombre:</strong> {selectedCompany.name}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {selectedCompany.description}
                  </p>
                  <p>
                    <strong>Industria:</strong>{" "}
                    {selectedCompany.companyIndustry.name}
                  </p>
                  <div>
                    <div>
                      <p>
                        Ubicación:{" "}
                        {selectedCompany.location[0] === "country"
                          ? `${selectedCompany.location[1].name}`
                          : selectedCompany.location[0] === "state"
                          ? `${selectedCompany.location[1].name}, ${selectedCompany.location[1].country.name}`
                          : selectedCompany.location[0] === "city"
                          ? `${selectedCompany.location[1].name}, ${selectedCompany.location[1].state.name}, ${selectedCompany.location[1].state.country.name}`
                          : "No especificado"}
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong>Dirección:</strong> {selectedCompany.address}
                  </p>
                  <p>
                    <strong>Cantidad de empleados:</strong>{" "}
                    {selectedCompany.cantEmployees}
                  </p>
                </div>
              </div>
              {activeTab === "pending" && (
                <div className={styles.ButtonContainer}>
                  <button
                    className={styles.ApproveButton}
                    onClick={handleApprove}
                  >
                    Aprobar
                  </button>
                  <button
                    className={styles.RejectButton}
                    onClick={handleReject}
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
