import React, { useEffect, useState } from "react";
import "../styles/CompanyRegister.css";
import axios from "axios";

export default function CompanyRegister() {
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

    axios
      .post(
        "http://localhost:4000/create-company",
        {
          company: {
            name: formData.name,
            description: formData.description,
            address: formData.address,
            locationName: formData.ubication,
            industryId: formData.industry,
            cantEmployees: formData.cantEmployees,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Empresa registrada con éxito");
        }
      })
      .catch((error) => {
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
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="ubication"
          placeholder="Ubicación"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {ubications.length > 0 && (
          <select
            name="ubication"
            value={formData.ubication}
            onChange={handleInputChange}
          >
            <option value="">Seleccione su ubicación</option>
            {ubications.map((ubication) => (
              <option key={ubication.id} value={ubication.id}>
                {ubication.name}, {ubication.state ? ubication.state.name : ""}{" "}
                de{" "}
                {ubication.state
                  ? ubication.state.country.name
                  : ubication.country.name}
              </option>
            ))}
          </select>
        )}

        <select
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
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
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
