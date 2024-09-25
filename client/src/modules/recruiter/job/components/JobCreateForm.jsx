import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";

import { useNoti } from "../../../../hooks/useNoti";
import styles from "../../../../../public/css/CreateJobsForm.module.css";
import {
  findSkills,
  getCompaniesByUser,
  getContractTypes,
  getModalities,
} from "../services/jobServices";

export const CreateJobForm = () => {
  const navigate = useNavigate();
  const noti = useNoti();
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, false] }],
      [{ align: [] }],
    ],
  };
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: `
    <p><strong>El candidato ideal</strong> será responsable de desarrollar aplicaciones de alta calidad. También será responsable de diseñar e implementar código escalable y testeable.</p>
    <strong>Responsabilidades:</strong>
    <ul>
      <li>Desarrollar software y aplicaciones web de calidad</li>
      <li>Analizar y mantener aplicaciones de software existentes</li>
      <li>Diseñar código altamente escalable y testeable</li>
    </ul>
    <strong>Calificaciones:</strong>
    <ul>
      <li>Licenciatura o experiencia equivalente en Ciencias de la Computación o campo relacionado</li>
      <li>Experiencia en desarrollo con lenguajes de programación</li>
      <li>Habilidades en bases de datos SQL o relacionales</li>
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
        noti("Job created successfully", "success");
        navigate("/");
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
        console.log(data);
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    const fetchModalities = async () => {
      try {
        const data = await getModalities();
        setModalities(data);
      } catch (error) {
        console.error("Error fetching modalities:", error);
      }
    };

    const fetchContractTypes = async () => {
      try {
        const data = await getContractTypes();
        setContractTypes(data);
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
    <div className="w-100 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="mb-2">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            className={`m-0 p-2`}
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description">Descripción</label>
          <ReactQuill
            name="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={modules}
            theme="snow"
          />
        </div>
        {companies.length > 1 && (
          <div className="mb-2">
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
          <Select
            isMulti
            options={skills.slice(0, 8).map((skill) => ({
              value: skill.id,
              label: skill.name,
            }))}
            value={selectedSkills}
            onChange={handleSkillChange}
            placeholder="Busca y selecciona las habilidades necesarias"
            noOptionsMessage={() => "No hay habilidades disponibles"}
            onInputChange={handleSearchChange}
            filterOption={customFilter}
          />
        </div>
        <div className="mb-2">
          <label>Modalidad</label>
          <select
            name="modalityId"
            className={`form-select`}
            value={formData.modalityId}
            onChange={handleSelectChange}
          >
            <option value="">Selecciona la modalidad</option>
            {modalities.map((modality) => (
              <option key={modality.id} value={modality.id}>
                {modality.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
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
  );
};
