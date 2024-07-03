import React, { useState } from "react";
import styles from "../../public/main.module.css";

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedCompany(null);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleApprove = () => {
    // logica para email
    alert("Empresa aprobada y correo electrónico enviado.");
    setSelectedCompany(null);
  };

  const handleReject = () => {
    const reason = prompt("Por favor ingresa la razón del rechazo:");
    if (reason) {
      // logica para email
      alert("Empresa rechazada y correo electrónico enviado.");
      setSelectedCompany(null);
    }
  };

  const companies = {
    approved: [
      {
        logo: "../../public/logoipf.png",
        name: "Empresa Aprobada 1",
        industry: "Tecnología",
        user: {
          uuid: "user-uuid-1",
          name: "Juan Pérez",
          email: "juan.perez@example.com",
          profilePic: "../../public/user1.jpg",
          cityState: "Ciudad de México, CDMX",
        },
        company: {
          uuid: "company-uuid-1",
          name: "Empresa Aprobada 1",
          description: "Descripción de la Empresa Aprobada 1",
          industry: "Tecnología",
          cityStateCountry: "Ciudad de México, CDMX, México",
          address: "Calle Falsa 123",
          employees: 50,
        },
      },
    ],
    pending: [
      {
        logo: "../../public/logoipf.png",
        name: "Empresa Pendiente 1",
        industry: "Marketing",
        user: {
          uuid: "user-uuid-2",
          name: "María López",
          email: "maria.lopez@example.com",
          profilePic: "../../public/user2.jpg",
          cityState: "Monterrey, NL",
        },
        company: {
          uuid: "company-uuid-2",
          name: "Empresa Pendiente 1",
          description: "Descripción de la Empresa Pendiente 1",
          industry: "Marketing",
          cityStateCountry: "Monterrey, NL, México",
          address: "Avenida Siempre Viva 742",
          employees: 30,
        },
      },
    ],
    rejected: [
      {
        logo: "../../public/logoipf.png",
        name: "Empresa Rechazada 1",
        industry: "Finanzas",
        user: {
          uuid: "user-uuid-3",
          name: "Carlos Martínez",
          email: "carlos.martinez@example.com",
          profilePic: "../../public/user3.jpg",
          cityState: "Guadalajara, JAL",
        },
        company: {
          uuid: "company-uuid-3",
          name: "Empresa Rechazada 1",
          description: "Descripción de la Empresa Rechazada 1",
          industry: "Finanzas",
          cityStateCountry: "Guadalajara, JAL, México",
          address: "Boulevard de los Sueños Rotos 456",
          employees: 100,
        },
      },
    ],
  };

  return (
    <main className={styles.AdminPanel}>
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
        <div className={styles.CompanyList}>
          <h2>
            {activeTab === "approved"
              ? "Empresas Aprobadas"
              : activeTab === "pending"
              ? "Empresas Pendientes de Aprobación"
              : "Empresas Rechazadas"}
          </h2>
          <div className={styles.Companies}>
            {companies[activeTab].map((company, index) => (
              <div
                className={styles.Company}
                key={index}
                onClick={() => handleCompanyClick(company)}
              >
                <img src={company.logo} alt={`${company.name} Logo`} />
                <h3>{company.name}</h3>
                <p>{company.industry}</p>
                <p>Solicitado por: {company.user.name}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedCompany && (
          <div className={styles.CompanyDetails}>
            <h3>Detalles de la Empresa</h3>
            <h4>Datos del usuario</h4>
            <p>UUID: {selectedCompany.user.uuid}</p>
            <p>Nombre: {selectedCompany.user.name}</p>
            <p>Email: {selectedCompany.user.email}</p>
            <img src={selectedCompany.user.profilePic} alt="Profile" />
            <p>Ciudad/Estado: {selectedCompany.user.cityState}</p>

            <h4>Datos de la empresa</h4>
            <p>UUID: {selectedCompany.company.uuid}</p>
            <img src={selectedCompany.company.logo} alt="Company Logo" />
            <p>Nombre de la empresa: {selectedCompany.company.name}</p>
            <p>Descripción: {selectedCompany.company.description}</p>
            <p>Industria: {selectedCompany.company.industry}</p>
            <p>
              Ciudad/Estado/País: {selectedCompany.company.cityStateCountry}
            </p>
            <p>Dirección: {selectedCompany.company.address}</p>
            <p>Cantidad de empleados: {selectedCompany.company.employees}</p>

            {activeTab === "pending" && (
              <>
                <button
                  className={styles.ApproveButton}
                  onClick={handleApprove}
                >
                  Aprobar
                </button>
                <button className={styles.RejectButton} onClick={handleReject}>
                  Rechazar
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
};
