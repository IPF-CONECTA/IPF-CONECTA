import React, { useState } from "react";
import axios from "axios";
import styles from "../../public/css/register.module.css";

export const Register = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    names: "",
    surnames: "",
    cuil: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: formData.email,
      password: formData.password,
      role: role,
      cuil: role === "student" ? formData.cuil : null,
      names: role === "student" ? formData.names : formData.names,
      surnames: role === "student" ? formData.surnames : formData.surnames,
    };
    console.log(user);
    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        user,
      });
      console.log("User registered:", response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(error.response?.data?.message || "Error en el registro");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <form className={styles.formStep}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={() => setStep(3)}
            >
              Siguiente
            </button>
          </form>
        );
      case 3:
        return (
          <form className={styles.formStep}>
            {role === "recruiter" && (
              <>
                <div className={styles.formGroup}>
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="names"
                    placeholder="Nombres"
                    value={formData.names}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Apellidos</label>
                  <input
                    type="text"
                    name="surnames"
                    placeholder="Apellidos"
                    value={formData.surnames}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {role === "student" && (
              <>
                <div className={styles.formGroup}>
                  <label>Nombres</label>
                  <input
                    type="text"
                    name="names"
                    placeholder="Nombres"
                    value={formData.names}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Apellidos</label>
                  <input
                    type="text"
                    name="surnames"
                    placeholder="Apellidos"
                    value={formData.surnames}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>CUIL</label>
                  <input
                    type="text"
                    name="cuil"
                    placeholder="CUIL"
                    value={formData.cuil}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <button
              className={styles.button}
              type="button"
              onClick={() => setStep(4)}
            >
              Siguiente
            </button>
          </form>
        );
      case 4:
        return (
          <form className={styles.formStep} onSubmit={handleSubmit}>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <button className={styles.button} type="submit">
              Registrarse
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles["register-container"]}>
      <h2>Registro</h2>
      <div className={styles.roleSelectionContainer}>
        <div
          className={styles.roleCard}
          onClick={() => handleRoleSelection("student")}
        >
          Egresado
        </div>
        <div
          className={styles.roleCard}
          onClick={() => handleRoleSelection("recruiter")}
        >
          Reclutador
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            {renderStep()}
          </div>
        </div>
      )}
    </div>
  );
};
