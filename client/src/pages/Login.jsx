// Login.js
import { useForm } from "react-hook-form";
import React from "react";
import axios from "axios";
import styles from "../../public/css/login.module.css";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { values },
  } = useForm({
    email: "",
    password: "",
  });
  async function onSubmit(data) {
    console.log(data);
    const response = await axios.post(`http://localhost:4000/auth/login`, {
      user: {
        email: data.email,
        password: data.password,
      },
    });
    console.log(response);
  }
  return (
    <div className={styles["login-container"]}>
      <center>
        <h2>Iniciar Sesión</h2>
      </center>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </div>
  );
};
