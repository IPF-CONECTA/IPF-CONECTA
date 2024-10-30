import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { authService } from "../../auth/services/authService";
import { useNoti } from "../../../hooks/useNoti";
import { findCompanies } from "../services/recruiterServices";
import { BASE_URL } from "../../../constants/BASE_URL";

import styles from "../../../../public/css/SelectCompany.module.css";

export const SelectCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState(null);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const navigate = useNavigate();
  const noti = useNoti();

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (search.length >= 1) {
      const timeout = setTimeout(async () => {
        const res = await findCompanies(search);
        if (res.status !== 200) {
          return;
        }
        setCompanies(res.data);
      }, 500);

      setDebounceTimeout(timeout);
    } else {
      setCompanies([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (company == null) return;
  }, [company]);

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
            <div className="d-flex align-items-center justify-content-evenly vh-100 bg-light">
              <div className={`border rounded p-3 ${styles.welcoming}`}>
                <h1 className="fw-bold text-dark">
                  Gracias por confiar en nosotros :)
                </h1>
                <span>
                  En primera instancia,{" "}
                  <span className="fw-semibold">
                    selecciona la empresa a la que perteneces
                  </span>{" "}
                  para comenzar a utilizar la plataforma. Esto nos permitirá
                  validar tu vínculo con la compañía y{" "}
                  <span className="fw-semibold">
                    habilitar las funcionalidades correspondientes
                  </span>
                  .
                </span>
                <img
                  className={`mt-4 ${styles.image}`}
                  src="./img/flat-youth-people-hugging-together.png"
                  alt="empresa"
                />
              </div>
              <div>
                <div className="mt-4">
                  <label htmlFor="company" className="form-label text-muted">
                    Por favor, selecciona la empresa a la cual representas
                  </label>
                  <div className="position-relative">
                    <div className="border rounded d-flex">
                      <input
                        type="text"
                        id="company"
                        className="form-control m-0 border-0"
                        placeholder="Busca tu empresa"
                        value={search}
                        onChange={handleSearchChange}
                      />
                      <button
                        className="btn text-secondary"
                        onClick={() => {
                          setSearch("");
                        }}
                      >
                        X
                      </button>
                    </div>
                    {search.length > 0 && companies.length > 0 && (
                      <ul className="position-absolute w-100 list-group">
                        {companies.map((company) => (
                          <li
                            onClick={() => {
                              handleChooseCompany(company);
                              setStep(2);
                            }}
                            key={company.id}
                            className="list-group-item list-group-item-action d-flex align-items-center"
                          >
                            <img
                              src={`${BASE_URL}/logoUrl/${company.logoUrl}`}
                              alt="logo"
                              width={30}
                              className="me-2"
                            />
                            <span className="fw-semibold">{company.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button
                    onClick={() => {
                      navigate("/registrar-empresa");
                    }}
                    className="btn btn-outline-success"
                  >
                    Registra tu empresa
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="vh-100 d-flex justify-content-center gap-4 align-items-center">
              <div className="d-flex flex-column w-50">
                <div className="d-flex flex-column align-items-center mb-3">
                  <span className="fs-1 fw-semibold text-center ">
                    Justifique su solicitud a la empresa
                  </span>
                  <span className="w-75 text-center">
                    Queremos asegurarnos de que trabajas en {company.name}.
                    <span className="fw-semibold">
                      {" "}
                      Cuéntanos brevemente sobre tu rol
                    </span>{" "}
                    y actividades diarias. Esto nos ayudará a{" "}
                    <span className="fw-semibold">
                      {" "}
                      validar tu conexión
                    </span>{" "}
                    con la organización.
                  </span>
                </div>
                <div className="row justify-content-center">
                  <div className="w-75 p-0">
                    <textarea
                      className={`form-control mb-3 ${styles.textArea}`}
                      placeholder="Comencé en esta empresa como asistente de recursos humanos hace dos años, y a lo largo del tiempo fui escalando hasta convertirme en reclutador senior. Actualmente, me encargo de liderar procesos de selección y colaborar en la planificación de estrategias de contratación para múltiples áreas."
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="d-flex">
                      <button
                        className={`btn btn-secondary d-flex fw-bold ${styles.backButton}`}
                        type="button"
                        onClick={() => setStep(1)}
                      >
                        Volver
                      </button>
                      <button
                        className={`btn btn-outline-success fw-bold ${styles.fullWidthButton}`}
                        onClick={() => {
                          handleSendRequest(company);
                        }}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center w-25">
                <div className=" rounded shadow d-flex flex-column text-center p-4">
                  <span className="fs-3 fw-bold">¿Qué debo poner?</span>
                  <span className="">
                    Escribe un resumen de tu día a día o tus responsabilidades
                    principales en la empresa. Este mensaje nos ayudará a
                    validar tu puesto.
                  </span>
                  <img
                    src="./img/recruiters.png"
                    className={`mt-3 ${styles.image}`}
                    alt="recruiters"
                  />
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return <main>{renderStep()}</main>;
};

export default SelectCompany;
