import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";
import { CreateExperienceModal } from "./CreateExperienceModal";

const ExperienceContainer = ({ own, experiencesData }) => {
  const [experiences, setExperiences] = useState(experiencesData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openExperienceModal, setOpenExperienceModal] = useState(false);
  return own ? (
    <>
      <section className="about bg-body-tertiary w-100 text-secondary-emphasis">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold fs-5">Experiencias</span>
          <div className="d-flex">
            <button
              type="button"
              onClick={() => setOpenExperienceModal(true)}
              className="btn w-100 d-flex p-0 align-items-center me-3 "
            >
              <span className="material-symbols-outlined text-dark-emphasis">
                add
              </span>{" "}
            </button>
            <button className="btn d-flex p-0 align-items-center">
              <span className="material-symbols-outlined text-dark-emphasis">
                edit
              </span>
            </button>
            <CreateExperienceModal
              openExperienceModal={openExperienceModal}
              setOpenExperienceModal={setOpenExperienceModal}
            />
          </div>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item text-secondary">
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
