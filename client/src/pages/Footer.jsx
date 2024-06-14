import React from "react";
import "../../public/footer.css";
import logoImage from "../../public/iconoipf.png";

export const Footer = () => {
  return (
    <div className="FinPag">
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
          <div className="col-md-4 d-flex align-items-center">
            <a href="#">
              <img src={logoImage} alt="Logo" className="logoImage" />
            </a>
            <span className="mb-3 mb-md-0">IPF-CONECTA © 2024</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
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
    </div>
  );
};
