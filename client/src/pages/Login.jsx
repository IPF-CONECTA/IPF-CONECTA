// Login.js

import React from "react";
import styles from "../../public/css/login.module.css";

export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
  };

  return (
    <div className={styles["login-container"]}>
      <center>
        <h2>Iniciar Sesión</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            required
          />
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
