import { useEffect, useState } from "react";
import axios from "axios";
import { useNoti } from "../hooks/useNoti";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "../../public/css/CreateJobsForm.module.css";

export const CreateJobsForm = () => {
  const navigate = useNavigate();
  const noti = useNoti();

  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyId: "",
    modalityId: "",
    contractTypeId: "",
    skills: [],
    applicationLink: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/get-companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/get-modalities", {
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
    axios
      .get("http://localhost:4000/get-contract-types", {
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
    if (search.length === 0) {
      setSkills([]);
      return;
    }

    axios
      .get("http://localhost:4000/find-skills", {
        params: {
          query: search,
        },
      })
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, [search]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSearchChange(value) {
    setSearch(value);
  }

  function handleSkillChange(selectedOptions) {
    setSelectedSkills(selectedOptions);
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: selectedOptions.map((option) => option.value),
    }));
  }

  function handleSubmit(e) {
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
  }

  const skillOptions = skills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));

  const customFilter = (option, searchText) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Crear oferta laboral</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Título</label>
            <input
              type="text"
              name="title"
              className={styles.formControl}
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Descripción</label>
            <input
              type="text"
              name="description"
              className={styles.formControl}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Salario</label>
            <input
              type="text"
              name="salary"
              className={styles.formControl}
              value={formData.salary}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Empresa</label>
            <select
              name="companyId"
              className={styles.formSelect}
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
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Modalidad</label>
            <select
              name="modalityId"
              className={styles.formSelect}
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
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tipo de contrato</label>
            <select
              name="contractTypeId"
              className={styles.formSelect}
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
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Habilidades</label>
            <Select
              isMulti
              options={skillOptions}
              value={selectedSkills}
              onChange={handleSkillChange}
              placeholder="Busca y selecciona las habilidades necesarias"
              noOptionsMessage={() => "No hay habilidades disponibles"}
              onInputChange={handleSearchChange}
              filterOption={customFilter}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Crear oferta
          </button>
        </form>
      </div>
    </div>
  );
};
