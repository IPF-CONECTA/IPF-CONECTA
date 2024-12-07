import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { findCompanies } from "../../../recruiter/services/recruiterServices";
import { BASE_URL } from "../../../../constants/BASE_URL";
import Select from "react-select";
import { findLocation } from "../services/locationServices";
import {
  findSkills,
  getContractTypes,
  getModalities,
} from "../../../recruiter/job/services/jobServices";
import { useNoti } from "../../../../hooks/useNoti";
import { createExperience } from "../services/experienceServices";
import { SkillSearch } from "../../skills/components/FindSkills";
import styles from "../../../../../public/css/createExperience.module.css";
import { SlideDown } from "../../../ui/transitions/SlideDown";

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
      companyId: experience?.company?.id || "",
      locationId: experience?.locationId || "",
      modalityId: experience?.modalityId || "",
      contractTypeId: experience?.contractTypeId || "",
      startDateMonth: experience?.startDate
        ? new Date(experience.startDate).getMonth() + 1
        : "",
      startDateYear: experience?.startDate
        ? new Date(experience.startDate).getFullYear()
        : "",
      endDateMonth: experience?.endDate
        ? new Date(experience.endDate).getMonth() + 1
        : "",
      endDateYear: experience?.endDate
        ? new Date(experience.endDate).getFullYear()
        : "",
    },
  });
  const noti = useNoti();
  const [images, setImages] = useState([]);
  const [confirmChanges, setConfirmChanges] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [actualWork, setActualWork] = useState(
    experience ? (experience?.endDate !== null ? false : true) : false
  );
  const [isRecruited, setIsRecruited] = useState(
    experience?.isRecruited || false
  );
  const [addSkills, setAddSkills] = useState(false);
  const [contractTypes, setContractTypes] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [prevSelectedSkills, setPrevSelectedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const handleImageChange = (e) => {
    if (existingImages.length + newImages.length == 10) {
      return noti("Solo puedes subir 10 imagenes", "warning");
    }
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };
  const handleSkillSelect = (selectedOption) => {
    const skills = Array.isArray(selectedOption)
      ? selectedOption
      : [selectedOption];
    setSelectedSkills(skills.map((skill) => skill.value));
    setPrevSelectedSkills(skills);
  };

  useEffect(() => {
    const setData = async () => {
      if (experience) {
        const companyData = await findCompanies(experience.company?.name);
        const locationData = await findLocation(
          experience.location.split(",")[0]
        );
        setCompanies(
          companyData.data.map((company) => ({
            value: company.id,
            image: company.logoUrl,
            label: company.name,
          }))
        );

        experience.attachments.length > 0 &&
          setExistingImages(experience.attachments);

        setLocations(
          locationData.data.map((location) => ({
            value: location.id,
            type: location.type,
            label: location.name,
          }))
        );

        const skills = await Promise.all(
          experience.experienceSkills.map(async (prevSkill) => {
            const res = await findSkills(prevSkill.skill.name);
            return res.data.map((skillData) => {
              if (skillData.id === prevSkill.skillId) {
                return {
                  value: skillData.id,
                  label: skillData.name,
                };
              }
            });
          })
        );
        setPrevSelectedSkills(skills.flat());
        setSelectedSkills(skills.flat());
        setValue("title", experience.title || "");
        setValue("description", experience.description || "");
        setValue("contractType", experience.contractTypeId || "");
        setValue("company", experience.company?.id || "");
        setValue("location", experience.locationId || "");
        setValue("modality", experience.modalityId || "");
        setValue("startDateMonth", experience.startDate?.slice(5, 7) || "");
        setValue("startDateYear", experience.startDate?.slice(0, 4) || "");
        setValue("endDateMonth", experience.endDate?.slice(5, 7) || "");
        setValue("endDateYear", experience.endDate?.slice(0, 4) || "");
        setValue("isRecruited", experience.isRecruited || false);
      }
    };

    setData();
  }, [experience, setValue]);

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

      setModalities(
        res.data.map((modality) => ({
          value: modality.id,
          label: modality.name,
        }))
      );
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

        setCompanies(
          res.data.map((company) => ({
            value: company.id,
            image: company.logoUrl,
            label: company.name,
          }))
        );
      }, 500);

      setDebounceTimeout(timeout);
    } else {
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

  useEffect(() => {
    if (actualWork) {
      setValue("endDateMonth", "");
      setValue("endDateYear", "");
    }
  }, [actualWork, setValue]);

  const selectCustomCompany = (companyName) => {
    setCompanies([{ value: companyName, label: companyName }]);
    setValue("company", { value: companyName, label: companyName });
  };
  const submitExperience = async (data) => {
    data.images = newImages;
    data.isRecruited = isRecruited;
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
      reset();
      onExperienceSubmit();
    } catch (error) {
      noti(
        "Hubo un error al registrar la experiencia, contacte con el administrador",
        "error"
      );
    }
  };

  const handleSwitchChange = (e) => {
    setIsRecruited(e.target.checked);
  };

  return (
    <Dialog
      open={Boolean(openExperienceModal)}
      onClose={() => {
        setConfirmChanges(true);
      }}
      TransitionComponent={SlideDown}
      fullWidth
      className={`${styles.formContainer}`}
      maxWidth="sm"
    >
      <div className={`p-3`}>
        <div className="d-flex  justify-content-between">
          <div className="d-flex flex-column">
            <span className="fs-4 fw-semibold ">Agregar experiencia</span>
            <span className="text-secondary">
              NOTA: * significa que el campo es obligatorio.
            </span>
          </div>
        </div>

        <div>
          <form
            className="shadow-none border-0 p-0 pt-2 d-flex flex-column"
            onSubmit={handleSubmit(submitExperience)}
          >
            <div className="mb-3 title">
              <label
                htmlFor="title"
                className="d-flex  justify-content-between"
              >
                <div>
                  Título <span className="text-danger">*</span>
                </div>
                <div>
                  <span className="me-2">Encontrado en IPF-CONECTA?</span>
                  <input
                    type="checkbox"
                    checked={isRecruited}
                    onChange={handleSwitchChange}
                  />
                </div>
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
                className="form-control w-100 m-0"
                type="text"
                placeholder="Ej: Back End Developer"
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </div>

            <div className="mb-3 description">
              <label htmlFor="description">
                Descripción del puesto <span className="text-danger">*</span>
              </label>
              <textarea
                {...register("description")}
                name="description"
                className={`form-control w-100 ${styles.descriptionInput} m-0`}
                placeholder="Cuentanos que haces/hiciste en esta experiencia"
              />
            </div>
            <div className="mb-3 contractType">
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
                    value={contractTypes.find((e) => e.value === field.value)}
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
            <div className="mb-3 company">
              <label htmlFor="company">
                Empresa <span className="text-danger">*</span>
              </label>
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
                              alt="logo"
                              width={24}
                              height={24}
                              className="me-2 img-fluid"
                            />
                          )}
                          <span>{company.label}</span>
                        </div>
                      )}
                      value={companies.find(
                        (company) => company.value === field.value
                      )}
                      onInputChange={(inputValue) =>
                        setCompanySearch(inputValue)
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.value); // Establece el valor del campo
                      }}
                      placeholder="Buscar empresas..."
                      noOptionsMessage={() => (
                        <div>
                          <div className="d-flex flex-column">
                            <span>No encontraste tu empresa?</span>
                            <span className="text-secondary">
                              Agrega{" "}
                              {companySearch !== ""
                                ? companySearch
                                : "el nombre de la empresa"}
                            </span>
                          </div>
                          <div style={{ marginTop: "5px" }}>
                            <button
                              type="button" // Asegúrate de que el tipo sea botón
                              className="btn btn-dark"
                              onClick={() => selectCustomCompany(companySearch)}
                            >
                              Agregar
                            </button>
                          </div>
                        </div>
                      )}
                    />
                  )}
                />
              </div>
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
                    onInputChange={(inputValue) =>
                      setLocationSearch(inputValue)
                    }
                    placeholder="Buscar ubicación..."
                  />
                )}
              />
            </div>
            <div className="mb-3 modality">
              <label htmlFor="modalities">
                Modalidad <span className="text-danger">*</span>
              </label>
              <Controller
                name="modality"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={modalities}
                    value={modalities.find((e) => e.value === field.value)}
                    placeholder="Seleccione la modalidad"
                  />
                )}
              />
            </div>
            <div className="form-check mb-3 actualWork">
              <input
                className="form-check-input"
                type="checkbox"
                checked={actualWork}
                onChange={() => setActualWork(!actualWork)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Actualmente estoy trabajando en este puesto
              </label>
            </div>
            <div className="mb-3 startDate">
              <label htmlFor="startDate">
                Fecha de inicio <span className="text-danger">*</span>
              </label>
              <div className="d-flex gap-3">
                <select
                  {...register("startDateMonth")}
                  type="date"
                  name="startDateMonth"
                  className="form-select w-100  "
                  defaultValue=""
                >
                  <option value="" disabled>
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
                  defaultValue={""}
                >
                  <option value="" disabled>
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
            <div className="mb-3 endDate">
              <label htmlFor="endDate">Fecha de fin</label>

              <div className="d-flex gap-3">
                <select
                  {...register("endDateMonth")}
                  disabled={actualWork}
                  type="date"
                  name="endDateMonth"
                  className="form-select w-100  "
                  defaultValue={""}
                >
                  <option value="" disabled>
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
                  defaultValue=""
                >
                  <option value="" disabled>
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
            <div className="mb-3 attachments">
              <label htmlFor="media">Multimedia</label>
              <input
                onChange={handleImageChange}
                name="media"
                className="form-control w-100 m-0"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                multiple
              />
            </div>
            <div
              className={`${
                existingImages.length > 0 || (newImages.length > 0 && " mb-3")
              }`}
            >
              {existingImages.length > 0 &&
                existingImages.map((image, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`d-flex align-items-start justify-content-between align-items-center ${
                        newImages.length == 0 &&
                        existingImages.length === index + 1 &&
                        "mb-3"
                      }`}
                    >
                      <div>
                        <img
                          height={60}
                          className="me-2 border rounded p-1"
                          src={`${BASE_URL}/images/${image.url}`}
                          alt={`Imagen ${index + 1}`}
                          onClick={() => {
                            openImage(image);
                          }}
                        />
                        <span>{image.url.split("_")[1]}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setExistingImages((prevImages) =>
                            prevImages.filter((_, i) => i !== index)
                          )
                        }
                        className="btn p-0 material-symbols-outlined bg-danger rounded-circle text-white fs-6"
                      >
                        close
                      </button>
                    </div>
                    {index + 1 !== existingImages.length && (
                      <hr className="my-3" />
                    )}
                  </React.Fragment>
                ))}
              {newImages.length > 0 &&
                newImages.map((image, index) => (
                  <React.Fragment key={index}>
                    {existingImages.length > 0 && index == 0 && (
                      <hr className="my-3" />
                    )}
                    <div
                      className={`d-flex align-items-start justify-content-between align-items-center ${
                        newImages.length == index + 1 && "mb-3"
                      }`}
                    >
                      <div>
                        <img
                          height={60}
                          className="me-2 border rounded p-1"
                          src={URL.createObjectURL(image)}
                          alt={`Imagen ${index + 1}`}
                          onClick={() => {
                            openImage(image);
                          }}
                        />
                        <span>{image.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setNewImages((prevImages) =>
                            prevImages.filter((_, i) => i !== index)
                          )
                        }
                        className="btn p-0 material-symbols-outlined bg-danger rounded-circle text-white fs-6"
                      >
                        close
                      </button>
                    </div>
                    {index + 1 !== newImages.length && <hr className="my-2" />}
                  </React.Fragment>
                ))}
            </div>
            <div className="mb-3 skills">
              <label htmlFor="skillSearch">
                Selecciona las habilidades usadas para esta experiencia{" "}
                <span className="text-secondary">
                  (se agregarán automáticamente a tu perfil)
                </span>
              </label>
              <SkillSearch
                prevSelectedSkills={prevSelectedSkills}
                onSkillSelect={handleSkillSelect}
              />
            </div>

            <div className="w-100 d-flex justify-content-end">
              <button className="btn btn-dark px-3 fw-semibold" type="submit">
                {experience ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Dialog
        open={confirmChanges}
        onClose={() => setConfirmChanges(false)}
        fullWidth
        maxWidth="xs"
      >
        <div className="p-3">
          <div className="d-flex flex-column gap-3">
            <span className="fs-4 fw-semibold">¿Estás seguro?</span>
            <span>
              Si sales ahora, perderás los cambios realizados en la experiencia
            </span>
            <div className="d-flex justify-content-end gap-3">
              <button
                onClick={() => {
                  setConfirmChanges(false);
                  setOpenExperienceModal(false);
                  reset();
                }}
                className="btn btn-outline-dark fw-semibold"
              >
                Salir
              </button>
              <button
                onClick={() => setConfirmChanges(false)}
                className="btn btn-dark fw-semibold"
              >
                Quedarme
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Dialog>
  );
};
