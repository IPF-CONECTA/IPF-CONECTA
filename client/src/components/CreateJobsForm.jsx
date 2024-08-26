import { useEffect, useState } from "react";
import axios from "axios";
import { useNoti } from "../hooks/useNoti";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const CreateJobsForm = () => {
  const navigate = useNavigate();
  const noti = useNoti();

  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    companyId: "",
    modalityId: "",
    contractTypeId: "",
    skills: "",
  });

  useEffect(() => {
    axios.get("http://localhost:4000/get-companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        noti("Error fetching companies", "danger");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/get-modalities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setModalities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching modalities:", error);
        noti("Error fetching modalities", "danger");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/get-contract-types", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setContractTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contract types:", error);
        noti("Error fetching contract types", "danger");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/find-skills")
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
        noti("Error fetching skills", "danger");
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

    if (formData.description.length < 10) {
      noti("La descripción debe tener al menos 10 caracteres", "danger");
      return;
    }

    axios.post(
        "http://localhost:4000/create-job",
        {
          jobOffer: {
            title: formData.title,
            description: formData.description,
            salary: formData.salary,
            companyId: formData.companyId,
            modalityId: formData.modalityId,
            contractTypeId: formData.contractTypeId,
            skills: formData.skills,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        noti("Job created successfully", "success");
        navigate("/jobs");
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
        noti("Error creating job", "danger");
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <h1 className="mb-4 text-center">Crear oferta laboral</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Salario</label>
            <input
              type="text"
              name="salary"
              className="form-control"
              value={formData.salary}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Empresa</label>
            <select
              name="companyId"
              className="form-select"
              value={formData.companyId}
              onChange={handleInputChange}
            >
              <option value="">Selecciona la empresa</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Modalidad</label>
            <select
              name="modalityId"
              className="form-select"
              value={formData.modalityId}
              onChange={handleInputChange}
            >
              <option value="">Selecciona la modalidad</option>
              {modalities.map((modality) => (
                <option key={modality.id} value={modality.id}>
                  {modality.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de contrato</label>
            <select
              name="contractTypeId"
              className="form-select"
              value={formData.contractTypeId}
              onChange={handleInputChange}
            >
              <option value="">Selecciona el tipo de contrato</option>
              {contractTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Skills</label>
            <select
              name="skills"
              className="form-select"
              value={formData.skills}
              onChange={handleInputChange}
            >
              <option value="">Selecciona la skill</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Crear oferta</button>
        </form>
      </div>
    </div>
  );
};
