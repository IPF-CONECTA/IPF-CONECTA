import React from "react";
import styles from "../../public/css/footer.module.css";
import logoImage from "../../public/iconoipf.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      className={`${styles.finPage} d-flex justify-content-between px-5 my-3`}
    >
      <div className="d-flex ">
        <Link to={"/"}>
          <img
            src={logoImage}
            alt="Logo"
            className="d-inline-block  me-3 ms-3"
            width="35"
            height="40"
          />
        </Link>
        <span className="text-align-center">IPF-CONECTA © 2024</span>
      </div>
      <ul className="nav list-unstyled d-flex">
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
