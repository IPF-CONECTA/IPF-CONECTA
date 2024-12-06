import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import DOMPurify from "dompurify";
import { useNoti } from "../../../hooks/useNoti";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
import styles from "../../../../public/css/associationPanel.module.css";
import { DialogTitle, DialogContentText } from "@mui/material";

export const AdminCompaniesPanel = () => {
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
        `${BASE_URL}/admin/get-companies/${activeTab}?page=${currentPage}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      setTotalPages(res.data.totalPages);
      if (res.data.companies.length === 0)
        noti("No se encontraron empresas", "info");
      setCompanies(res.status === 200 ? res.data.companies : []);
    } catch (error) {
      if (error.response?.status === 404) {
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
        `${BASE_URL}/admin/get-company/${company.id}`
      );
      setSelectedCompany(response.data);
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
      const response = await axios.patch(
        `${BASE_URL}/admin/update-company-status/${id}/${status}`,
        { justification },
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
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
    <div className={`container mt-4 ${styles.AdminPanel}`}>
      <div className="btn-group mb-3" role="group">
        {["Aprobada", "Pendiente", "Rechazada"].map((tab) => (
          <button
            key={tab}
            className={`btn btn-outline-success ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Empresas {activeTab}</h5>
          <div className={styles.CompanyList}>
            {companies.length === 0 ? (
              <p>No hay empresas disponibles en esta categoría.</p>
            ) : (
              companies.map((company) => (
                <div
                  key={company.id}
                  className="d-flex flex-column align-items-center p-3 m-2 bg-light rounded"
                  onClick={() => handleCompanyClick(company)}
                >
                  <img
                    src={`${BASE_URL}/logoUrl/${company.logoUrl}`}
                    height={40}
                    width={40}
                    className="rounded-circle m-0"
                    alt={`Logo de ${company.name}`}
                  />
                  <h3 style={{ whiteSpace: "pre-wrap" }}>
                    {company.name.length > 15
                      ? `${company.name.substring(0, 15)}...`
                      : company.name}
                  </h3>
                  {company.companyIndustry && (
                    <p>{company?.companyIndustry.name}</p>
                  )}
                </div>
              ))
            )}
          </div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {selectedCompany && (
        <Dialog
          open={Boolean(selectedCompany)}
          onClose={() => setSelectedCompany(null)}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <div className={`d-flex flex-column`}>
              <div className={styles.CompanyDetails}>
                <div className="d-flex flex-row justify-content-start">
                  <img
                    src={`${BASE_URL}/logoUrl/${selectedCompany.logoUrl}`}
                    alt={`Logo de ${selectedCompany.name}`}
                    className={"m-0 me-3 rounded-pill"}
                    height={60}
                  />
                  <div className="d-flex flex-column">
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
            </div>
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
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Rechazar Empresa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa la razón del rechazo para la empresa.
          </DialogContentText>
          <input
            type="text"
            fullWidth
            className="mt-2"
            placeholder="Justificación"
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
