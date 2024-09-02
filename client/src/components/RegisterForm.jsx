import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../public/css/register.module.css";
import { useNoti } from "../hooks/useNoti";
import { authService } from "../services/authService";

export const RegisterForm = () => {
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
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    names: "",
    surnames: "",
    cuil: "",
  });

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
    validateField(name, value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: value.includes("@") ? "" : "El email debe contener '@'",
        }));
        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}/.test(value)
            ? ""
            : "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un símbolo",
        }));
        break;
      case "cuil":
        setErrors((prevErrors) => ({
          ...prevErrors,
          cuil: value.length === 11 ? "" : "El CUIL debe tener 11 dígitos",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      noti("Por favor corrige los errores antes de enviar el formulario.", "error");
      return;
    }

    const user = {
      email: formData.email,
      password: formData.password,
      role: role,
      cuil: role === "student" ? formData.cuil : null,
      names: formData.names,
      surnames: formData.surnames,
    };

    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        user,
      });
      console.log(response);
      authService.setToken(response.data.token);
      noti(response.data.message, "success");
      setStep(4);
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage(error.response?.data?.message || "Error en el registro");
      noti(
        error.response?.data?.message || error.response.data.errors[0].msg,
        "error"
      );
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/confirm-account",
        { receivedCode: verificationCode },
        {
          headers: {
            authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );

      noti(response.data.message, "success");
      console.log("Usuario verificado:", response.data);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error durante la verificación:", error);
      const message = error.response?.data?.message || "Error en la verificación";
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: message,
      }));
      noti(message, "error");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.roleSelectionContainer}>
            <div
              className={`${styles.roleCard} ${styles.student}`}
              onClick={() => handleRoleSelection("student")}
            >
              <img
                src="../../public/egresado.png"
                alt="Egresado"
                className={styles.roleImage}
              />
              <h3>Egresado</h3>
              <p>Regístrate como estudiante egresado.</p>
            </div>
            <div
              className={`${styles.roleCard} ${styles.recruiter}`}
              onClick={() => handleRoleSelection("recruiter")}
            >
              <img
                src="../../public/recruiter.png"
                alt="Reclutador"
                className={styles.roleImage}
              />
              <h3>Reclutador</h3>
              <p>Regístrate como reclutador de empresas.</p>
            </div>
          </div>
        );
      case 2:
        return (
          <form className={styles.formStep}>
            <h2>Información de la Cuenta</h2>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>
            <div className={styles.navigationButtons}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => setStep(1)}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => setStep(3)}
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>
        );
      case 3:
        return (
          <form className={styles.formStep} onSubmit={handleSubmit}>
            <h2>Datos Personales</h2>
            <div className={styles.formGroup}>
              <label>Nombres</label>
              <input
                type="text"
                name="names"
                placeholder="Nombres"
                value={formData.names}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.names && <p className={styles.error}>{errors.names}</p>}
            </div>
            <div className={styles.formGroup}>
              <label>Apellidos</label>
              <input
                type="text"
                name="surnames"
                placeholder="Apellidos"
                value={formData.surnames}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.surnames && <p className={styles.error}>{errors.surnames}</p>}
            </div>
            {role === "student" && (
              <div className={styles.formGroup}>
                <label>CUIL</label>
                <input
                  type="text"
                  name="cuil"
                  placeholder="CUIL"
                  value={formData.cuil}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.cuil && <p className={styles.error}>{errors.cuil}</p>}
              </div>
            )}
            <div className={styles.navigationButtons}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => setStep(2)}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className={styles.primaryButton} type="submit">
                Registrarse
              </button>
            </div>
          </form>
        );
      case 4:
        return (
          <form className={styles.formStep} onSubmit={handleVerificationSubmit}>
            <h2>Verificación de Cuenta</h2>
            <div className={styles.formGroup}>
              <label>Ingrese el Código de Verificación</label>
              <input
                type="text"
                name="verificationCode"
                placeholder="Código de Verificación"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className={styles.input}
              />
            </div>
            {errors.general && <p className={styles.error}>{errors.general}</p>}
            <div className={styles.navigationButtonsVerify}>
              <button className={styles.primaryButton} type="submit">
                Verificar
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return <div className={styles.registerContainer}>{renderStep()}</div>;
};
