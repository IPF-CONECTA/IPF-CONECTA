import React from "react";
import { Link } from "react-router-dom";
import styles from "../../public/css/homeNav.module.css";
const HomeNav = () => {
  return (
    <aside className={`w-25 position-fixed top-0 h-100 ${styles.homeNav}`}>
      <div className="d-flex flex-column justify-content-around align-items-start h-100">
        <div>
          <Link
            to="/inicio"
            className="text-muted text-decoration-none d-flex align-items-center"
          >
            <span class="material-symbols-outlined fs-1 pe-3">home</span>
            <span className="fs-4 fw-bold">Inicio</span>
          </Link>
        </div>
        <div>
          <Link
            to="/perfil"
            className="text-muted text-decoration-none d-flex align-items-center"
          >
            <span class="material-symbols-outlined fs-1 pe-3">person</span>{" "}
            <span className="fs-4 fw-bold">Perfil</span>
          </Link>
        </div>
        <div>
          <Link
            to="/comunidad"
            className="text-muted text-decoration-none d-flex align-items-center"
          >
            <span class="material-symbols-outlined fs-1 pe-3">groups</span>{" "}
            <span className="fs-4 fw-bold">Comunidad</span>
          </Link>
        </div>
        <div>
          <Link
            to="/buscar-empleo"
            className="text-muted text-decoration-none d-flex align-items-center"
          >
            <span class="material-symbols-outlined fs-1 pe-3">work</span>{" "}
            <span className="fs-4 fw-bold">Empleos</span>
          </Link>
        </div>
        <div>
          <Link
            to="/mensajes"
            className="text-muted text-decoration-none d-flex align-items-center"
          >
            <span class="material-symbols-outlined fs-1 pe-3">chat</span>{" "}
            <span className="fs-4 fw-bold">Mensajes</span>
          </Link>
        </div>
        <div>
          <Link
            to="/soporte"
            className="text-muted text-decoration-none d-flex align-items-center"
          >
            <span class="material-symbols-outlined fs-1 pe-3">
              support_agent
            </span>{" "}
            <span className="fs-4 fw-bold">Soporte</span>
          </Link>
        </div>
        <div>
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <span class="material-symbols-outlined fs-1 pe-3">settings</span>{" "}
            <span className="fs-4 fw-bold">Ajustes</span>
          </Link>
        </div>
        <div>
          <Link
            className="text-muted text-decoration-none d-flex align-items-center"
            to={"/"}
          >
            <span class="fs-1 pe-3">
              <img
                src="/iconoipf.png"
                className="pe-3"
                width={56}
                height={50}
                alt="IPFC logo"
              />
              <span className="fs-4 fw-bold">Volver</span>
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default HomeNav;
