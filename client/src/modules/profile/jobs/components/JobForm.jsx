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

export const JobForm = ({ openModal, setOpenModal, onJobSubmit, job }) => {
  const navigate = useNavigate();
  console.log(job);
  const noti = useNoti();
  const quillRef = useRef(null);
  const { register, reset, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      title: job ? job.title : "",
      description: job ? job.description : "",
      companyId: job ? job.companyId : "",
      location: job ? job.location.value : "",
      modalityId: job ? job.modalityId : "",
      contractTypeId: job ? job.contractTypeId : "",
      skills: job ? job.skills : [],
    },
  });

  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);

  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [locations, setLocations] = useState([]);

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const onSubmit = async (data) => {
    data.skills = selectedSkills;
    try {
      if (job.title) {
        return onEditSubmit(data);
      }
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

  const onEditSubmit = async (data) => {
    data.skills = selectedSkills;
    try {
      const res = await jobsServices.updateJob(job.id, data);
      if (res.status !== 200) {
        if (res.status === 400) {
          return res.messages.forEach((message) => {
            noti(message.msg, "danger");
          });
        }
        noti(
          "Hubo un error al actualizar el trabajo, contacte con administración",
          "danger"
        );
        return;
      }
      noti("Empleo actualizado", "success");
      setOpenModal(false);
      onJobSubmit();
    } catch (error) {
      console.log("Error:", error.response.data);
      noti("Error updating job", "danger");
    }
  };

  useEffect(() => {
    if (job) {
      // Carga los valores iniciales si se está editando
      reset({
        title: job.title,
        description: job.description,
        companyId: job.companyId,
        location: job.location.value,
        modalityId: job.modalityId,
        contractTypeId: job.contractTypeId,
        skills: skills,
      });
    }
  }, [job, setValue]);

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
    const existLocation = async (job) => {
      if (job) {
        try {
          const res = await findLocation(job.location.split(",")[0]);
          console.log(res);
          if (res.data?.length > 0) {
            const matchedLocation = res.data.find(
              (location) =>
                location.id === job.locationableId &&
                location.type === job.locationableType
            );
            if (matchedLocation) {
              console.log(matchedLocation);
              return setValue("location", {
                value: matchedLocation.id,
                label: matchedLocation.name,
                type: matchedLocation.type,
              });
            }
          }
        } catch (error) {
          console.log("Error fetching location:", error);
        }
      }
    };
    existLocation(job);
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

  console.log(job);

  return (
    <Dialog
      open={Boolean(openModal)}
      onClose={() => setOpenModal(false)}
      maxWidth="sm"
      fullWidth
      TransitionComponent={SlideDown}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <span className="fs-4 fw-semibold">
          {job ? "Editar trabajo" : "Publicar nuevo trabajo"}
        </span>
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
            value={job ? job.description : "Sin descripción"}
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
          {/* <SkillSearch
            onSkillSelect={handleSkillChange}
            prevSelectedSkills={
              job
                ? job.skills.map((skill) => {
                    return {
                      value: skill.id,
                      label: skill.name,
                    };
                  })
                : []
            }
          /> */}
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
            defaultValue={job ? job.modalityId : ""}
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
            defaultValue={job ? job.contractTypeId : ""}
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
          <button
            type="submit"
            className="btn btn-dark fw-semibold"
            onSubmit={onSubmit()}
          >
            {job ? "Actualizar oferta" : "Crear oferta"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};
