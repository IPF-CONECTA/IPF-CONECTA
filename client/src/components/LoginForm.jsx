// Login.js
import { set, useForm } from "react-hook-form";
import React, { useContext, useEffect } from "react";
import styles from "../../public/css/login.module.css";
import { authContext } from "../context/auth/Context";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { login, authState } = useContext(authContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { values },
  } = useForm({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (authState.isLogged) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [authState.isLogged, navigate]);

  async function onSubmit(data) {
    const role = await login(data);
    if (role && role == "recruiter") {
      navigate("/seleccionar-compañia");
    }
  }

  return (
    <div className="container">
      <center>
        <h2>Iniciar Sesión</h2>
      </center>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-group"]}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input type="text" required {...register("email")} />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <input type="password" required {...register("password")} />
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
  );
};
