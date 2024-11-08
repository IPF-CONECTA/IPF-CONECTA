import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useNoti } from "../../../../hooks/useNoti";
import {
  findSkills,
  getCompaniesByUser,
  getContractTypes,
  getModalities,
} from "../../../recruiter/job/services/jobServices";
import { Dialog } from "@mui/material";
import { SkillSearch } from "../../skills/components/FindSkills";
import { Controller, useForm } from "react-hook-form";
import { findLocation } from "../../experiences/services/locationServices";
import { SlideDown } from "../../../ui/transitions/SlideDown";
import { jobsServices } from "../services/jobsServices";
import Editor from "../../../ui/components/Editor";

export const JobForm = ({ openModal, setOpenModal, onJobUpdate, job }) => {
  const noti = useNoti();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: job ? job.title : "",
      description: job
        ? job.description
        : `<i>EJEMPLO</i><p>El candidato ideal será responsable de contribuir al desarrollo y mantenimiento de aplicaciones de alta calidad. También se espera que participe en el diseño e implementación de código escalable y fácil de probar.</p><strong>Responsabilidades</strong><ul><li>Contribuir al desarrollo de software y aplicaciones web de calidad.</li><li>Analizar y mantener aplicaciones de software existentes.</li><li>Diseñar código escalable y fácil de probar.</li><li>Identificar y solucionar errores de programación.</li></ul><strong>Cualificaciones</strong><ul><li>Título universitario o experiencia equivalente en Ciencias de la Computación o campo relacionado.</li><li>Experiencia en desarrollo con languages de programación.</li><li>Conocimientos en bases de datos SQL o bases de datos relacionales.</li></ul><strong>Beneficios</strong><ul><li>Trabajo remoto con flexibilidad de horarios.</li><li>Oportunidad de crecimiento y desarrollo profesional.</li><li>Integración a un equipo de trabajo colaborativo y profesional.</li></ul>`,
      companyId: job ? job.companyId : "",
      location: job ? job.location.value : "",
      modalityId: job ? job.modalityId : "",
      contractTypeId: job ? job.contractTypeId : "",
      skills: job ? job.skills : [],
    },
  });
  const [companies, setCompanies] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleDelete = async () => {
    try {
      await jobsServices.deleteJob(job.id);
      setOpenModal(false);
      onJobUpdate();
      noti("Oferta eliminada con éxito", "success");
    } catch (error) {
      console.log(error);
      noti("Error al eliminar la oferta", "warning");
    }
  };

  const onSubmit = async (data) => {
    data.skills = selectedSkills;
    if (job) {
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
    onJobUpdate();
    reset();
  };
  const onEditSubmit = async (data) => {
    data.skills = selectedSkills;
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
    onJobUpdate();
  };

  useEffect(() => {
    const existLocation = async (job) => {
      if (job) {
        const res = await findLocation(job.location.split(",")[0]);
        if (res.data?.length > 0) {
          const matchedLocation = res.data.find(
            (location) =>
              location.id === job.locationableId &&
              location.type === job.locationableType
          );
          if (matchedLocation) {
            return setValue("location", {
              value: matchedLocation.id,
              label: matchedLocation.name,
              type: matchedLocation.type,
            });
          } else {
            noti("Hubo un error al obtener la ubicación", "warning");
          }
        }
      }
    };
    existLocation(job);
    const fetchCompanies = async () => {
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
    };

    const fetchModalities = async () => {
      const res = await getModalities();
      if (res.status !== 200) {
        return noti("Hubo un error al obtener las modalidades", "warning");
      }
      setModalities(res.data);
    };

    const fetchContractTypes = async () => {
      const res = await getContractTypes();
      if (res.status !== 200) {
        return noti("Hubo un error al obtener los contratos", "warning");
      }
      setContractTypes(res.data);
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
              minLength: {
                value: 5,
                message: "El titulo debe contener al menos 5 caracteres",
              },
              maxLength: {
                value: 80,
                message: "El título no puede tener más de 80 caracteres",
              },
            })}
            placeholder="Desarrollador Fullstack"
            name="title"
            className={`m-0 p-2`}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}{" "}
        </div>
        <div className="mb-3 description">
          <label htmlFor="description">Descripción</label>
          <Editor
            {...register("description")}
            initialValue={
              job
                ? job.description
                : `<i>EJEMPLO</i><p>El candidato ideal será responsable de contribuir al desarrollo y mantenimiento de aplicaciones de alta calidad. También se espera que participe en el diseño e implementación de código escalable y fácil de probar.</p><strong>Responsabilidades</strong><ul><li>Contribuir al desarrollo de software y aplicaciones web de calidad.</li><li>Analizar y mantener aplicaciones de software existentes.</li><li>Diseñar código escalable y fácil de probar.</li><li>Identificar y solucionar errores de programación.</li></ul><strong>Cualificaciones</strong><ul><li>Título universitario o experiencia equivalente en Ciencias de la Computación o campo relacionado.</li><li>Experiencia en desarrollo con languages de programación.</li><li>Conocimientos en bases de datos SQL o bases de datos relacionales.</li></ul><strong>Beneficios</strong><ul><li>Trabajo remoto con flexibilidad de horarios.</li><li>Oportunidad de crecimiento y desarrollo profesional.</li><li>Integración a un equipo de trabajo colaborativo y profesional.</li></ul>`
            }
            onChange={(value) => setValue("description", value)}
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
          <SkillSearch
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
          />
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
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="btn btn-outline-dark fw-semibold"
          >
            Cancelar
          </button>
          <div className="d-flex gap-2">
            {job && (
              <button
                type="button"
                onClick={() => handleDelete()}
                className="btn btn-outline-dark fw-semibold"
              >
                Borrar oferta
              </button>
            )}
            <button
              type="submit"
              className="btn btn-dark fw-semibold"
              onSubmit={onSubmit}
            >
              {job ? "Actualizar oferta" : "Crear oferta"}
            </button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};
