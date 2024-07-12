import React, { useEffect, useState } from "react";
import "../styles/CompanyRegister.css";
import axios from "axios";
import { useNoti } from "../hooks/useNoti";

export default function CompanyRegister() {
  const noti = useNoti();

  const [industries, setIndustries] = useState([]);
  const [ubications, setUbications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    address: "",
    ubication: "",
    industry: "",
    cantEmployees: "",
    message: "",
  });

  useEffect(() => {
    axios.get("http://localhost:4000/industries").then((response) => {
      setIndustries(response.data);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      axios
        .get(`http://localhost:4000/find-ubication/${searchTerm}`)
        .then((response) => {
          // Flatten the array structure from the API response
          const allUbications = response.data.flat();
          // Filter and limit to first 40 results
          let filteredUbications = allUbications.slice(0, 40);
          setUbications(filteredUbications);
        })
        .catch((error) => {
          console.error("Error fetching ubications:", error);
        });
    } else {
      setUbications([]);
    }
  }, [searchTerm]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const [locationId, locationName] = formData.ubication.split(";");
    axios
      .post(
        "http://localhost:4000/create-company",
        {
          company: {
            name: formData.name,
            description: formData.description,
            address: formData.address,
            locationName,
            locationId,
            industryId: formData.industry,
            cantEmployees: formData.cantEmployees,
          },
          message: formData.message,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          noti(response.data.message, "success");
          console.log("Empresa registrada con éxito");
        }
      })
      .catch((error) => {
        console.log(error);
        let errorMsg = error.response.data.message;
        if(!errorMsg) {
          errorMsg = error.response.data.errors[0].msg
        }
        noti(errorMsg, "error"); 
        console.error("Error creating company:", error);
      });
  }

  return (
    <div className="container">
      <h1>Registro de Empresa</h1>
      <form onSubmit={handleSubmit}>
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
          name="message"
          placeholder="Asociación"
          value={formData.message}
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
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="ubication"
          placeholder="Ubicación"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        {ubications.length > 0 && (
          <select
            name="ubication"
            value={formData.ubication}
            onChange={handleInputChange}
          >
            <option>Seleccione su ubicación</option>
            {ubications.map((ubication) => (
              <option
                key={ubication.id}
                value={ubication.id + ";" + ubication.name}
                required
              >
                {ubication.name}, {ubication.state ? ubication.state.name : ""}{" "}
                {ubication.state
                  ? ubication?.state?.country?.name
                  : ubication?.country?.name}
              </option>
            ))}
          </select>
        )}

        <select
          name="industry"
          value={formData.industry}
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

        <input
          type="number"
          name="cantEmployees"
          placeholder="Número de empleados"
          value={formData.cantEmployees}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
