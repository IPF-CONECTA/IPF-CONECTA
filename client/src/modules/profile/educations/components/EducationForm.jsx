import { useForm } from "react-hook-form";
import { useNoti } from "../../../../hooks/useNoti";
import { useEffect, useState } from "react";
import { educationsServices } from "../services/educationsServices";
import { disciplinesServices } from "../services/disciplinesServices";
import { Dialog } from "@mui/material";
import Select from "react-select";
import { SkillSearch } from "../../skills/components/FindSkills";

export const EducationForm = ({
  openEducationModal,
  setOpenEducationModal,
  onEducationSubmit,
  username,
  education,
}) => {
  const noti = useNoti();
  const [disciplines, setDisciplines] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: education?.title || "",
      institution: education?.institution || "",
      description: education?.description || "",
      disciplineId: education?.disciplineId || "",
      startDateMonth: education?.startDate
        ? new Date(education.startDate).getMonth() + 1
        : "",
      startDateYear: education?.startDate
        ? new Date(education.startDate).getFullYear()
        : "",
      endDateMonth: education?.endDate
        ? new Date(education.endDate).getMonth() + 1
        : "",
      endDateYear: education?.endDate
        ? new Date(education.endDate).getFullYear()
        : "",
      skills: education ? education.skills : [],
    },
  });

  useEffect(() => {
    const fetchDisciplines = async () => {
      const res = await disciplinesServices.getDisciplines();
      if (res.status !== 200) {
        return noti(
          "Ha habido un error al obtener las disciplinas academicas",
          "error"
        );
      }
      setDisciplines(res.data);
    };

    fetchDisciplines();
  }, []);

  useEffect(() => {
    if (education) {
      setValue("title", education.title);
      setValue("institution", education.institution);
      setValue("description", education.description);
      setValue("disciplineId", education.disciplineId);
      setValue("startDateMonth", education.startDate?.slice(5, 7) || "");
      setValue("startDateYear", education.startDate?.slice(0, 4) || "");
      setValue("endDateMonth", education.endDate?.slice(5, 7) || "");
      setValue("endDateYear", education.endDate?.slice(0, 4) || "");
      setValue("skills", education.skills);
    }
  }, [education, setValue]);

  const onSubmit = async (data) => {
    data.skills = selectedSkills;
    const educationData = {
      title: data.title,
      institution: data.institution,
      description: data.description,
      disciplineId: data.disciplineId,
      startDate: `${data.startDateMonth}-01-${data.startDateYear}`,
      endDate: data.endDateYear
        ? `${data.endDateMonth}-01-${data.endDateYear}`
        : null,
      skills: data?.skills,
    };

    if (education) {
      await educationsServices.editEducation(education.id, educationData);
      noti("Formación académica editada", "success");
    } else {
      await educationsServices.createEducation(educationData);
      noti("Formación académica añadida", "success");
    }

    setOpenEducationModal(false);
    onEducationSubmit();
    reset();
  };

  const handleDelete = async (educationId) => {
    await educationsServices.deleteEducation(educationId);
    noti("Formación académica eliminada", "success");
    setOpenEducationModal(false);
    onEducationSubmit();
    reset();
  };

  const handleSkillChange = (selectedOption) => {
    console.log(selectedOption);
    const skills = Array.isArray(selectedOption)
      ? selectedOption
      : [selectedOption];
    setSelectedSkills(skills.map((skill) => skill.value));
  };

  return (
    <Dialog
      open={openEducationModal}
      onClose={() => setOpenEducationModal(false)}
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <h4 className="mb-4">
          {education
            ? "Editar Formación académica"
            : "Añadir Formación académica"}
        </h4>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            {...register("title", { required: true })}
            className="form-control w-100"
            placeholder="Tec. superior en desarrollo de software multiplataforma"
          />
          {errors.title && (
            <div className="text-danger">Este campo es requerido</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Institución</label>
          <input
            {...register("institution", { required: true })}
            className="form-control w-100"
            placeholder="Instituto Politécnico Formosa"
          />
          {errors.institution && (
            <div className="text-danger">Este campo es requerido</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            {...register("description")}
            className="form-control w-100"
            placeholder="Cuenta tu experiencia, logros, etc."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Disciplina</label>
          <Select
            {...register("disciplineId", { required: true })}
            placeholder="Selecciona la disciplina"
            options={disciplines}
            defaultInputValue={education?.discipline?.name}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            onChange={(selectedOption) => {
              setValue("disciplineId", selectedOption ? selectedOption.id : "");
            }}
          />
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
              type="date"
              name="endDateMonth"
              className="form-select w-100"
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
              {...register("endDateYear")}
              name="endDateYear"
              className="form-select w-100"
              defaultValue=""
            >
              <option value="" disabled>
                Año
              </option>
              {Array.from(
                { length: new Date().getFullYear() - 1980 + 1 },
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

        <div className="mb-3 skills">
          <label>Habilidades</label>
          <SkillSearch
            onSkillSelect={handleSkillChange}
            prevSelectedSkills={
              education
                ? education?.skills.map((skill) => {
                    return {
                      value: skill.id,
                      label: skill.name,
                    };
                  })
                : []
            }
          />
        </div>

        <div className="buttons d-flex justify-content-between">
          <button
            type="button"
            onClick={() => {
              setOpenEducationModal(false);
              reset();
            }}
            className="btn btn-outline-dark fw-semibold"
          >
            Cancelar
          </button>

          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => {
                handleDelete(education?.id);
              }}
              className="btn btn-outline-dark fw-semibold"
            >
              Borrar formación
            </button>
            <button type="submit" className="btn btn-dark fw-semibold">
              {education ? "Actualizar Formación" : "Agregar Formación"}
            </button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};
