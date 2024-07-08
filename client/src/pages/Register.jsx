import React, { useState } from "react";
import styles from "../../public/css/register.module.css";

export const Register = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    fullName: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    setIsModalOpen(false);
    // Aquí puedes agregar la lógica para manejar el registro de usuario
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
            {role === "reclutador" && (
              <div className={styles.formGroup}>
                <label>Nombre de la empresa</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Nombre de la empresa"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            )}
            {role === "egresado" && (
              <div className={styles.formGroup}>
                <label>Nombre completo</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nombre completo"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
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
          onClick={() => handleRoleSelection("egresado")}
        >
          Egresado
        </div>
        <div
          className={styles.roleCard}
          onClick={() => handleRoleSelection("reclutador")}
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

