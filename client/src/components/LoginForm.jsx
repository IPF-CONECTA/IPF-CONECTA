import { useForm } from "react-hook-form";
import React, { useContext, useEffect } from "react";
import styles from "../../public/css/login.module.css";
import { authContext } from "../context/auth/Context";
import { Link, useNavigate } from "react-router-dom";
import { useNoti } from "../hooks/useNoti";

export const LoginForm = () => {
  const { login, authState } = useContext(authContext);
  const navigate = useNavigate();
  const noti = useNoti();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function showPass() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  useEffect(() => {
    if (authState.isLogged) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [authState.isLogged, navigate]);

  async function onSubmit(data) {
    const response = await login(data);
    if (response && response.role == "recruiter") {
      console.log(response.associations.name);
      if (response.associations.length == 0) {
        navigate("/seleccionar-empresa");
      } else {
        const isApproved = response.associations.find(
          (association) => association.status == "Aprobada"
        );
        if (isApproved) {
          navigate("/inicio");
        } else {
          const isPending = response.associations.find(
            (association) => association.status == "Pendiente"
          );
          if (isPending) {
            navigate("/solicitud-del-mentor", {
              state: {
                companyName: isPending.company.name,
                status: "Pendiente",
              },
            });
          } else {
            navigate("/solicitud-del-mentor", {
              state: { status: "Rechazada" },
            });
          }
        }
      }
    }
  }

  return (
    <div className="d-flex w-100 justify-content-between align-items-center">
      <div className="w-50 d-flex justify-content-center">
        <img src="./img/login.jpg" height={600} alt="Login" />
      </div>
      <div className={"w-50"}>
        <form onSubmit={handleSubmit(onSubmit)} className="shadow">
          <span className={`fs-3 fw-semibold ${styles["title-h2"]}`}>
            Iniciar Sesión
          </span>
          <div className="form-floating mb-3 mt-2">
            <input
              {...register("email")}
              type="email"
              className="form-control w-100"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput" className="bg-transparent">
              Email
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              {...register("password")}
              type="password"
              className="form-control w-100"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword" className="bg-transparent">
              Contraseña
            </label>
          </div>
          <div className={styles["form-group"]}>
            <button
              type="submit"
              className={`fw-bold fs-5 p-2 ${styles.button}`}
            >
              Ingresar
            </button>
          </div>
          <div className={styles["register-link"]}>
            <span>¿No tienes cuenta? </span>
            <Link to="/register" className={styles["register-link-text"]}>
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
