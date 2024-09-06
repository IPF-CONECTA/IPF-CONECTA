import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNoti } from "../hooks/useNoti";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import styles from "../../public/css/createCompany.module.css";
export const CreateCompanyForm = () => {
  const navigate = useNavigate();
  const noti = useNoti();

  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    description: "",
    industryId: "",
    countryOriginId: "",
    cantEmployees: "",
    logoUrl: "",
  });

  useEffect(() => {
    axios.get("http://localhost:4000/industries").then((response) => {
      setIndustries(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/find-all-countries").then((response) => {
      setCountries(response.data);
    });
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/create-company",
        {
          company: {
            name: formData.name,
            description: formData.description,
            cantEmployees: formData.cantEmployees,
            industryId: formData.industryId,
            countryOriginId: formData.countryOriginId,
            logoUrl: formData.logoUrl,
          },
          message: formData.message,
        },
        {
          headers: {
            authorization: `Bearer ${authService.getToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          noti(response.data.message, "success");
          navigate(`/crear-sede/${response.data.id}`);
        }
      })
      .catch((error) => {
        console.log(error);
        let errorMsg = error.response.data.message;
        if (!errorMsg) {
          errorMsg = error.response.data.errors[0].msg;
        }
        noti(errorMsg, "error");
        console.error("Error creating company:", error);
      });
  }

  return (
    <div className="d-flex justify-content-evenly align-items-center min-vh-100">
      <div className="company-form shadow-sm">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="d-flex justify-content-start mb-2">
            <div>
              <button className="btn btn-secondary fw-bold">Volver</button>
            </div>
            <span
              className={`fs-4 fw-semibold d-flex justify-content-center ${styles.registerText}`}
            >
              Registra tu empresa
            </span>
          </div>
          <div>
            <label htmlFor="message">Mensaje</label>
            <input
              type="text"
              name="message"
              className="form-control w-100 mb-3"
              placeholder="Cuentanos tu rol en la empresa, que funciones cumples, etc."
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Nombre de la empresa</label>
            <input
              type="text"
              name="name"
              className="form-control w-100 mb-3"
              placeholder="The Coca-Cola Company"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Descripción de la empresa</label>
            <input
              type="text"
              name="description"
              className="form-control w-100 mb-3"
              placeholder="The Coca‑Cola Company is a total beverage company with products sold in more than 200 countries and territories. Our company’s purpose is to refresh the world and make a difference. We sell multiple billion-dollar brands across several beverage categories worldwide.
"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="industryId">Industria</label>
            <select
              name="industryId"
              className="form-select mb-3"
              value={formData.industryId}
              onChange={handleInputChange}
              required
            >
              <option selected label>
                Seleccionar Industria
              </option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label htmlFor="countryOriginId">País de origen</label>
                <select
                  name="countryOriginId"
                  className="form-select"
                  value={formData.countryOriginId}
                  onChange={handleInputChange}
                  required
                >
                  <option selected label>
                    Seleccionar País
                  </option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="cantEmployees">Cantidad de empleados aprox</label>
              <input
                type="number"
                name="cantEmployees"
                className="form-control w-100 mb-3"
                placeholder="500"
                value={formData.cantEmployees}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="logoUrl">Logo de la empresa</label>
            <input
              type="file"
              name="logoUrl"
              className="form-control w-100 mb-3"
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Siguiente
            </button>
          </div>
        </form>
      </div>
      <div className="descripcion border shadow rounded p-4 d-flex flex-column w-25">
        <img
          src="./img/registro-empresa.png"
          className="mb-3"
          alt="imagen-registro"
        />
        <span className="mb-1">
          Una vez registres la empresa a la que perteneces,{" "}
          <span className="fw-semibold">se pondrá en revisión</span> hasta que
          un administrador la apruebe.
        </span>
        <span className="mb-1">
          Este proceso puede tardar{" "}
          <span className="fw-semibold"> hasta 24 horas</span> :)
        </span>
        <span>Mientra tanto podrás completar los datos de tu perfil.</span>
      </div>
    </div>
  );
};
