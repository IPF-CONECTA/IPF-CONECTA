import { useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Dialog } from "@mui/material";
import Editor from "../../../ui/components/Editor";
import { projectsService } from "../services/projectsServices";
import { useNoti } from "../../../../hooks/useNoti";

export const CreateProjectForm = ({
  openProjectModal,
  setOpenProjectModal,
  onProjectSubmit,
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const quillRef = useRef(null);

  const noti = useNoti();

  const [privateP, setPrivateP] = useState(false);

  const handleSwitchChange = (e) => {
    setPrivateP(e.target.checked);
  };

  const handleSubmitProject = async (data) => {
    console.log(data);
    const res = await projectsService.createProject(data);
    if (res.status != 201) {
      return res.message.length >= 1
        ? res.message.map((error) => noti(error.msg || error, "error"))
        : noti(res.message.message || res.message, "error");
    }
    reset();
    setCurrentlyWorking(false);
    onProjectSubmit();
    setOpenProjectModal(false);
    noti("Proyecto creado con exito", "success");
  };

  return (
    <Dialog
      open={Boolean(openProjectModal)}
      onClose={() => {
        setOpenProjectModal(false);
        setCurrentlyWorking(false);
        reset();
      }}
      fullWidth
      maxWidth="sm"
    >
      <form
        className=" border-0 shadow-none d-flex flex-column p-3"
        onSubmit={handleSubmit(handleSubmitProject)}
      >
        <div className="d-flex justify-content-between mb-2">
          <span className="fs-4 fw-semibold">Nuevo proyecto</span>
          <div className="d-flex justify-content-center">
            <div className="form-check form-switch d-flex gap-2 align-items-center p-0">
              <input
                name="private"
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckPublicPrivate"
                defaultChecked={privateP}
                onChange={handleSwitchChange}
                {...register("private")}
              />
              <span className="text-secondary">Privado?</span>
            </div>
          </div>
        </div>
        <label className="mb-0">
          Nombre del proyecto <span className="text-danger">*</span>
        </label>
        <input
          name="name"
          type="text"
          {...register("name")}
          className="input mb-3"
          placeholder="El nombre de tu proyecto"
        />
        <label className="mb-0">
          Descripción corta (¿Qué es?) <span className="text-danger">*</span>
        </label>
        <input
          name="smallDescription"
          type="text"
          {...register("smallDescription")}
          className="input mb-3"
          placeholder="Gestor de archivos.."
        />
        <div className="mb-2">
          <label htmlFor="description">Descripción detallada</label>
          <Editor
            ref={quillRef}
            name="description"
            value={watch("description") || ""}
            onChange={(value) => setValue("description", value)}
          />
        </div>
        <div className="form-check mb-2 currentlyWorking">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => setCurrentlyWorking(!currentlyWorking)}
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
              disabled={currentlyWorking}
              {...register("endDateMonth")}
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
              disabled={currentlyWorking}
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

        <label className="mb-0">
          Link/directorio de tu proyecto <span className="text-danger">*</span>
        </label>
        <input
          name="projectLink"
          type="text"
          {...register("projectLink")}
          className=""
          placeholder="Ej: https://github.com/tu-usuario/tu-repositorio"
        />
        <div className="d-flex flex-column mb-3">
          <label>Logo de tu proyecto</label>
          <input
            type="file"
            name="projectLogo"
            className="form-control w-100"
          />
        </div>
        <span className="fw-lighter">
          NOTA: * significa que el campo es obligatorio
        </span>
        <button type="submit" className="btn btn-outline-dark w-100 mt-2">
          Agregar
        </button>
      </form>
    </Dialog>
  );
};
