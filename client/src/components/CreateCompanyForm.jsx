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
    // Fetch industries and countries data
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
      setPreviewLogo(URL.createObjectURL(file)); // Create a temporary URL for preview
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
      formDataToSend.append("logoUrl", logo); // Append the logo file to the FormData
    }

    axios
    .post("http://localhost:4000/create-company", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${authService.getToken()}`,
      },
    })
    .then((response) => {
      console.log(response); // Agrega un log para verificar la respuesta completa
      const companyId = response.data.id;
  
      if (response.status === 201 && companyId) {
        noti(response.data.message, "success");
        navigate(`/crear-sede/${companyId}`);
      } else {
        noti("No se pudo obtener el ID de la empresa", "error");
      }
    })
    .catch((error) => {
      console.log(error);
      let errorMsg = error.response?.data?.message || "Error inesperado.";
      if (!errorMsg && error.response?.data?.errors) {
        errorMsg = error.response.data.errors[0].msg;
      }
      noti(errorMsg, "error");
      console.error("Error creating company:", error);
    });
  
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <h1>Registro de Empresa</h1>
          </div>

          {/* Message input */}
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

          {/* Name input */}
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

          {/* Description input */}
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

          {/* Industry selection */}
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

          {/* Country selection and number of employees */}
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

          {/* File input for logo */}
          <div className="mb-3">
            <input
              type="file"
              name="logoUrl"
              className="form-control"
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
    </div>
  );
};
