// Register.js

import React from "react";
import styles from "../../public/css/register.module.css";

export const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted");
    // Aquí puedes agregar la lógica para manejar el registro de usuario
  };

  return (
    <div className={styles["register-container"]}>
      <center>
        <h2>Registro</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name" className={styles.label}>
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            required
          />
        </div>
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
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};
