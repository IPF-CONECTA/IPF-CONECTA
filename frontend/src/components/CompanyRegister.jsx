import React, { useEffect, useState } from "react";
import "../styles/CompanyRegister.css";
import axios from "axios";

export default function CompanyRegister() {
  const [industries, setIndustries] = useState([]);
  const [ubication, setUbication] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/get-industries").then((response) => {
      setIndustries(response.data);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      axios
        .get(`http://localhost:4000/find-ubication/${searchTerm}`)
        .then((response) => {
          setUbication(response.data);
        });
    } else {
      setUbication([]);
    }
  }, [searchTerm]);

  function handleChange(e) {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="container">
      <h1>Registro de Empresa</h1>
      <form>
        <input type="text" name="name" placeholder="Nombre de la empresa" />
        <input type="text" name="description" placeholder="Descripción" />
        <input type="email" name="email" placeholder="Correo" />
        <input type="text" name="address" placeholder="Dirección" />

        <input
          type="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Buscar Ubicación"
        />

        <select name="industry">
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
        />
        <input type="file" name="additionalInfo" placeholder="Logo" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
