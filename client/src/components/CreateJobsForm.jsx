import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNoti } from "../hooks/useNoti";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
import styles from "../../public/css/CreateJobsForm.module.css";
import {
  findSkills,
  getCompaniesByUser,
  getContractTypes,
  getModalities,
} from "../services/jobServices";
import Editor from "../ui/Editor";
import { useForm } from "react-hook-form";

export const CreateJobsForm = () => {
  const navigate = useNavigate();
  const noti = useNoti();
  const { register, handleSubmit, setValue, watch } = useForm();

  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const quillRef = useRef(null);

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
          setValue("companyId", data[0].company.id); // Utilizamos setValue de react-hook-form
        }
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

  const submitForm = (data) => {
    if (data.description.length < 10) {
      noti("La descripción debe tener al menos 10 caracteres", "danger");
      return;
    }

    axios
      .post(
        "http://localhost:4000/create-job",
        {
          jobOffer: { ...data },
          skills: selectedSkills.map((skill) => skill.value),
        },
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

  const handleSkillChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
    setValue(
      "skills",
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const handleSearchChange = (value) => {
    setSearch(value);
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
      <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
        <div className="mb-2">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            className={`m-0 p-2`}
            {...register("title", { required: true })} // Register para manejar el input
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description">Descripción</label>
          <Editor
            ref={quillRef}
            name="description"
            onChange={(value) => setValue("description", value)}
          />
        </div>
        {companies.length > 1 && (
          <div className="mb-2">
            <label>Empresa</label>
            <select
              name="companyId"
              className={`form-select ${styles.formSelect}`}
              {...register("companyId")}
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
            {...register("modalityId")}
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
            {...register("contractTypeId")}
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
