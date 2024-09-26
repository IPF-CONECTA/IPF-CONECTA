import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { projectsService } from "../services/projectsServices";
import { useNoti } from "../hooks/useNoti";
import { Dialog } from "@mui/material";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import Editor from "../ui/Editor";

export const CreateProjectForm = ({
  openProjectModal,
  setOpenProjectModal,
  onProjectSubmit,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm();

  const quillRef = useRef(null);

  const noti = useNoti();

  const [privacity, setPrivacity] = useState("publico");

  useEffect(() => {
    reset();
  }, [openProjectModal]);

  const handleSwitchChange = (e) => {
    setPrivacity(e.target.checked ? "publico" : "privado");
  };

  const handleSubmitProject = async (data) => {
    data.privacity == true
      ? (data.privacity = "publico")
      : (data.privacity = "privado");
    const res = await projectsService.createProject(data);
    if (res.status != 201) {
      return res.errors.map((error) => noti(error.msg, "danger"));
    }
    onProjectSubmit();
    reset();
    setOpenProjectModal(false);
    noti("Proyecto creado con exito", "success");
  };

  return (
    <Dialog
      open={Boolean(openProjectModal)}
      onClose={() => setOpenProjectModal(false)}
      fullWidth
      maxWidth="sm"
    >
      <form
        className=" border-0 shadow-none d-flex flex-column"
        onSubmit={handleSubmit(handleSubmitProject)}
      >
        <div className="d-flex justify-content-between mb-2">
          <span className="fs-4 fw-semibold">Nuevo proyecto</span>
          <div className="d-flex justify-content-center">
            <div className="form-check form-switch d-flex gap-2 align-items-center p-0">
              <input
                name="privacity"
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckPublicPrivate"
                defaultCheckedchecked={privacity === "publico"}
                onChange={handleSwitchChange}
                {...register("privacity")}
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
            onChange={(value) => setValue("description", value)}
          />
        </div>
        <label className="mb-0">
          Estado del proyecto <span className="text-danger">*</span>
        </label>
        <select
          defaultValue={"default"}
          name="status"
          {...register("status")}
          className="form-select mb-3"
        >
          <option value="default" disabled>
            {" "}
            Por favor seleccione
          </option>
          <option value="Comenzando">Comenzando</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        <label className="mb-0">
          Link/directorio de tu proyecto <span className="text-danger">*</span>
        </label>{" "}
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
