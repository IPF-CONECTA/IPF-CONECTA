import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authContext } from "../../../context/auth/Context";
import logoImage from "../../../../public/iconoipf.png";
import styles from "../../../../public/css/nav.module.css";
import { BASE_URL } from "../../../constants/BASE_URL";

export const Nav = () => {
  const { authState, logout } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/iniciar-sesion");
  };

  return (
    <>
      <div>
        <nav className="d-flex justify-content-between align-items-center p-2 px-3">
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
            {authState.isLogged && authState.role !== "admin" ? (
              <Link
                className="navbar-brand d-flex align-items-center"
                to={"/inicio"}
              >
                Comunidad
              </Link>
            ) : null}
            <Link
              className="nav-link d-flex align-items-center"
              to={"/ideas-de-proyectos"}
            >
              Ideas de proyectos
            </Link>
            <Link
              className="nav-link d-flex align-items-center"
              to={"/buscar-empleo"}
            >
              Empleos
            </Link>
            <Link
              to={"/contacto"}
              className="nav-link d-flex align-items-center"
            >
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
                  <img
                    height={35}
                    width={35}
                    crossOrigin="anonymous"
                    className="rounded-circle"
                    src={`${BASE_URL}/images/${authState.user.profile.profilePic}`}
                    alt="tu foto de perfil"
                  />
                </Link>
                <ul className="dropdown-menu dropdown-menu-end p-0 p-2">
                  {authState.role !== "admin" && (
                    <>
                      <li>
                        <Link
                          className="dropdown-item w-100 d-flex p-0 justify-content-between"
                          to={`/perfil/${authState.user.username}`}
                        >
                          Mi perfil
                          <span className="material-symbols-outlined fw-light">
                            account_circle
                          </span>
                        </Link>
                      </li>
                      <li>
                        <hr className="m-1" />
                      </li>
                      <li>
                        <Link
                          to={"/editar-perfil"}
                          className="dropdown-item d-flex justify-content-between w-100 p-0"
                        >
                          Editar perfil
                          <span className="material-symbols-outlined fw-light">
                            edit_square
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  {authState.role === "admin" && (
                    <>
                      <li>
                        <Link
                          to={"/admin/dash"}
                          className="dropdown-item d-flex justify-content-between w-100 p-0"
                        >
                          DashBoard
                          <span className="material-symbols-outlined  fw-light">
                            admin_panel_settings
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <hr className="m-1" />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item d-flex p-0 justify-content-between"
                    >
                      Cerrar sesión
                      <span className="material-symbols-outlined fw-light">
                        logout
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                className={`${styles.loginButton} btn btn-primary py-1 d-flex align-items-center`}
                to={"/iniciar-sesion"}
              >
                <span className="">Iniciar Sesión</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};
