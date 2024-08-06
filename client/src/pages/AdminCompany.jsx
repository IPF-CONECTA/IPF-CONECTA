import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../public/main.module.css";
import { useNoti } from "../hooks/useNoti";
import Pagination from "@mui/material/Pagination";
import { authService } from "../services/authService";
import DOMPurify from "dompurify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const AdminPanel = () => {
  const noti = useNoti();
  const [activeTab, setActiveTab] = useState("Aprobada");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [justification, setJustification] = useState("");

  const [showFullDescription, setShowFullDescription] = useState(false);

  const getCompanies = async (currentPage) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/admin/get-companies/${activeTab}?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      setTotalPages(res.data.totalPages);
      if (res.data.companies.length === 0)
        noti("No se encontraron empresas", "info");
      setCompanies(res.status === 200 ? res.data.companies : []);
    } catch (error) {
      if (error.res?.status === 404) {
        setCompanies([]);
        noti("No se encontraron empresas", "info");
      } else {
        setError("Error al cargar las empresas");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCompanies(currentPage);
  }, [activeTab, currentPage]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedCompany(null);
  };

  const handleCompanyClick = async (company) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/get-company/${company.id}`
      );
      setSelectedCompany(response.data);
      console.log(response.data);
      setShowFullDescription(false);
    } catch (error) {
      setError("Error al cargar los detalles de la empresa");
    }
  };

  const handleCompanyStatus = async (id, status, justification) => {
    try {
      if (status === "Rechazada" && !justification) {
        throw new Error("Por favor, ingrese un mensaje.");
      }
      console.log("antes del patch");
      const response = await axios.patch(
        `http://localhost:4000/admin/update-company-status/${id}/${status}`,
        { justification },
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      console.log("después del patch");
      noti(`Empresa ${status.toLowerCase()} con éxito`, "success");
      setSelectedCompany(null);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== id)
      );
    } catch (error) {
      console.error("Error al actualizar el estado de la empresa:", error);
      noti(
        error.response?.data?.message || "Error al actualizar la empresa",
        "error"
      );
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const confirmRejection = () => {
    handleCompanyStatus(selectedCompany.id, "Rechazada", justification);
    handleCloseModal();
  };

  // Función para alternar mostrar/ocultar descripción completa
  const getShortDescription = (description) => {
    if (description.length <= 100) return description;
    return description.substring(0, 100) + "...";
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.AdminPanel}>
      <header className={`${styles.Header} pt-3`}>
        {["Aprobada", "Pendiente", "Rechazada"].map((tab) => (
          <button key={tab} onClick={() => handleTabClick(tab)}>
            Empresas {tab}
          </button>
        ))}
      </header>

      <div className="d-flex flex-column align-items-center justify-content-end h-100">
        <h2 className="pb-4 pt-4">
          {activeTab === "Aprobada"
            ? "Empresas Aprobadas"
            : activeTab === "Pendiente"
            ? "Empresas Pendientes de Aprobación"
            : "Empresas Rechazadas"}
        </h2>
        <div className={styles.CompanyList}>
          <div className={styles.Companies}>
            {companies.length === 0 ? (
              <p>No hay empresas disponibles en esta categoría.</p>
            ) : (
              companies.map((company) => {
                const words = company.name.split(" ");
                const firstWord = words[0];
                const restOfName = words.slice(1).join(" ");
                const displayName =
                  firstWord.length > 10
                    ? `${firstWord.substring(0, 10)}-\n${firstWord.substring(
                        10
                      )} ${restOfName}`
                    : company.name;

                return (
                  <div
                    key={company.id}
                    className={styles.Company}
                    onClick={() => handleCompanyClick(company)}
                  >
                    <img src={company.logoUrl} alt={`${company.name} Logo`} />
                    <h3 style={{ whiteSpace: "pre-wrap" }}>
                      {displayName.length > 15
                        ? `${displayName.substring(0, 15)}...`
                        : displayName}
                    </h3>
                    {company.companyIndustry && (
                      <p>{company.companyIndustry.name}</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modal de Detalles de la Empresa */}
      {selectedCompany && (
        <Dialog
          open={Boolean(selectedCompany)}
          onClose={() => setSelectedCompany(null)}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <div className={` d-flex flex-column`}>
              <div className={styles.CompanyDetails}>
                <div className="d-flex flex-row justify-content-start">
                  <img
                    src={selectedCompany.logoUrl}
                    alt={`${selectedCompany.name}`}
                    className={"m-0 me-3 rounded-pill"}
                    height={60}
                  />
                  <div className="d-flex flex-column ">
                    <strong className="fs-3">{selectedCompany.name}</strong>
                    <div className="d-flex">
                      <p className="fst-italic text-muted pe-2">
                        {selectedCompany.country.name}
                      </p>
                      {selectedCompany.country.emoji}
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-muted fw-bold">Descripción</p>
                  <div
                    className="ps-2"
                    dangerouslySetInnerHTML={{
                      __html: showFullDescription
                        ? DOMPurify.sanitize(selectedCompany.description)
                        : DOMPurify.sanitize(
                            getShortDescription(selectedCompany.description)
                          ),
                    }}
                  ></div>
                  {selectedCompany.description.length > 100 && (
                    <Button
                      className="ps-2"
                      onClick={() => {
                        setShowFullDescription(!showFullDescription);
                      }}
                      color="primary"
                    >
                      {showFullDescription ? "Ocultar" : "Leer más"}
                    </Button>
                  )}
                </div>
                <hr />
                <div className="d-flex flex-row justify-content-around pt-2 pb-2">
                  <div className="d-flex flex-column align-items-center">
                    <p className="text-muted">Web</p>
                    {selectedCompany.webUrl ? (
                      <strong>
                        <a href={selectedCompany.webUrl}>
                          {selectedCompany.webUrl}
                        </a>
                      </strong>
                    ) : (
                      <p>No disponible</p>
                    )}
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <p className="text-muted">Industria</p>
                    <strong>{selectedCompany.companyIndustry.name}</strong>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <p className="text-muted">Empleados</p>
                    <strong>{selectedCompany.cantEmployees}</strong>
                  </div>
                </div>
              </div>
              <hr />
              <div className={`d-flex align-items-center`}>
                <button
                  className="btn p-0"
                  onClick={() => alert(selectedCompany.associations[0].user.id)}
                >
                  <img
                    src={selectedCompany.associations[0].user.profilePic}
                    alt="Foto de perfil"
                    height={60}
                    width={60}
                    className="rounded-pill me-3"
                  />
                </button>
                <div>
                  <strong className="fs-5 w-100">{`${selectedCompany.associations[0].user.names} ${selectedCompany.associations[0].user.surnames}`}</strong>
                  <p className="w-50 text-muted">
                    {selectedCompany.associations[0].user.email}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>

          {activeTab === "Pendiente" && (
            <DialogActions>
              <Button color="secondary" onClick={handleOpenModal}>
                Rechazar
              </Button>
              <Button
                color="primary"
                onClick={() =>
                  handleCompanyStatus(selectedCompany.id, "Aprobada")
                }
              >
                Aprobar
              </Button>
            </DialogActions>
          )}
        </Dialog>
      )}

      {/* Modal de justificación */}
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Rechazar Empresa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa la razón del rechazo para la empresa.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Justificación"
            type="text"
            fullWidth
            variant="outlined"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={confirmRejection}
            color="secondary"
            disabled={!justification.trim()}
          >
            Confirmar Rechazo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
