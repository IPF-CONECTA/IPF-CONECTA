import { useForm } from "react-hook-form";
import React, { useContext, useEffect } from "react";
import styles from "../../public/css/login.module.css";
import { authContext } from "../context/auth/Context";
import { Link, useNavigate } from "react-router-dom";
import { useNoti } from "../hooks/useNoti";

export const LoginForm = () => {
  const { login, authState } = useContext(authContext);
  const navigate = useNavigate();
  const noti = useNoti();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (authState.isLogged) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [authState.isLogged, navigate]);

  async function onSubmit(data) {
    const response = await login(data);
    if (response && response.role == "recruiter") {
      console.log(response.associations.name);
      if (response.associations.length == 0) {
        navigate("/registro-de-compañia");
      } else {
        const isApproved = response.associations.find(
          (association) => association.status == "Aprobada"
        );
        if (isApproved) {
          navigate("/inicio");
        } else {
          const isPending = response.associations.find(
            (association) => association.status == "Pendiente"
          );
          if (isPending) {
            navigate("/reclutador-en-espera", {
              state: { companyName: isPending.company.name },
            });
          } else {
            navigate("/mensaje-rechazado");
          }
        }
      }
    }
  }

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-image"]}>
        <img src="/public/iniciar-sesion.png" alt="Login" />
      </div>
      <div className={styles["login-form"]}>
        <h2 className={styles["title-h2"]}>Inicie Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input type="text" required {...register("email")} />
            {errors.email && (
              <span className={styles["error-message"]}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input type="password" required {...register("password")} />
            {errors.password && (
              <span className={styles["error-message"]}>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className={styles["form-group"]}>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className={styles["register-link"]}>
            <span>¿No tienes cuenta? </span>
            <Link to="/register" className={styles["register-link-text"]}>
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
