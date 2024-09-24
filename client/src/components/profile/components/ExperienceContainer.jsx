import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";

const ExperienceContainer = ({ own, experiencesData }) => {
  const [experiences, setExperiences] = useState(experiencesData);
  const [openModal, setOpenModal] = useState(false);
  return own ? (
    <>
      <section className="about bg-body-tertiary w-100 text-secondary-emphasis">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold fs-5">Experiencias</span>
          <div className="d-flex">
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="btn w-100 d-flex p-0 align-items-center me-3 "
            >
              <span className="material-symbols-outlined text-dark-emphasis">
                add
              </span>
            </button>
            <button className="btn d-flex p-0 align-items-center">
              <span className="material-symbols-outlined text-dark-emphasis">
                edit
              </span>
            </button>
            {openModal && (
              <Dialog
                open={Boolean(openModal)}
                onClose={() => setOpenModal(null)}
                fullWidth
                maxWidth="sm"
              >
                <div className="p-3">
                  <span className="fs-4 fw-semibold ">Agregar experiencia</span>
                  <div>
                    <form className="shadow-none border-0 p-0 pt-2 d-flex flex-column">
                      <label htmlFor="title">
                        Título <span className="text-danger">*</span>
                      </label>
                      <input
                        name="title"
                        className="form-control w-100 mb-2"
                        type="text"
                        placeholder="Ej: Back End Developer"
                      />
                      <label htmlFor="experienceType">
                        Tipo de empleo <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select  mb-2"
                        name="experienceType"
                        defaultValue={"default"}
                      >
                        <option value="default" disabled>
                          Por favor seleccione
                        </option>
                      </select>
                      <label htmlFor="company">Empresa</label>
                      <input
                        type="text"
                        className="form-control w-100 mb-2"
                        placeholder="Coca-Cola"
                      />
                      <label htmlFor="location">Ubicación</label>
                      <input
                        type="text"
                        className="form-control w-100"
                        placeholder="Formosa, Argentina"
                      />
                      <div class="form-check mb-2">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="flexCheckDefault">
                          Actualmente estoy trabajando en este puesto
                        </label>
                      </div>
                      <label htmlFor="startDate">Fecha de inicio</label>
                      <div className="d-flex gap-3">
                        <select
                          type="date"
                          name="startDateMonth"
                          className="form-select w-100   mb-2"
                          defaultValue={"default"}
                        >
                          <option value="default" disabled>
                            Por favor seleccione el mes
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
                          type="date"
                          name="startDateYear"
                          className="form-select w-100   mb-2"
                          defaultValue={"default"}
                        >
                          <option value="default" disabled>
                            Por favor seleccione el año
                          </option>
                          {Array.from(
                            { length: new Date().getFullYear() - 1924 + 1 },
                            (_, i) => (
                              <option key={1924 + i} value={1924 + i}>
                                {new Date().getFullYear() - i}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <label htmlFor="endDate">Fecha de fin</label>

                      <div className="d-flex gap-3 mb-3">
                        <select
                          type="date"
                          name="endDateMonth"
                          className="form-select w-100   mb-2"
                          defaultValue={"default"}
                        >
                          <option value="default" disabled>
                            Por favor seleccione el mes
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
                          <option value=""></option>
                        </select>
                        <select
                          type="date"
                          name="endDateYear"
                          className="form-select w-100   mb-2"
                          defaultValue={"default"}
                        >
                          <option value="default" disabled>
                            Por favor seleccione el año
                          </option>
                          {Array.from(
                            { length: new Date().getFullYear() - 1924 + 1 },
                            (_, i) => (
                              <option key={1924 + i} value={1924 + i}>
                                {new Date().getFullYear() - i}
                              </option>
                            )
                          )}{" "}
                        </select>
                      </div>
                      <div className="w-100 d-flex justify-content-end">
                        <button className="btn btn-dark">Guardar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog>
            )}
          </div>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item">
              No tienes experiencias, agrega una (esto no se muestra en tu
              perfil)
            </li>
          </ul>
        </div>
      </section>
    </>
  ) : (
    <>
      {experiences.length >= 1 ? (
        <>
          <section className="about bg-dark w-100 text-light">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold fs-5">Experiencias</span>
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                No tienes experiencias, agrega una
              </li>
            </ul>
          </section>
        </>
      ) : null}
    </>
  );
};

export default ExperienceContainer;
