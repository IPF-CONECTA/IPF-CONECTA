import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../public/css/profile.module.css";

const AboutCard = ({ profileData }) => {
  return (
    <section className="w-100 border d-flex flex-column">
      <div className="d-flex  justify-content-between">
        <span className="fw-bold fs-5 ">Acerca de mi</span>
        {profileData.own ? (
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
            <ul className="dropdown-menu dropdown-menu-end p-0 p-2">
              {profileData.profile.about !== null ? (
                <>
                  <li>
                    <button className="dropdown-item w-100 d-flex p-0 justify-content-between">
                      Editar descripción
                    </button>
                  </li>
                  <li>
                    <hr className="m-1" />
                  </li>
                  <li>
                    <button className="dropdown-item d-flex p-0 justify-content-between">
                      Borrar descripción
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={() => {}}
                    className="dropdown-item w-100 d-flex p-0 justify-content-between"
                  >
                    Agregar descripción
                  </button>
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
      {profileData.profile.about !== null ? (
        <div>{profileData.profile.about}</div>
      ) : (
        <span>Sin descripción</span>
      )}
    </section>
  );
};

export default AboutCard;