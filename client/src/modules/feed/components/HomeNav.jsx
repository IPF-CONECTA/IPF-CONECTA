import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../../../public/css/homeNav.module.css";
import { authContext } from "../../../context/auth/Context";

export const HomeNav = () => {
  const { authState } = useContext(authContext);

  return (
    <aside className={`position-fixed top-0 h-100 ${styles.homeNav}`}>
      <div
        className={`d-flex flex-column justify-content-around align-items-start h-100 ${styles.buttons}`}
      >
        <div className={`${styles.button}`}>
          <Link
            className={`fs-5 fw-bold text-secondary text-decoration-none d-flex align-items-center`}
            to="/inicio"
          >
            <span className="material-symbols-outlined fs-2 pe-3">home</span>
            <span>Inicio</span>
          </Link>
        </div>
        <div className={`${styles.button}`}>
          <Link
            to={`/perfil/${authState.user.username}`}
            className={`fs-5 fw-bold text-secondary text-decoration-none d-flex align-items-center`}
          >
            <span className="material-symbols-outlined fs-2 pe-3">person</span>{" "}
            <span className="fs-5 fw-bold">Perfil</span>
          </Link>
        </div>
        <div className={`${styles.button}`}>
          <Link
            to="/comunidad"
            className={`fs-5 fw-bold text-secondary text-decoration-none d-flex align-items-center`}
          >
            <span className="material-symbols-outlined fs-2 pe-3">groups</span>{" "}
            <span className="fs-5 fw-bold">Comunidad</span>
          </Link>
        </div>
        <div className={`${styles.button}`}>
          <Link
            to="/buscar-empleo"
            className={`fs-5 fw-bold text-secondary text-decoration-none d-flex align-items-center`}
          >
            <span className="material-symbols-outlined fs-2 pe-3">work</span>{" "}
            <span className="fs-5 fw-bold">Empleos</span>
          </Link>
        </div>
        <div className={`${styles.button}`}>
          <Link
            to="/mensajes"
            className={`fs-5 fw-bold text-secondary text-decoration-none d-flex align-items-center`}
          >
            <span className="material-symbols-outlined fs-2 pe-3">chat</span>{" "}
            <span className="fs-5 fw-bold">Mensajes</span>
          </Link>
        </div>
        <div className={`${styles.button}`}>
          <Link
            to="/soporte"
            className={`fs-5 fw-bold text-secondary text-decoration-none d-flex align-items-center`}
          >
            <span className="material-symbols-outlined fs-2 pe-3">
              support_agent
            </span>{" "}
            <span className="fs-5 fw-bold">Soporte</span>
          </Link>
        </div>
        <div className={`${styles.button}`}>
          <Link
            className={`fs-5 fw-bold text-secondary text-decoration-none d-flex align-items-center`}
          >
            <span className="material-symbols-outlined fs-2 pe-3">
              settings
            </span>{" "}
            <span className="fs-5 fw-bold">Ajustes</span>
          </Link>
        </div>
        <div className={`${styles.button}`}>
          <Link
            to="/guardados"
            className={`fs-5 fw-bold text-secondary text-decoration-none d-flex align-items-center`}
          >
            <span className="material-symbols-outlined fs-2 pe-3">
              bookmark
            </span>{" "}
            <span className="fs-5 fw-bold">Guardados</span>
          </Link>
        </div>
        <div className={`${styles.button}`}>
          <Link
            className="text-muted text-decoration-none d-flex align-items-center"
            to={"/"}
          >
            <span className="fs-2 pe-3">
              <img
                src="/iconoipf.png"
                className="pe-3"
                width={56}
                height={50}
                alt="IPFC logo"
              />
              <span className="fs-5 fw-bold">Volver</span>
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
