import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { useNoti } from "../hooks/useNoti";
const BASE_URL = 'http://localhost:4000/logoUrl/';

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
          <div className="container btn-lg active mt-6 w-50">
            <h1 className="text-center mb-4">
              Nos alegra que hayas confiado en nosotros
            </h1>
            <h2 className="text-center mb-4">
              Por favor, seleccione la empresa a la que pertenece:
            </h2>
            <div className="conteiner row justify-content-center mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar empresa"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <ul className="list-group  align-item-center justify-content-center">
              {filteredCompanies.map((company) => (
                <li
                  key={company.id}
                  className="list-group-item container d-flex flex-column "
                >
                    <img src={`${BASE_URL}${company.logoUrl}`} crossOrigin="anonymous" alt={`Logo de ${company.name}`}       width="50"
                    height="50"
                    className="me-3"/>
          
                  {company.name}

                  <button
                    value={company.id}
                    className="btn btn-outline-success"
                    onClick={() => {
                      handleChooseCompany(company.id), setStep(2);
                    }}
                  >
                    Selecionar
                  </button>
                </li>
              ))}
            </ul>
            <div className="container mt-6 w-100">
              <h2 className="text-center mb-4">
                La empresa no está disponible? Solicita su creación para ser
                evaluada.
              </h2>
              <div className="text-center">
                <button
                  className="btn btn-outline-success "
                  onClick={() => navigate("/registro-de-compañia")}
                >
                  Solicitar creación de empresa
                </button>
              </div>
              <div></div>
            </div>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setStep(1)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>
        );
      case 2:
        return (
          <div className="conteiner mt-6 w-100">
            <h1 className="text-center mb-4">
              Justifique su solicitud a la empresa
              <div className="row justify-content-center mb-3">
                <div className="col-md-6">
                  <textarea
                    className="form-control"
                    placeholder="Justificación"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      handleSendRequest(company, message);
                    }}
                  >
                    Enviar
                  </button>
                </div>
              </div>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setStep(1)}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => setStep(3)}
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </h1>
          </div>
        );
    }
  };

  return <div>{renderStep(1)}</div>;
};

export default SelectCompany;
