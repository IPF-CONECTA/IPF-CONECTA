import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="w-100 d-flex justify-content-evenly border py-2">
      <Link to={"#"} className="btn fw-semibold text-decoration-none text-dark">
        Resumen
      </Link>
      <Link to={"#"} className="btn fw-semibold text-decoration-none text-dark">
        Publicaciones
      </Link>
      <Link to={"#"} className="btn fw-semibold text-decoration-none text-dark">
        Experiencias
      </Link>
      <Link to={"#"} className="btn fw-semibold text-decoration-none text-dark">
        Educación
      </Link>
      <Link to={"#"} className="btn fw-semibold text-decoration-none text-dark">
        Proyectos
      </Link>
      <Link to={"#"} className="btn fw-semibold text-decoration-none text-dark">
        Habilidades
      </Link>
      <Link to={"#"} className="btn fw-semibold text-decoration-none text-dark">
        Idiomas
      </Link>
    </nav>
  );
};

export default Nav;
