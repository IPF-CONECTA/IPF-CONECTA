import React, { useEffect, useState } from "react";
import "../styles/CompanyRegister.css";
import axios from "axios";
import { useNoti } from "../hooks/useNoti";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export const CreateCompanyForm = () => {
  const navigate = useNavigate();
  const noti = useNoti();

  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [logo, setLogo] = useState(null)
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
    axios.get("http://localhost:4000/countries").then((response) => {
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

  function handleImageChange(e) {
    setLogo(e.target.files[0])
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
        if (response.status === 201) {
          noti(response.data.message, "success");
          setTimeout(() => {
            navigate("/company-confirmed");
          }, 1500);
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
    <form className="container" onSubmit={handleSubmit}>
      <h1>Registro de Empresa</h1>
      <input
        type="text"
        name="name"
        placeholder="Nombre de la empresa"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleInputChange}
        required
      />

      <select
        name="industryId"
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

      <select
        name="countryOriginId"
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

      <input
        type="number"
        name="cantEmployees"
        placeholder="Número de empleados"
        value={formData.cantEmployees}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="message"
        placeholder="Mensaje"
        value={formData.message}
        onChange={handleInputChange}
        required/>
      <input type="file" value={formData.logoUrl} name="logoUrl" />
      <center><button type="submit">Enviar</button></center>
    </form>
  );
};