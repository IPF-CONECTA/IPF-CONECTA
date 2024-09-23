import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../public/css/profile.module.css";

const ExperienceContainer = ({ own, experiences }) => {
  const navigate = useNavigate();
  return own ? (
    <>
      <section className="about bg-body-tertiary w-100 text-secondary-emphasis">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold fs-5 mb-2">Experiencias</span>
          <div className="nav-item dropdown d-flex">
            <Link
              className={`nav-link d-flex align-items-center m-0 dropdown-toggle ${styles.noArrow}`}
              to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <button className={`p-0 btn ${styles.btnAdd}`}>
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end p-0 p-2 bg-light">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                  className="dropdown-item w-100 d-flex p-0 justify-content-between"
                >
                  {experiences.length > 1
                    ? "Editar experiencias"
                    : "Agregar experiencia"}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item">
              No tienes experiencias, agrega una
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
