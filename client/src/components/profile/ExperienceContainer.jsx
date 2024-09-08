import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../public/css/profile.module.css";

const ExperienceContainer = ({ profileData, experiences }) => {
  return profileData.own ? (
    <>
      <section className="about bg-dark w-100 text-light">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold fs-5">Experiencias</span>
          <div className="nav-item dropdown d-flex">
            <Link
              className={`nav-link d-flex align-items-center m-0 dropdown-toggle ${styles.noArrow}`}
              to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <button
                className={`p-0 btn bg-secondary-subtle ${styles.btnAdd}`}
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end p-0 p-2 bg-light">
              {experiences.length >= 1 ? (
                <>
                  <li>
                    <button className="dropdown-item w-100 d-flex p-0 justify-content-between">
                      Editar experiencias
                    </button>
                  </li>
                  <li>
                    <hr className="m-1" />
                  </li>
                  <li>
                    <button className="dropdown-item d-flex p-0 justify-content-between">
                      Agregar experiencias
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button className="dropdown-item w-100 d-flex p-0 justify-content-between">
                    Agregar experiencia
                  </button>
                </li>
              )}
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
