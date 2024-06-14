import React from "react";
import styles from "../../public/css/register.module.css";

export const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el registro de usuario
    console.log("Registration submitted");
  };

  return (
    <div className={styles["register-container"]}>
      <center><h2>Register</h2></center>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={styles["form-group"]}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
