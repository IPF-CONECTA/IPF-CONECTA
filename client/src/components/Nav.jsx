import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../public/iconoipf.png";
import "../../public/nav.css";
import { authContext } from "../context/auth/Context";
import styles from "../../public/css/nav.module.css";

export const Nav = () => {
  const { authState, logout } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/iniciar-sesion");
  };

  return (
    <>
      <div className={`fixed-top bg-light`}>
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
                  <span className="material-symbols-outlined fs-2 fw-light text-muted">
                    account_circle
                  </span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end p-0 p-2">
                  <li>
                    <Link
                      className="dropdown-item w-100 d-flex p-0 justify-content-between"
                      to={`/perfil/${authState.user.profile.id}`}
                    >
                      Mi perfil
                      <img
                        height={24}
                        width={24}
                        src={authState.user.profile.profilePic}
                        alt="tu foto de perfil"
                      />
                    </Link>
                  </li>
                  {authState.role === "admin" && (
                    <>
                      <li>
                        <Link
                          to={"/admin/dash"}
                          className="dropdown-item d-flex justify-content-between w-100 p-0 pt-2"
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
                className="nav-link d-flex align-items-center"
                to={"/iniciar-sesion"}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};
