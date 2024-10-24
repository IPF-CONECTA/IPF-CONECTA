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
import { Controller, useForm } from "react-hook-form";
import { findLocation } from "../../experiences/services/locationServices";
import { SlideDown } from "../../../ui/transitions/SlideDown";
import { jobsServices } from "../services/jobsServices";

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
  const { register, reset, handleSubmit, control, watch, setValue } = useForm();
  const [locationSearch, setLocationSearch] = useState("");
  const [locations, setLocations] = useState([]);

  const onSubmit = async (data) => {
    data.skills = selectedSkills;
    try {
      const res = await jobsServices.createJob(data);
      if (res.status !== 201) {
        if (res.status === 400) {
          return res.messages.forEach((message) => {
            noti(message.msg, "danger");
          });
        }
        noti(
          "Hubo un error al crear el trabajo, contacte con administración",
          "danger"
        );
        return;
      }
      noti("Empleo creado", "success");
      setOpenModal(false);
      onJobSubmit();
    } catch (error) {
      console.log("Error:", error.response.data);
      noti("Error creating job", "danger");
    }
  };
  useEffect(() => {
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
        const res = await getCompaniesByUser();
        if (res.status !== 200) {
          noti(
            "Hubo un error al cargar el formulario, contacte con administración",
            "danger"
          );
          setOpenModal(false);
          return;
        } else if (res.status === 404) {
          noti(
            "Tu vinculación con la empresa o la creación de esta todavía no fue aprobada. No puedes hacer esto.",
            "danger"
          );
          setOpenModal(false);
          return;
        }
        if (res.data.length === 1) {
          setValue("companyId", res.data[0].companyId);
        }
        setCompanies(res.data);
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

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (locationSearch.length >= 1) {
      const timeout = setTimeout(async () => {
        const res = await findLocation(locationSearch);
        if (res.status !== 200) {
          return;
        }
        setLocations(
          res.data.map((location) => ({
            value: location.id,
            type: location.type,
            label: location.name,
          }))
        );
      }, 500);

      setDebounceTimeout(timeout);
    } else {
      setLocations([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [locationSearch]);

  const handleSkillChange = (selectedOption) => {
    const skills = Array.isArray(selectedOption)
      ? selectedOption
      : [selectedOption];
    setSelectedSkills(skills.map((skill) => skill.value));
  };

  return (
    <Dialog
      open={Boolean(openModal)}
      onClose={() => setOpenModal(false)}
      maxWidth="sm"
      fullWidth
      TransitionComponent={SlideDown}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <span className="fs-4 fw-semibold">Publicar nuevo trabajo</span>
        <div className="mb-3 title">
          <label htmlFor="title">Cargo</label>
          <input
            type="text"
            {...register("title", {
              required: "El título es obligatorio",
              maxLength: {
                value: 80,
                message: "El título no puede tener más de 80 caracteres",
              },
            })}
            placeholder="Desarrollador Fullstack"
            name="title"
            className={`m-0 p-2`}
          />
        </div>
        <div className="mb-3 description">
          <label htmlFor="description">Descripción</label>
          <Editor
            ref={quillRef}
            value={watch("description") || ""}
            onChange={(value) => setValue("description", value)}
            placeholder="Describe las responsabilidades del puesto, tareas, requisitos, beneficios, etc."
          />
        </div>
        {companies.length > 1 && (
          <div className="mb-3">
            <label>Empresa</label>
            <Controller
              name="companyId"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={companies}
                  placeholder="Seleccione la empresa a la que pertenece el trabajo"
                />
              )}
            />
          </div>
        )}
        <div className="mb-3 skills">
          <label>Habilidades</label>
          <SkillSearch onSkillSelect={handleSkillChange} />
        </div>
        <div className="mb-3 location">
          <label htmlFor="location">
            Ubicación <span className="text-danger">*</span>
          </label>

          <Controller
            name="location"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                options={locations}
                value={locations.find((e) => e.value === field.value)}
                onInputChange={(inputValue) => setLocationSearch(inputValue)}
                placeholder="Buscar ubicación..."
              />
            )}
          />
        </div>
        <div className="mb-3 modality">
          <label>Modalidad</label>
          <select
            name="modalityId"
            className={`form-select`}
            {...register("modalityId")}
            defaultValue={""}
          >
            <option value="" disabled>
              Selecciona la modalidad
            </option>
            {modalities?.map((modality) => (
              <option key={modality.id} value={modality.id}>
                {modality.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 contractType">
          <label>Tipo de contrato</label>
          <select
            name="contractTypeId"
            {...register("contractTypeId")}
            className={`form-select`}
            defaultValue={""}
          >
            <option value="" disabled>
              Selecciona el tipo de contrato
            </option>
            {contractTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons d-flex justify-content-between">
          <button type="submit" className="btn btn-outline-dark fw-semibold">
            Cancelar
          </button>
          <button type="submit" className="btn btn-dark fw-semibold">
            Crear oferta
          </button>
        </div>
      </form>
    </Dialog>
  );
};
