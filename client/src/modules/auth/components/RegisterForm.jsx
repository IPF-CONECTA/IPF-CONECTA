import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants/BASE_URL";
import { useNoti } from "../../../hooks/useNoti";
import { authService } from "../services/authService";
import styles from "../../../../public/css/register.module.css";

export const RegisterForm = () => {
  const noti = useNoti();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const inputRefs = useRef([]);
  const [isCodeLocked, setIsCodeLocked] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    names: "",
    surnames: "",
    cuil: "",
  });

  const handleVerificationCodeChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      if (newCode.every((digit) => digit !== "")) {
        handleSubmitCode(newCode.join(""));
      }
    }
  };

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
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: role,
      cuil: role === "student" ? formData.cuil : null,
      names: formData.names,
      surnames: formData.surnames,
    };
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        user,
      });
      authService.setToken(response.data.token);
      noti(response.data.message, "success");
      setStep(4);
    } catch (error) {
      console.error("Error durante el registro:", error);
      noti(
        error.response?.data?.message || error.response.data.errors[0].msg,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitCode = async (code) => {
    const response = await authService.submitVerificationCode(code);
    if (response.status !== 201) {
      return noti(
        response.response?.data?.message || "Error en la verificación",
        "error"
      );
    }
    noti("¡Cuenta confirmada exitosamente!", "success");
    setIsCodeLocked(true);
    setTimeout(() => {
      authService.removeToken();
      authService.setToken(response.data.data.token);
      if (response.data.data.existingUser.role.name == "recruiter") {
        return navigate("/seleccionar-empresa");
      }
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div
            className={"d-flex justify-content-evenly align-items-center w-100"}
          >
            <div
              className={`${styles.roleCard} ${styles.student}`}
              onClick={() => handleRoleSelection("student")}
            >
              <img
                src="./img/student-role.jpg"
                alt="Egresado"
                height={300}
                className={styles.roleImage}
              />
              <h3 className="fw-bold text-primary-emphasis">Egresado</h3>
              <span>
                Como egresado, tendrás acceso a diversas{" "}
                <span className="fw-semibold">ofertas laborales</span>
                alineadas con tu perfil profesional, facilitando tu{" "}
                <span className="fw-semibold">
                  {" "}
                  inserción en el mercado laboral
                </span>{" "}
                y acompañándote en el desarrollo de una carrera exitosa.
              </span>
            </div>
            <div
              className={`${styles.roleCard} ${styles.recruiter}`}
              onClick={() => handleRoleSelection("recruiter")}
            >
              <img
                src="./img/mentor-role.jpg"
                alt="Reclutador"
                className={styles.roleImage}
              />
              <h3 className="fw-bold text-primary-emphasis">Mentor</h3>
              <span>
                Como{" "}
                <span className="fw-semibold">representante de tu empresa</span>
                , tendrás la oportunidad de{" "}
                <span className="fw-semibold">conectar con egresados</span>{" "}
                interesados en las oportunidades laborales que ofreces.{" "}
                <span className="fw-semibold">
                  Guiarás a los candidatos en su camino profesional
                </span>
                , ayudándolos a integrarse en el mundo laboral y crecer dentro
                de la empresa.
              </span>
            </div>
          </div>
        );
      case 2:
        return (
          <form className={styles.formStep}>
            <h2 className="mb-3">Crea tu cuenta</h2>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="form-control w-100"
                autoComplete="false"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="border rounded mb-3 d-flex">
              <div className="form-floating w-100">
                <input
                  type="text"
                  className="form-control border-0 m-0 w-100"
                  name="username"
                  autoComplete="false"
                  value={formData.username}
                  placeholder="username"
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Nombre de usuario</label>
              </div>
              <div className="d-flex btn p-0 me-1 align-items-center justify-content-end">
                <span
                  className={`${styles.infoButton} border px-2 rounded-circle bg-info-subtle`}
                >
                  <div className="fw-semibold text-primary-emphasis">?</div>
                </span>
                <div
                  className={`${styles.infoHidden} d-none border shadow p-2 rounded bg-white d-flex flex-column`}
                >
                  <span>
                    Sólo minusculas y números, separado por barra baja " _ "
                  </span>
                </div>
              </div>
            </div>
            <div className="form-floating">
              <input
                type="password"
                name="password"
                value={formData.password}
                autoComplete="false"
                onChange={handleChange}
                className="form-control w-100 mb-3"
                id="floatingPassword"
                placeholder="Contraseña"
              />
              <label htmlFor="floatingPassword">Contraseña</label>
            </div>
            <div className={styles.navigationButtons}>
              <button
                className={"btn d-flex align-items-center"}
                type="button"
                onClick={() => setStep(1)}
              >
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
                <span className="fw-semibold me-1">Volver</span>
              </button>
              <button
                className={"btn btn-primary d-flex align-items-center pe-1"}
                type="button"
                onClick={async () => {
                  if (!formData.email) {
                    return noti(
                      "Por favor, ingrese un correo electrónico",
                      "warning"
                    );
                  }
                  const response = await authService.isEmail(formData.email);
                  if (response !== 200) {
                    return noti("Email ya registrado", "error");
                  }
                  if (!formData.username) {
                    return noti(
                      "Por favor, ingrese un nombre de usuario",
                      "warning"
                    );
                  }
                  if (/\s/.test(formData.username)) {
                    return noti(
                      "El nombre de usuario no debe contener espacios",
                      "error"
                    );
                  }
                  const res = await authService.isUsername(formData.username);
                  if (res !== 200) {
                    return noti("Nombre de usuario ya registrado", "error");
                  }
                  setStep(3);
                }}
              >
                <span className="fw-semibold me-1">Siguiente</span>
                <span className="material-symbols-outlined">
                  arrow_forward_ios
                </span>
              </button>
            </div>
          </form>
        );
      case 3:
        return (
          <form className={styles.formStep} onSubmit={handleSubmit}>
            <h2>Datos Personales</h2>
            <div className="form-floating mb-2">
              <input
                type="text"
                name="names"
                className="form-control w-100"
                autoComplete="false"
                value={formData.names}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Nombres</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                name="surnames"
                className="form-control w-100"
                autoComplete="false"
                value={formData.surnames}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Apellidos</label>
            </div>
            {role === "student" && (
              <div className="border rounded mb-3 d-flex">
                <div className="form-floating w-100">
                  <input
                    type="number"
                    className="form-control border-0 m-0 w-100"
                    name="cuil"
                    autoComplete="false"
                    value={formData.cuil}
                    placeholder="cuil"
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput">Cuil</label>
                </div>
                <div className="d-flex btn p-0 me-1 align-items-center justify-content-end">
                  <span
                    className={`${styles.infoButton} border px-2 rounded-circle bg-info`}
                  >
                    <div className="fw-bold text-white">?</div>
                  </span>
                  <div
                    className={`${styles.infoHidden} d-none border shadow p-2 rounded bg-white d-flex flex-column`}
                  >
                    <span className="fw-semibold">
                      ¿Para qué pedimos el cuil?
                    </span>
                    <span>
                      Solicitamos tu CUIL para garantizar que la plataforma esté
                      reservada exclusivamente para estudiantes y egresados del
                      IPF, asegurando la autenticidad de los usuarios
                      registrados.
                    </span>
                    <span className="fw-semibold text-primary">
                      Sólo números, sin espacios ni puntos.
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.navigationButtons}>
              <button
                className={"btn d-flex align-items-center"}
                type="button"
                onClick={() => setStep(2)}
              >
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
                <span className="fw-semibold me-1">Volver</span>
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Cargando...</span>
                  </>
                ) : (
                  "Registrar"
                )}
              </button>
            </div>
          </form>
        );
      case 4:
        return (
          <form
            className="border-0 shadow-none"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="h2 font-weight-bold">
                    Confirmación de correo electrónico
                  </h2>
                  <span className="text-muted d-flex flex-column mb-2">
                    Ingresa el código de confirmación de 6 dígitos que se envió
                    a tu correo
                    <span className="fw-semibold">{formData.email}</span>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <div
                    className="d-grid gap-3"
                    style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        disabled={isCodeLocked ? true : false}
                        maxLength={1}
                        className="form-control w-75 text-center fs-4 fw-bold bg-light rounded"
                        value={verificationCode[index]}
                        onChange={(e) => handleVerificationCodeChange(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return <div className={styles.registerContainer}>{renderStep()}</div>;
};
