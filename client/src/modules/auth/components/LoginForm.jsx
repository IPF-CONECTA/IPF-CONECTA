import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { authContext } from "../../../context/auth/Context";
import styles from "../../../../public/css/login.module.css";

export const LoginForm = () => {
  const { login, authState } = useContext(authContext);
  const [watchPassword, setWatchPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (authState.isLogged) {
      navigate("/");
    }
  }, [authState.isLogged]);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await login(data);
      if (response && response.role == "recruiter") {
        if (response.associations.length === 0) {
          navigate("/seleccionar-empresa");
        } else {
          const isApproved = response.associations.find(
            (association) => association.status == "Aprobada"
          );
          const isRefused = response.associations.find(
            (association) => association.status == "Rechazada"
          );

          if (isApproved) {
            navigate("/inicio");
          } else {
            const isPending = response.associations.find(
              (association) => association.status == "Pendiente"
            );
            if (isPending) {
              navigate("/solicitud-del-mentor", {
                state: {
                  companyName: isPending.company.name,
                  status: "Pendiente",
                },
              });
            }

            if (isRefused) {
              navigate("/solicitud-del-reclutador", {
                state: {
                  companyName: isRefused.company.name,
                  status: "Rechazada",
                },
              });
            }
          }
        }
      } else if (response.role == "student") {
        navigate("/inicio");
      } else if (response.role == "admin") {
        navigate("/admin/dash");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex w-100 justify-content-between align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-50 d-flex justify-content-center">
        <img src="./img/login.jpg" height={600} alt="Login" />
      </div>
      <div className={"w-50"}>
        <form onSubmit={handleSubmit(onSubmit)} className="shadow">
          <span className={`fs-3 fw-semibold ${styles["title-h2"]}`}>
            Iniciar Sesión
          </span>
          <div className="form-floating mb-3 mt-2">
            <input
              {...register("email")}
              type="text"
              className="form-control w-100"
              id="floatingInput"
              placeholder="Email o username"
            />
            <label htmlFor="floatingInput" className="bg-transparent">
              Email o username
            </label>
          </div>
          <div className="form-floating">
            <input
              {...register("password")}
              type={watchPassword ? "text" : "password"}
              className="form-control w-100"
              id="floatingPassword"
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={() => setWatchPassword(!watchPassword)}
              className="btn p-0 me-2 position-absolute d-flex align-items-center"
              style={{ right: 0, top: "30%" }}
            >
              <span className="material-symbols-outlined text-secondary">
                visibility
              </span>
            </button>
            <label htmlFor="floatingPassword" className="bg-transparent">
              Contraseña
            </label>
          </div>
          <div className="mb-3 d-flex justify-content-end">
            Olvidaste tu contraseña?{" "}
            <Link className="ms-2 text-decoration-none"> Recuperar</Link>
          </div>
          <div className={styles["form-group"]}>
            <button
              disabled={loading}
              type="submit"
              className={`fw-bold fs-5 p-2 ${styles.button}`}
            >
              Ingresar
            </button>
          </div>
          <div className={styles["register-link"]}>
            <span>¿No tienes cuenta? </span>
            <Link to="/registrate" className={styles["register-link-text"]}>
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
