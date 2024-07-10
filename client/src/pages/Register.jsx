import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../public/css/register.module.css";
import { useNoti } from "../hooks/useNoti";

export const Register = () => {
  const noti = useNoti();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    names: "",
    surnames: "",
    cuil: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
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

    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        user,
      });

      localStorage.setItem("token", response.data.token);
      noti(response.data.message, "success");
      setStep(5);
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage(error.response?.data?.message || "Error en el registro");
      noti(errorMessage, "error");
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/auth/confirm-account",
        { receivedCode: verificationCode },
        {
          headers: {
            token: token,
          },
        }
      );

      noti(response.data.message, "success");
      console.log("Usuario verificado:", response.data);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error durante la verificación:", error);
      const message =
        error.response?.data?.message || "Error en la verificación";
      setErrorMessage(message);
      noti(message, "error");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.roleSelectionContainer}>
            <div
              className={styles.roleCard}
              onClick={() => handleRoleSelection("student")}
            >
              <img
                src="../../public/iconoipf.png"
                alt="Egresado"
                className={styles.roleImage}
              />
              Egresado
            </div>
            <div
              className={styles.roleCard}
              onClick={() => handleRoleSelection("recruiter")}
            >
              <img
                src="../../public/iconoipf.png"
                alt="Reclutador"
                className={styles.roleImage}
              />
              Reclutador
            </div>
          </div>
        );
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
      case 5:
        return (
          <form className={styles.formStep} onSubmit={handleVerificationSubmit}>
            <div className={styles.formGroup}>
              <label>Código de Verificación</label>
              <input
                type="text"
                name="verificationCode"
                placeholder="Código de Verificación"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <button className={styles.button} type="submit">
              Verificar
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles["register-container"]}>
      <h2>¡Bienvenido! Elige tu Rol:</h2>
      {renderStep()}
    </div>
  );
};
