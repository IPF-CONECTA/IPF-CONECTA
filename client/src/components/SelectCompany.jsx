import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { authService } from "../services/authService";

function SelectCompany() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await axios.get(`http://localhost:4000/get-companies`);
      setCompanies(res.data);
    };
    fetchCompanies();
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    if (search === "") {
      setFilteredCompanies([]);
    } else {
      const filtered = companies
        .filter((company) => company.name.toLowerCase().includes(search))
        .slice(0, 6);
      setFilteredCompanies(filtered);
    }
  };

  const handleCompanyClick = async (companyId) => {
    try {
      console.log({ companyid: companyId, token: authService.getToken() });

      await axios.post(`http://localhost:4000/associate-company`, companyId, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
    } catch (error) {
      alert("Error al crear la asociación");
      console.log(error);
    }
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
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <img
              src={company.logoUrl}
              alt={`${company.name} logo`}
              width="50"
              height="50"
              className="me-3"
            />
            {company.name}

            <button
              value={company.id}
              className="btn btn-primary"
              onClick={() => handleCompanyClick(company.id)}
            >
              Selecionar
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-center mb-4">
        La empresa no está disponible? Solicita su creación para ser evaluada.
      </h2>
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/registro-de-compania")}
        >
          Solicitar creación de empresa
        </button>
      </div>
    </div>
  );
}

export default SelectCompany;
