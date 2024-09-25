import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../../../styles/RecruiterPanel.css";

export function RecruiterPanel() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/get-companies")
      .then((response) => {
        setCompanies(response.data);
        setFilteredCompanies(response.data); // Inicialmente mostrar todos los resultados
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Función para manejar cambios en el input de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(value)
    );

    setFilteredCompanies(filtered);
  };

  return (
    <div className="container">
      <h1>Panel de mentores</h1>
      <h2>Selecciona la empresa a la que perteneces.</h2>
      <input
        type="search"
        id="searchInput"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar empresa..."
      />
      <h3>Empresas a la que quizas pertenezcas: </h3>
      <div id="searchResults">
        {filteredCompanies.map((company) => (
          <Link to="/">
            <div key={company.id} className="result">
              {company.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
