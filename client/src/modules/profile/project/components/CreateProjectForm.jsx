import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@mui/material";
import Editor from "../../../ui/components/Editor";
import { projectsService } from "../services/projectsServices";
import { useNoti } from "../../../../hooks/useNoti";
import { SkillSearch } from "../../skills/components/FindSkills";
import { SlideDown } from "../../../ui/transitions/SlideDown";

export const CreateProjectForm = ({
  openProjectModal,
  setOpenProjectModal,
  onProjectSubmit,
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [images, setImages] = useState([]);
  const [privateP, setPrivateP] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const noti = useNoti();

  const handleSkillSelect = (selectedOption) => {
    const skills = Array.isArray(selectedOption)
      ? selectedOption
      : [selectedOption];
    setSelectedSkills(skills.map((skill) => skill.value));
  };
  const handleImageChange = (e) => {
    if (images.length == 10) {
      return noti("Solo puedes subir 10 imagenes", "warning");
    }
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSwitchChange = (e) => {
    setPrivateP(e.target.checked);
  };

  const handleSubmitProject = async (data) => {
    data.images = images;
    data.skills = selectedSkills;
    const res = await projectsService.createProject(data);
    if (res.status != 201) {
      return res.message.length >= 1
        ? res.message.map((error) => noti(error.msg || error, "error"))
        : noti(res.message.message || res.message, "error");
    }
    reset();
    setImages([]);
    setCurrentlyWorking(false);
    onProjectSubmit();
    setOpenProjectModal(false);
    noti("Proyecto creado con exito", "success");
  };

  return (
    <Dialog
      open={Boolean(openProjectModal)}
      onClose={() => {
        setImages([]);
        setOpenProjectModal(false);
        setCurrentlyWorking(false);
        reset();
      }}
      TransitionComponent={SlideDown}
      fullWidth
      maxWidth="sm"
    >
      <form
        className=" border-0 shadow-none d-flex flex-column p-3"
        onSubmit={handleSubmit(handleSubmitProject)}
        encType="multipart/form-data"
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
        </label>{" "}
        <input
          name="name"
          type="text"
          {...register("name")}
          className="input mb-3"
        />
        <div className="mb-2">
          <label htmlFor="description">Descripción</label>{" "}
          <span className="text-danger">*</span>
          <textarea
            name="description"
            className="form-control w-100"
            {...register("description")}
          />
        </div>
        <div className="form-check mb-2 currentlyWorking">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => setCurrentlyWorking(!currentlyWorking)}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Actualmente estoy trabajando en este proyecto
          </label>
        </div>
        <div className="mb-2 startDate">
          <label htmlFor="startDate">Fecha de inicio</label>{" "}
          <span className="text-danger">*</span>
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
        <div className="mb-2">
          <label>Página web/repositorio de tu proyecto</label>
          <input
            name="projectLink"
            type="text"
            {...register("projectLink")}
            placeholder="Ej: https://github.com/tu-usuario/tu-repositorio"
          />
        </div>
        <div className="mb-2 attachments">
          <label htmlFor="media">Multimedia</label>
          <input
            onChange={handleImageChange}
            name="media"
            className="form-control w-100"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            multiple
          />
        </div>
        <div className="mb-2">
          {images.length > 0 &&
            images.map((image, index) => (
              <React.Fragment key={index}>
                <div className="d-flex align-items-start justify-content-between align-items-center me-2">
                  <div>
                    <img
                      height={60}
                      className="me-2 border rounded p-1"
                      src={URL.createObjectURL(image)}
                      alt={`Imagen ${index + 1}`}
                    />
                    <span>{image.name}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setImages((prevImages) =>
                        prevImages.filter((_, i) => i !== index)
                      )
                    }
                    className="btn p-0 material-symbols-outlined bg-danger rounded-circle text-white fs-6"
                  >
                    close
                  </button>
                </div>
                {index + 1 != images.length && <hr className="my-2" />}
              </React.Fragment>
            ))}
        </div>
        <div className="mb-2 skills">
          <label htmlFor="skillSearch">
            Selecciona las tecnologías/habilidades utilizadas en tu proyecto
          </label>
          <SkillSearch onSkillSelect={handleSkillSelect} />
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
