import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../public/iconoipf.png";
import "../../public/nav.css";
import { authContext } from "../context/auth/Context";
import styles from "../../public/css/nav.module.css";
export const Nav = () => {
  const { authState, logout } = useContext(authContext);
  //console.log(authState);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/iniciar-sesion");
  };
  return (
    <>
      <nav className="d-flex justify-content-between p-2 px-3">
        <Link className="navbar-brand" to="/">
          <img
            src={logoImage}
            alt="Logo"
            width="35"
            height="40"
            className="d-inline-block align-text-top"
          />
        </Link>
        <div className="d-flex w-50 justify-content-between">
          {authState.isLogged ? (
            <Link
              className="navbar-brand d-flex align-items-center"
              to={"/inicio"}
            >
              Comunidad
            </Link>
          ) : null}
          <Link
            className="nav-link d-flex align-items-center"
            to={"/buscar-empleo"}
          >
            Empleos
          </Link>
          <Link to={"/contacto"} className="nav-link d-flex align-items-center">
            Contacto
          </Link>
          {authState.isLogged ? (
            <div className="nav-item dropdown d-flex">
              <Link
                className={`nav-link d-flex align-items-center m-0 dropdown-toggle ${styles.noArrow}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {" "}
                <span className="material-symbols-outlined fs-2 fw-light text-muted">
                  account_circle
                </span>
                <p className="navbar-brand d-flex align-items-center">
                  {authState.user.profile.names}, {authState.role.toUpperCase()}
                </p>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end p-0 p-2">
                <li>
                  <Link
                    className="dropdown-item w-100 d-flex p-0 justify-content-between"
                    to={"#"}
                  >
                    Mi perfil
                    <img
                      height={25}
                      width={25}
                      src={authState.user.profile.profilePic}
                      alt="tu foto de perfil"
                    />
                  </Link>
                </li>
                {authState.role == "admin" && (
                  <li>
                    <Link
                      to={"#"}
                      className="dropdown-item d-flex justify-content-between w-100 p-0 pt-2"
                    >
                      Panel
                      <span className="material-symbols-outlined fw-light fs-3">
                        shield_person
                      </span>
                    </Link>
                  </li>
                )}
                <li>
                  <hr className="m-1" />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item d-flex p-0 justify-content-between"
                  >
                    Cerrar sesion
                    <span className="material-symbols-outlined fw-light">
                      logout
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              className="nav-link d-flex align-items-center"
              to={"/iniciar-sesion"}
            >
              Iniciar Sesion
            </Link>
          )}
        </div>
      </nav>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logoImage}
            alt="Logo"
            width="35"
            height="40"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {authState.isLogged ? (
              <>
                <li className="nav-item">
                  <Link to="/inicio" className="nav-link">
                    <span className="material-symbols-outlined">
                      diversity_3
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn nav-link">
                    <span className="material-symbols-outlined">logout</span>
                  </button>
                </li>
                <li className="nav-item">
                  <Link to="/messages" className="nav-link">
                    <span className="material-symbols-outlined">chat</span>
                  </Link>
                </li>
                {authState.role === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link">
                        <span className="material-symbols-outlined">
                          admin_panel_settings
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/panel" className="nav-link">
                        <span className="material-symbols-outlined">
                          admin_panel_settings
                        </span>
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <span className="material-symbols-outlined">login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/support" className="nav-link">
                    <span className="material-symbols-outlined">
                      support_agent
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link to="/buscar-empleo" className="nav-link">
                <span className="material-symbols-outlined">work</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/community" className="nav-link"></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> */}
    </>
  );
};
