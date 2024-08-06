import React from "react";
import "../../public/footer.css";
import logoImage from "../../public/iconoipf.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="FinPag">
      <div className="d-flex align-items-center">
        <Link to={"/"}>
          <img
            src={logoImage}
            alt="Logo"
            className="d-inline-block align-text-top me-3 ms-3"
            width="35"
            height="40"
          />
        </Link>
        <span className="mb-3 mb-md-0">IPF-CONECTA © 2024</span>
      </div>
      <ul className="nav list-unstyled d-flex pe-3">
        <li className="ms-3">
          <Link to={"/"}>
            <span
              className="material-symbols-outlined"
              style={{ color: "black" }}
            >
              home
            </span>
          </Link>
        </li>
        <li className="ms-3">
          <Link to={"/comunidad"}>
            <span
              className="material-symbols-outlined"
              style={{ color: "black" }}
            >
              group
            </span>
          </Link>
        </li>
        <li className="ms-3">
          <Link to={"/support"}>
            <span
              className="material-symbols-outlined"
              style={{ color: "black" }}
            >
              info
            </span>
          </Link>
        </li>
      </ul>
    </footer>
  );
};
