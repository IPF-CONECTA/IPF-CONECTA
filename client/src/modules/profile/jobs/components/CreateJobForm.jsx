import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { useNoti } from "../../../../hooks/useNoti";
import styles from "../../../../../public/css/CreateJobsForm.module.css";
import {
  findSkills,
  getCompaniesByUser,
  getContractTypes,
  getModalities,
} from "../../../recruiter/job/services/jobServices";
import Editor from "../../../ui/components/Editor";
import { Dialog } from "@mui/material";
import { SkillSearch } from "../../skills/components/FindSkills";

export const CreateJobForm = ({ openModal, setOpenModal, onJobSubmit }) => {
  const navigate = useNavigate();
  const noti = useNoti();
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const quillRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: `
      <h1>Descripción del trabajo</h1>
      <p>En esta sección debes describir las responsabilidades y tareas que tendrá el candidato que ocupe este puesto.</p>
      <h2>Requisitos</h2>
      <ul>
        <li>Requisito 1</li>
        <li>Requisito 2</li>

      </ul>
      <h2>Beneficios</h2>
      <ul>

        <li>Beneficio 1</li>
        <li>Beneficio 2</li>

      </ul>

    `,
    companyId: "",
    modalityId: "",
    contractTypeId: "",
    skills: [],
    applicationLink: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.description.length < 10) {
      noti("La descripción debe tener al menos 10 caracteres", "danger");
      return;
    }

    axios
      .post(
        "http://localhost:4000/create-job",
        { jobOffer: { ...formData }, skills: formData.skills },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        noti("Empleo creado", "success");
        setOpenModal(false);
        onJobSubmit();
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
        noti("Error creating job", "danger");
      });
  };
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (search.length >= 1) {
      const timeout = setTimeout(async () => {
        fetchSkills(search);
      }, 500);

      setDebounceTimeout(timeout);
    } else {
      setSkills([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [search]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompaniesByUser();
        if (data.length <= 1) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            companyId: data[0].company.id,
          }));
        }
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    const fetchModalities = async () => {
      try {
        const res = await getModalities();
        if (res.status !== 200) {
          return;
        }
        setModalities(res.data);
      } catch (error) {
        console.error("Error fetching modalities:", error);
      }
    };

    const fetchContractTypes = async () => {
      try {
        const res = await getContractTypes();
        if (res.status !== 200) {
          return;
        }
        setContractTypes(res.data);
      } catch (error) {
        console.error("Error fetching contract types:", error);
      }
    };

    fetchCompanies();
    fetchModalities();
    fetchContractTypes();
  }, []);

  function handleInputChange(e) {
    if (!e.target) return;
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSearchChange(value) {
    setSearch(value);
  }

  const handleDescriptionChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSkillChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const fetchSkills = async (query) => {
    try {
      const response = await findSkills(query);
      if (response.status !== 200) {
        return;
      }
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const customFilter = (candidate, input) => {
    if (input) {
      return candidate.label.toLowerCase().includes(input.toLowerCase());
    }
    return true;
  };

  return (
    <Dialog
      open={Boolean(openModal)}
      onClose={() => setOpenModal(false)}
      maxWidth="sm"
      fullWidth
    >
      <div className="w-100 d-flex justify-content-center">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="mb-3">
            <label htmlFor="title">Cargo</label>
            <input
              type="text"
              placeholder="Desarrollador Fullstack"
              name="title"
              className={`m-0 p-2`}
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Descripción</label>
            <Editor
              ref={quillRef}
              placeholder="Describe las responsabilidades del puesto, tareas, requisitos, beneficios, etc."
              onChange={handleDescriptionChange}
            />
          </div>
          {companies.length > 1 && (
            <div className="mb-3">
              <label>Empresa</label>
              <select
                name="companyId"
                className={`form-select ${styles.formSelect}`}
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
          )}
          <div className="mb-3">
            <label>Habilidades</label>
            <SkillSearch onSkillSelect={handleSkillChange} />
          </div>
          <div className="mb-3">
            <label>Modalidad</label>
            <select
              name="modalityId"
              className={`form-select`}
              value={formData.modalityId}
              onChange={handleSelectChange}
            >
              <option value="">Selecciona la modalidad</option>
              {modalities?.map((modality) => (
                <option key={modality.id} value={modality.id}>
                  {modality.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Tipo de contrato</label>
            <select
              name="contractTypeId"
              className={`form-select`}
              value={formData.contractTypeId}
              onChange={handleSelectChange}
            >
              <option value="">Selecciona el tipo de contrato</option>
              {contractTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Crear oferta
          </button>
        </form>
      </div>
    </Dialog>
  );
};
