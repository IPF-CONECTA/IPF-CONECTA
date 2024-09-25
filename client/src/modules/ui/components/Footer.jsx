import { Link } from "react-router-dom";

import styles from "../../../../public/css/footer.module.css";
import logoImage from "../../../../public/iconoipf.png";

export const Footer = () => {
  return (
    <footer
      className={`${styles.finPage} d-flex justify-content-between px-5 my-3`}
    >
      <div className="d-flex align-items-center">
        <Link to={"/"}>
          <img
            src={logoImage}
            alt="Logo"
            className="d-inline-block  me-3 ms-3"
            width="35"
            height="40"
          />
        </Link>
        <span>IPF-CONECTA © 2024</span>
      </div>
      <ul className="nav list-unstyled d-flex ">
        <li className="d-flex align-items-center">
          <Link to={"/"}>
            <span className="material-symbols-outlined text-info-emphasis">
              home
            </span>
          </Link>
        </li>
        <li className="d-flex align-items-center">
          <Link to={"/inicio"}>
            <span className="material-symbols-outlined text-info-emphasis ms-3">
              group
            </span>
          </Link>
        </li>
        <li className="d-flex align-items-center">
          <Link to={"/contacto"}>
            <span className="material-symbols-outlined text-info-emphasis ms-3">
              info
            </span>
          </Link>
        </li>
      </ul>
    </footer>
  );
};
