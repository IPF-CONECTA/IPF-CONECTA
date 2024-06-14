import React from "react";
import styles from "../../public/css/login.module.css";

export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    console.log("Login submitted");
  };

  return (
    <div className={styles["login-container"]}>
      <center><h2>Login</h2></center>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={styles["form-group"]}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
