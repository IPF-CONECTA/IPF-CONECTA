import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { findCompanies } from "../../../recruiter/services/recruiterServices";
import { BASE_URL } from "../../../../constants/BASE_URL";
import Select from "react-select";
import { findUbication } from "../services/ubicationServices";
import {
  getContractTypes,
  getModalities,
} from "../../../recruiter/job/services/jobServices";
import { useNoti } from "../../../../hooks/useNoti";
import { createExperience } from "../services/experienceServices";
import { SkillSearch } from "../../skills/components/FindSkills";

export const CreateExperienceModal = ({
  openExperienceModal,
  setOpenExperienceModal,
  onExperienceSubmit,
  username,
  experience,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: experience?.title || "",
      description: experience?.description || "",
      contractType: experience?.contractTypeId || "",
      company: experience?.company || "",
      location: experience?.location || "",
      modality: experience?.modality || "",
      startDateMonth: experience?.startDateMonth || "",
      endDateMonth: experience?.endDate?.slice(9, 10) || "",
      startDateYear: experience?.startDateYear || "",
      endDateYear: experience?.endDateYear || "",
    },
  });
  const noti = useNoti();
  const [companySearch, setCompanySearch] = useState("");
  const [ubicationSearch, setUbicationSearch] = useState("");
  const [ubications, setUbications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [actualWork, setActualWork] = useState(false);
  const [contractTypes, setContractTypes] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const handleSkillSelect = (selectedOption) => {
    const skills = Array.isArray(selectedOption)
      ? selectedOption
      : [selectedOption];
    setSelectedSkills(skills.map((skill) => skill.value));
  };

  // Obtener modalidades y tipos de contrato
  useEffect(() => {
    const fetchContractTypes = async () => {
      const res = await getContractTypes();

      if (res.status !== 200) {
        return noti(
          "Hubo un error al obtener los tipo de contratos, contacte al administrador",
          "error"
        );
      }
      const contractTypes = res.data.map((contractType) => ({
        value: contractType.id,
        label: contractType.name,
      }));
      setContractTypes(contractTypes);
    };
    const fetchModalities = async () => {
      const res = await getModalities();
      if (res.status !== 200) {
        return noti(
          "Hubo un error al obtener los tipo de contratos, contacte al administrador",
          "error"
        );
      }
      const modalities = res.data.map((modality) => ({
        value: modality.id,
        label: modality.name,
      }));

      setModalities(modalities);
    };
    fetchModalities();
    fetchContractTypes();
  }, []);
  // Buscar empresas
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (companySearch.length >= 1) {
      const timeout = setTimeout(async () => {
        const res = await findCompanies(companySearch);
        if (res.status !== 200) {
          return;
        }
        const companies = res.data.map((company) => ({
          value: company.id,
          image: company.logoUrl,
          label: company.name,
        }));

        setCompanies(companies);
      }, 500);

      setDebounceTimeout(timeout);
    } else {
      setCompanies([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [companySearch]);

  // Buscar ubicaciones
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (ubicationSearch.length >= 1) {
      const timeout = setTimeout(async () => {
        const res = await findUbication(ubicationSearch);
        if (res.status !== 200) {
          return;
        }
        const ubications = res.data.map((ubication) => ({
          value: ubication.id,
          type: ubication.type,
          label: ubication.name,
        }));
        setUbications(ubications);
      }, 500);

      setDebounceTimeout(timeout);
    } else {
      setUbications([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [ubicationSearch]);

  useEffect(() => {
    if (actualWork) {
      setValue("endDateMonth", "null");
      setValue("endDateYear", "null");
    }
  }, [actualWork, setValue]);

  const submitExperience = async (data) => {
    try {
      const res = await createExperience(data, selectedSkills, username);
      if (res.status !== 201) {
        return noti(
          "Hubo un error al registrar la experiencia, contacte con el administrador",
          "error"
        );
      }
      noti("Experiencia agregada correctamente", "success");
      setOpenExperienceModal(false);
      onExperienceSubmit();
    } catch (error) {
      noti(
        "Hubo un error al registrar la experiencia, contacte con el administrador",
        "error"
      );
    }
  };
  return (
    <Dialog
      open={Boolean(openExperienceModal)}
      onClose={() => {
        setOpenExperienceModal(false);
        reset();
      }}
      fullWidth
      maxWidth="sm"
    >
      <div className="p-3">
        <span className="fs-4 fw-semibold ">Agregar experiencia</span>
        <div>
          <form
            className="shadow-none border-0 p-0 pt-2 d-flex flex-column"
            onSubmit={handleSubmit(submitExperience)}
          >
            <div className="mb-2 title">
              <label htmlFor="title">
                Título <span className="text-danger">*</span>
              </label>
              <input
                name="title"
                {...register("title", {
                  required: "El título es obligatorio",
                  maxLength: {
                    value: 80,
                    message: "El título no puede tener más de 80 caracteres",
                  },
                })}
                className="form-control w-100"
                type="text"
                placeholder="Ej: Back End Developer"
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </div>
            <div className="mb-2 description">
              <label htmlFor="description">Descripción del puesto</label>
              <input
                {...register("description")}
                type="text"
                name="description"
                placeholder="Cuentanos que haces/hiciste en esta experiencia"
              />
            </div>
            <div className="mb-2 contractType">
              <label htmlFor="contractType">
                Tipo de contrato <span className="text-danger">*</span>
              </label>
              <Controller
                name="contractType"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    name="contractType"
                    options={contractTypes}
                    placeholder="Seleccione el tipo de empleo"
                  />
                )}
              />

              {errors.contractType && (
                <span className="text-danger">
                  {errors.contractType.message}
                </span>
              )}
            </div>
            <div className="mb-2 company">
              <label htmlFor="company">Empresa</label>
              <div>
                <Controller
                  name="company"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={companies}
                      formatOptionLabel={(company) => (
                        <div key={company?.value}>
                          {company.image && (
                            <img
                              src={`${BASE_URL}/logoUrl/${company?.image}`}
                              crossOrigin="anonymous"
                              alt="logo"
                              width={24}
                              height={24}
                              className="me-2 img-fluid"
                            />
                          )}
                          <span>{company.label}</span>
                        </div>
                      )}
                      onInputChange={(inputValue) =>
                        setCompanySearch(inputValue)
                      }
                      placeholder="Buscar empresas..."
                    />
                  )}
                />
              </div>
            </div>
            <div className="mb-2 ubication">
              <label htmlFor="location">Ubicación</label>

              <Controller
                name="location"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={ubications}
                    onInputChange={(inputValue) =>
                      setUbicationSearch(inputValue)
                    }
                    placeholder="Buscar ubicación..."
                  />
                )}
              />
              {errors.location && <span>{errors.location.message}</span>}
            </div>
            <div className="mb-2 modality">
              <label htmlFor="modalities">Modalidad</label>
              <Controller
                name="modality"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    name="modalities"
                    options={modalities}
                    placeholder="Seleccione la modalidad"
                  />
                )}
              />
              {errors.modality && (
                <span className="text-danger">{errors.modality.message}</span>
              )}
            </div>
            <div className="form-check mb-2 actualWork">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setActualWork(!actualWork)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Actualmente estoy trabajando en este puesto
              </label>
            </div>
            <div className="mb-2 startDate">
              <label htmlFor="startDate">Fecha de inicio</label>
              <div className="d-flex gap-3">
                <select
                  {...register("startDateMonth")}
                  type="date"
                  name="startDateMonth"
                  className="form-select w-100  "
                  defaultValue={"default"}
                >
                  <option value="default" disabled>
                    Mes
                  </option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
                <select
                  {...register("startDateYear")}
                  name="startDateYear"
                  className="form-select w-100"
                  defaultValue={"null"}
                >
                  <option value="null" disabled>
                    Año
                  </option>
                  {Array.from(
                    { length: new Date().getFullYear() - 1924 + 1 },
                    (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
            <div className="mb-2 endDate">
              <label htmlFor="endDate">Fecha de fin</label>

              <div className="d-flex gap-3 mb-2">
                <select
                  {...register("endDateMonth")}
                  disabled={actualWork}
                  type="date"
                  name="endDateMonth"
                  className="form-select w-100  "
                  defaultValue={"null"}
                >
                  <option value="null" disabled>
                    Mes
                  </option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
                <select
                  disabled={actualWork}
                  {...register("endDateYear")}
                  name="endDateYear"
                  className="form-select w-100"
                  defaultValue={"null"}
                >
                  <option value="null" disabled>
                    Año
                  </option>
                  {Array.from(
                    { length: new Date().getFullYear() - 1924 + 1 },
                    (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>

            <div className="mb-2 skills">
              <label htmlFor="skillSearch">
                Selecciona las habilidades usadas para esta experiencia
              </label>
              <SkillSearch onSkillSelect={handleSkillSelect} />
            </div>
            <div className="w-100 d-flex justify-content-end">
              <button className="btn btn-dark" type="submit">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
