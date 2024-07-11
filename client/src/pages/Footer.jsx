import React from "react";
import "../../public/footer.css";
import logoImage from "../../public/iconoipf.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="FinPag">
        <footer>
          <div className="d-flex align-items-center">
            <Link to={"/"}><img src={logoImage} alt="Logo" className="logoImage" /></Link>
            <span className="mb-3 mb-md-0">IPF-CONECTA © 2024</span> 
          </div>
          <ul className="nav list-unstyled d-flex">
            <li className="ms-3">
              <Link to={"/"}>
                <span className="material-symbols-outlined">home</span>
              </Link>
            </li>
            <li className="ms-3">
              <Link to={"/comunidad"}>
                <span className="material-symbols-outlined">group</span>
              </Link>
            </li>
            <li className="ms-3">
              <Link to={"/support"}>
                <span className="material-symbols-outlined">info</span>
              </Link>
            </li>
          </ul>
        </footer>
      </div>
  );
};
