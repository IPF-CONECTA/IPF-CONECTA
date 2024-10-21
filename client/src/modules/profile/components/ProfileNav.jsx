import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../../public/css/profileNav.module.css";
export const Nav = () => {
  return (
    <div
      className={`${styles.navContainer} w-100 d-flex flex-nowrap justify-content-evenly border-top py-2`}
    >
      <Link to={"#"} className="btn fw-semibold text-decoration-none text-dark">
        Resumen
      </Link>
      <Link
        to={"#"}
        className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
      >
        Publicaciones
      </Link>
      <Link
        to={"#"}
        className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
      >
        Experiencias
      </Link>
      <Link
        to={"#"}
        className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
      >
        Educación
      </Link>
      <Link
        to={"#"}
        className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
      >
        Proyectos
      </Link>
      <Link
        to={"#"}
        className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
      >
        Habilidades
      </Link>
      <Link
        to={"#"}
        className={`${styles.navLink} btn fw-semibold text-decoration-none text-dark`}
      >
        Idiomas
      </Link>
    </div>
  );
};
