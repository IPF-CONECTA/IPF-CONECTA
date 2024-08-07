import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SelectCompany() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Cargar todas las empresas al montar el componente
    const fetchCompanies = async () => {
      const res = await axios.get(`http://localhost:4000/get-companies`);
      setCompanies(res.data);
      setFilteredCompanies(res.data);
    };
    fetchCompanies();
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(search)
    );
    setFilteredCompanies(filtered);
  };

  return (
    <div className="container mt-6 w-100">
      <h1 className="text-center mb-4">
        Nos alegra que hayas confiado en nosotros
      </h1>
      <h2 className="text-center mb-4">
        Por favor, seleccione la empresa a la que pertenece:
      </h2>
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar empresa"
            onChange={handleSearch}
          />
        </div>
      </div>
      <ul className="list-group">
        {filteredCompanies.map((company) => (
          <li
            key={company.id}
            className="list-group-item d-flex align-items-center"
          >
            <img
              src={company.logoUrl}
              alt={`${company.name} logo`}
              width="30"
              height="30"
              className="me-3"
            />
            {company.name}
          </li>
        ))}
      </ul>
      <h2 className="text-center mb-4">
        La empresa no esta disponible? Solicita su creación para ser evaluada.
      </h2>
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/registro-de-compañia")}
        >
          Solicitar creación de empresa
        </button>
      </div>
    </div>
  );
}

export default SelectCompany;
