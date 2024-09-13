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
  });
  const [logo, setLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/industries").then((response) => {
      setIndustries(response.data);
    });

    axios.get("http://localhost:4000/find-all-countries").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setLogo(file);
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("company[name]", formData.name);
    formDataToSend.append("company[description]", formData.description);
    formDataToSend.append("company[industryId]", formData.industryId);
    formDataToSend.append("company[countryOriginId]", formData.countryOriginId);
    formDataToSend.append("company[cantEmployees]", formData.cantEmployees);
    formDataToSend.append("message", formData.message);

    if (logo) {
      formDataToSend.append("logoUrl", logo);
    }

    axios
      .post("http://localhost:4000/create-company", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then((response) => {
        const companyId = response.data.id;

        if (response.status === 201 && companyId) {
          noti(response.data.message, "success");
          navigate(`/crear-sede/${companyId}`);
        } else {
          noti("No se pudo obtener el ID de la empresa", "error");
        }
      })
      .catch((error) => {
        let errorMsg = error.response?.data?.message || "Error inesperado.";
        if (!errorMsg && error.response?.data?.errors) {
          errorMsg = error.response.data.errors[0].msg;
        }
        noti(errorMsg, "error");
        console.error("Error creating company:", error);
      });
  };

  return (
    <div className="d-flex justify-content-evenly align-items-center min-vh-100">
      <div className="company-form shadow-sm">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="d-flex justify-content-between mb-2">
            <button 
              type="button" 
              className="btn btn-secondary fw-bold"
              onClick={() => navigate(-1)} // Vuelve a la página anterior
            >
              Volver
            </button>
            <span
              className={`fs-4 fw-semibold d-flex justify-content-center ${styles.registerText}`}
            >
              Registra tu empresa
            </span>
          </div>

          {/* Message input */}
          <div className="mb-3">
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

          {/* Name input */}
          <div className="mb-3">
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

          {/* Description input */}
          <div className="mb-3">
            <label htmlFor="description">Descripción de la empresa</label>
            <input
              type="text"
              name="description"
              className="form-control w-100 mb-3"
              placeholder="Descripción de la empresa"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Industry selection */}
          <div className="mb-3">
            <label htmlFor="industryId">Industria</label>
            <select
              name="industryId"
              className="form-select mb-3"
              value={formData.industryId}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Seleccionar Industria
              </option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>

          {/* Country and employee count */}
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="countryOriginId">País de origen</label>
              <select
                name="countryOriginId"
                className="form-select"
                value={formData.countryOriginId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Seleccionar País
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
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

          {/* Logo input */}
          <div className="mb-3">
            <label htmlFor="logoUrl">Logo de la empresa</label>
            <input
              type="file"
              name="logoUrl"
              className="form-control w-100 mb-3"
              onChange={handleInputChange}
            />
          </div>

          {/* Logo preview */}
          {previewLogo && (
            <div className="mb-3 text-center">
              <img
                src={previewLogo}
                alt="Previsualización del Logo"
                className="img-thumbnail"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}

          {/* Submit button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Siguiente
            </button>
          </div>
        </form>
      </div>

      {/* Side description */}
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
