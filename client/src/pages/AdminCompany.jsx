import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../public/main.module.css";
import { useNoti } from "../hooks/useNoti";
import Pagination from "@mui/material/Pagination";

// Importar componentes de Material-UI
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
        `http://localhost:4000/admin/get-companies/${activeTab}?page=${currentPage}`
      );
      console.log(res);
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

  const lastCompanyIndex = currentPage * 10;
  const firstCompanyIndex = lastCompanyIndex - 10;

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
      await axios.patch(
        `http://localhost:4000/admin/update-company-status/${id}/${status}`,
        { justification }
      );
      noti(`Empresa ${status.toLowerCase()} con éxito`, "success");
      setSelectedCompany(null);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== id)
      );
    } catch (error) {
      console.log(error);
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
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.AdminPanel}>
      <header className={styles.Header}>
        {["Aprobada", "Pendiente", "Rechazada"].map((tab) => (
          <button key={tab} onClick={() => handleTabClick(tab)}>
            Empresas {tab}
          </button>
        ))}
      </header>

      <div>
        <h2>
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
          <DialogContent className={styles.DetailsModal}>
            <div className={styles.DetailSection}>
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
                  <strong>Descripción:</strong>{" "}
                  {selectedCompany.description.length > 100 ? (
                    <>
                      {showFullDescription
                        ? selectedCompany.description
                        : `${selectedCompany.description.substring(0, 100)}...`}
                      <Button onClick={toggleDescription} color="primary">
                        {showFullDescription ? "Ocultar" : "Leer más"}
                      </Button>
                    </>
                  ) : (
                    selectedCompany.description
                  )}
                </p>
                <p>
                  <strong>Industria:</strong>{" "}
                  {selectedCompany.companyIndustry.name}
                </p>
                <p>
                  <strong>Ubicación:</strong>{" "}
                  {selectedCompany.location[0] === "country"
                    ? `${selectedCompany.location[1].name}`
                    : selectedCompany.location[0] === "state"
                    ? `${selectedCompany.location[1].name}, ${selectedCompany.location[1].country.name}`
                    : selectedCompany.location[0] === "city"
                    ? `${selectedCompany.location[1].name}, ${selectedCompany.location[1].state.name}, ${selectedCompany.location[1].state.country.name}`
                    : "No especificado"}
                </p>
                <p>
                  <strong>Dirección:</strong> {selectedCompany.address}
                </p>
                <p>
                  <strong>Cantidad de empleados:</strong>{" "}
                  {selectedCompany.cantEmployees}
                </p>
              </div>
              <div className={styles.UserDetails}>
                <h4 className="w-50">Solicitante:</h4>
                <p className="w-50">
                  <strong>Nombre:</strong>{" "}
                  {`${selectedCompany.associations[0].user.names} ${selectedCompany.associations[0].user.surnames}`}
                </p>
                <p className="w-50">
                  <strong>Email:</strong>{" "}
                  {selectedCompany.associations[0].user.email}
                </p>
                <p className="w-50">
                  <strong>Foto de Perfil:</strong>{" "}
                  <img
                    src={selectedCompany.associations[0].user.profilePic}
                    alt="Foto de perfil"
                    className={styles.ProfilePic}
                  />
                </p>
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
