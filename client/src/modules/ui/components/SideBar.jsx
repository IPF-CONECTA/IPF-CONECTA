import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidHomeAlt2 } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { BsChatFill } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";

import { authContext } from "../../../context/auth/Context.js";
import styles from "../../../../public/css/sidebar.module.css";
import { useNoti } from "../../../hooks/useNoti.jsx";
import { BASE_URL } from "../../../constants/BASE_URL.js";
import { useChatContext } from "../../../context/chat/ChatContext.jsx";

export const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { authState, logout } = useContext(authContext);
  const { setReceiver, setChatId } = useChatContext();
  const location = useLocation();
  const noti = useNoti();
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate("/iniciar-sesion");
  };

  const handleNavigatePrivate = (url) => {
    !authState.isLogged && noti("Inicia sesión para continuar", "info");
    navigate(authState.isLogged ? url : "/iniciar-sesion");
    setOpen(false);
  };
  return (
    <nav
      className={`d-flex flex-column bg-white gap-4 justify-content-between align-items-start position-fixed start-0 h-100 border border-start-0 rounded-end-5 p-3 ${
        styles.navContainer
      } ${open && styles.open}`}
    >
      <div className="d-flex flex-column mt-4" style={{ gap: "1.5rem" }}>
        <button
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
          className={`d-flex align-items-center p-1 rounded btn me-2 ${styles.navItem}`}
        >
          <img src="/iconoipf.png" className={styles.navLogo} width={24} />
          <div
            className={`${styles.navText} ${
              styles.movingGradientText
            } fw-semibold ${open && styles.open} ms-2`}
          >
            IPF-Conecta
          </div>
        </button>
        <div
          className={`d-flex align-items-center p-1 rounded ${styles.navItem}`}
          onClick={() => setOpen(!open)}
        >
          <div
            className={`${styles.burgerIconAnimation} ${open && styles.open}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span
            className={`${styles.navText} fw-semibold ${
              open && styles.open
            } ms-2`}
          >
            Ocultar
          </span>
        </div>
        {authState.isLogged && authState.role == "admin" ? (
          <>
            <button
              onClick={() => {
                navigate("/admin/dash");
              }}
              className={`d-flex btn align-items-center p-1 rounded  ${styles.navItem}`}
            >
              <MdAdminPanelSettings size={26} color="#117bb9" />
              <span
                className={`${styles.navText} fw-semibold ${
                  open && styles.open
                } ms-2`}
                style={{ color: authState.isLogged ? "#117bb9" : "#7c848b" }}
              >
                Dashboard
              </span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleNavigatePrivate("/inicio")}
              className={`d-flex btn align-items-center p-1 rounded  ${styles.navItem}`}
            >
              <BiSolidHomeAlt2
                size={26}
                color={`${authState.isLogged ? "#117bb9" : "#7c848b"}`}
              />
              <span
                className={`${styles.navText} fw-semibold ${
                  open && styles.open
                } ms-2`}
                style={{ color: authState.isLogged ? "#117bb9" : "#7c848b" }}
              >
                Social
              </span>
            </button>
            <button
              onClick={() =>
                handleNavigatePrivate(`/perfil/${authState?.user?.username}`)
              }
              className={`d-flex align-items-center p-1 rounded btn  ${styles.navItem}`}
            >
              {authState.isLogged ? (
                <img
                  src={`${BASE_URL}/images/${authState.user.profile.profilePic}`}
                  height={26}
                  width={26}
                  className="rounded-circle"
                />
              ) : (
                <MdAccountCircle size={26} color="#7c848b" />
              )}
              <span
                className={`${styles.navText} fw-semibold ${
                  open && styles.open
                } ms-2`}
                style={{ color: authState.isLogged ? "#117bb9" : "#7c848b" }}
              >
                Perfil
              </span>
            </button>
            <button
              className={`d-flex align-items-center p-1 rounded btn  ${styles.navItem}`}
            >
              <IoNotifications
                size={26}
                color={`${authState.isLogged ? "#117bb9" : "#7c848b"}`}
              />
              <span
                className={`${styles.navText} fw-semibold ${
                  open && styles.open
                } ms-2`}
                style={{ color: authState.isLogged ? "#117bb9" : "#7c848b" }}
              >
                Notificaciones
              </span>
            </button>
            <button
              onClick={() => {
                handleNavigatePrivate("/mensajes");
                setReceiver(null);
                setChatId(null);
              }}
              className={`d-flex align-items-center p-1 rounded btn ${styles.navItem}`}
            >
              <BsChatFill
                size={26}
                color={`${authState.isLogged ? "#117bb9" : "#7c848b"}`}
                style={{ padding: "0.2rem" }}
              />
              <span
                className={`${styles.navText} fw-semibold ${
                  open && styles.open
                } ms-2`}
                style={{ color: authState.isLogged ? "#117bb9" : "#7c848b" }}
              >
                Mensajes
              </span>
            </button>
          </>
        )}
        <button
          onClick={() => {
            navigate("/buscar-empleo");
            setOpen(false);
          }}
          className={`d-flex align-items-center p-1 rounded btn ${styles.navItem}`}
        >
          <MdOutlineWork
            size={26}
            color="#117bb9"
            style={{ padding: "0.1rem" }}
          />
          <span
            className={`${styles.navText} fw-semibold ${
              open && styles.open
            } ms-2`}
          >
            Empleos
          </span>
        </button>
        <button
          onClick={() => {
            navigate("/ideas-de-proyectos");
            setOpen(false);
          }}
          className={`d-flex align-items-center p-1 rounded btn ${styles.navItem}`}
        >
          <FaLightbulb
            size={26}
            color="#117bb9"
            style={{ padding: "0.15rem" }}
          />
          <span
            className={`${styles.navText} fw-semibold ${
              open && styles.open
            } ms-2`}
          >
            Proyectos
          </span>
        </button>
        <button
          onClick={() => {
            navigate("/contacto");
            setOpen(false);
          }}
          className={`d-flex align-items-center p-1 rounded btn ${styles.navItem}`}
        >
          <MdOutlineHelp
            size={26}
            color="#117bb9"
            style={{ padding: "0.1rem" }}
          />
          <span
            className={`${styles.navText} fw-semibold ${
              open && styles.open
            } ms-2`}
          >
            Soporte
          </span>
        </button>
      </div>
      <div className="mb-3">
        {authState.isLogged ? (
          <button
            onClick={handleLogout}
            className={`btn d-flex align-items-center p-1 rounded text-decoration-none ${styles.navItem}`}
          >
            <IoLogOut
              size={26}
              color="#117bb9"
              style={{ padding: "0.1rem", marginLeft: "0.1rem" }}
            />
            <span
              className={`${styles.navText} fw-semibold ${
                open && styles.open
              } ms-1`}
            >
              Cerrar sesión
            </span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/iniciar-sesion")}
            className={`btn d-flex align-items-center p-1 rounded text-decoration-none ${styles.navItem}`}
          >
            <IoLogIn
              size={26}
              color="#117bb9"
              style={{ padding: "0.1rem", marginLeft: "0.1rem" }}
            />
            <span
              className={`${styles.navText} fw-semibold ${
                open && styles.open
              } ms-1`}
            >
              Iniciar sesión
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};
