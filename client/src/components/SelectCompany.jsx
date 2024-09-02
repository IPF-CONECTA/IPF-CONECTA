import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useNoti } from "../hooks/useNoti";
import styles from "../../public/css/SelectCompany.module.css"; 

export const SelectCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const noti = useNoti();

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await axios.get(`http://localhost:4000/get-companies`);
      setCompanies(res.data);
    };
    fetchCompanies();
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    if (search === "") {
      setFilteredCompanies([]);
    } else {
      const filtered = companies
        .filter((company) => company.name.toLowerCase().includes(search))
        .slice(0, 6);
      setFilteredCompanies(filtered);
    }
  };

  const handleChooseCompany = (companyId) => {
    setCompany(companyId);
  };

  const handleSendRequest = async (companyId) => {
    try {
      await axios.post(
        `http://localhost:4000/associate-company`,
        { companyId, message },
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      noti(
        "Solicitud enviada, espere a que un administrador apruebe la empresa.",
        "success"
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      noti(`Error: ${error}`, "error");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1 className="text-center mb-4">
              Nos alegra que hayas confiado en nosotros
            </h1>
            <h2 className="text-center mb-4">
              Por favor, seleccione la empresa a la que pertenece:
            </h2>
            <div className="row justify-content-center mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar empresa"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <ul className="list-group">
              {filteredCompanies.map((company) => (
                <li
                  key={company.id}
                  className={`list-group-item ${styles.companyItem}`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        width="50"
                        height="50"
                        className="me-3"
                      />
                      <span>{company.name}</span>
                    </div>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        handleChooseCompany(company.id);
                        setStep(2);
                      }}
                    >
                      Seleccionar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className={`mt-4 text-center ${styles.requestCreation}`}>
              <h2 className="mb-4">
                ¿La empresa no está disponible? Solicita su creación para ser
                evaluada.
              </h2>
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/registro-de-compañia")}
              >
                Solicitar creación de empresa
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-center mb-4">
              Justifique su solicitud a la empresa
            </h1>
            <div className="row justify-content-center mb-3">
              <div className="col-md-6">
                <textarea
                  className="form-control mb-3"
                  placeholder="Justificación"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className={`btn btn-outline-success ${styles.fullWidthButton}`}
                  onClick={() => {
                    handleSendRequest(company);
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>
            <div className="text-center">
              <button
                className={`btn btn-secondary ${styles.backButton}`}
                type="button"
                onClick={() => setStep(1)}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return <main className={`container mt-4 ${styles.mainContent}`}>{renderStep()}</main>;
};

export default SelectCompany;
