import React from "react";
import { Link } from "react-scroll";
import styles from "../../../../public/css/profileNav.module.css";
export const Nav = ({ role }) => {
  return (
    role && (
      <div
        className={`${styles.navContainer} w-100 d-flex flex-nowrap justify-content-evenly border-top py-2`}
      >
        <Link
          activeClass="active"
          spy
          to="resumen"
          className="btn fw-semibold text-decoration-none text-dark"
        >
          Resumen
        </Link>
        <Link
          activeClass="active"
          spy
          to="publicaciones"
          className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
        >
          Publicaciones
        </Link>
        <Link
          activeClass="active"
          spy
          to="experiencias"
          className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
        >
          Experiencias
        </Link>
        <Link
          activeClass="active"
          spy
          to="educacion"
          className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
        >
          Educación
        </Link>

        {role === "recruiter" && (
          <Link
            activeClass="active"
            spy
            to="empleos"
            className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
          >
            Empleos
          </Link>
        )}

        {role === "student" && (
          <>
            <Link
              activeClass="active"
              spy
              to="proyectos"
              className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
            >
              Proyectos
            </Link>
            <Link
              activeClass="active"
              spy
              to="habilidades"
              className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
            >
              Habilidades
            </Link>
            <Link
              activeClass="active"
              spy
              to="idiomas"
              className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
            >
              Idiomas
            </Link>
          </>
        )}
      </div>
    )
  );
};
