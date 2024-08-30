import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNoti } from "../hooks/useNoti";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export const CreateCompanyForm = () => {
  const navigate = useNavigate();
  const noti = useNoti();

  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [companyId, setCompanyId] = useState(null);
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
    <>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <h1>Registro de Empresa</h1>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="message"
            className="form-control"
            placeholder="Mensaje"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nombre de la empresa"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="industryId"
            className="form-select"
            value={formData.industryId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Industria</option>
            {industries.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <select
                name="countryOriginId"
                className="form-select"
                value={formData.countryOriginId}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar País</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                name="cantEmployees"
                className="form-control"
                placeholder="Cantidad de empleados"
                value={formData.cantEmployees}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="file"
            name="logoUrl"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Siguiente
          </button>
        </div>
      </form>
    </>
  );
};
