import React from "react";
import "../../public/footer.css";
import logoImage from "../../public/iconoipf.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="FinPag">
        <footer>
          <div className="d-flex align-items-center">
            <a href="#">
              <img src={logoImage} alt="Logo" className="logoImage" />
            </a>
            <span className="mb-3 mb-md-0">IPF-CONECTA © 2024</span>
          </div>

          <ul className="nav list-unstyled d-flex">
            <li className="ms-3">
              <a href="#">
                <span className="material-symbols-outlined">home</span>
              </a>
            </li>
            <li className="ms-3">
              <a href="#">
                <span className="material-symbols-outlined">group</span>
              </a>
            </li>
            <li className="ms-3">
              <a href="#">
                <span className="material-symbols-outlined">info</span>
              </a>
            </li>
          </ul>
        </footer>
      </div>
  );
};
