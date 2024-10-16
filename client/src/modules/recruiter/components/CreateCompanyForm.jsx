import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Editor from "../../ui/components/Editor";
import { useNoti } from "../../../hooks/useNoti";
import { authService } from "../../auth/services/authService";
import styles from "../../../../public/css/createCompany.module.css";

export const CreateCompanyForm = () => {
  const quillRef = useRef(null);

  const navigate = useNavigate();
  const noti = useNoti();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    description: "",
    industryId: "",
    countryOriginId: "",
    cantEmployees: "",
  });
  const [logo, setLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/industries").then((response) => {
      setIndustries(response.data);
    });

    axios.get("http://localhost:4000/find-all-countries").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    if (file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        noti("Formato de logo no aceptado", "warning");
        return;
      }
      setLogo(file);
      setPreviewLogo(URL.createObjectURL(file));
      setValue("logoUrl", file); // Set the file in the form state
    }
  };
  // Registrar el campo description manualmente
  useEffect(() => {
    register("description", { required: "La descripción es obligatoria" });
  }, [register]);
  const onSubmit = async (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("company[name]", data.name);
    formDataToSend.append("company[description]", data.description);
    formDataToSend.append("company[industryId]", data.industryId);
    formDataToSend.append("company[countryOriginId]", data.countryOriginId);
    formDataToSend.append("company[cantEmployees]", data.cantEmployees);
    formDataToSend.append("message", data.message);

    if (logo) {
      formDataToSend.append("logoUrl", logo);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/create-company",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      noti("Empresa creada exitosamente!", "success");
      navigate(`/crear-sede/${response.data.id}`);
    } catch (error) {
      console.log(error);
      noti(
        error.response?.data?.message || "Error al crear la empresa",
        "error"
      );
    }
  };

  return (
    <div className="d-flex justify-content-evenly align-items-center min-vh-100">
      <div className="company-form shadow-sm my-5">
        <form onSubmit={handleSubmit(onSubmit)} className="p-3">
          <div className="d-flex justify-content-start mb-2">
            <span
              className={`fs-4 w-100 fw-semibold d-flex justify-content-center ${styles.registerText}`}
            >
              Registra tu empresa
            </span>
          </div>

          <div>
            <label htmlFor="name">Nombre de la empresa</label>
            <input
              type="text"
              name="name"
              className="form-control w-100 mb-3"
              placeholder="The Coca-Cola Company"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="description">Descripción</label>
            <Editor
              ref={quillRef}
              value={watch("description") || ""}
              onChange={(value) => setValue("description", value)}
            />
          </div>
          <div>
            <label htmlFor="industryId">Industria</label>
            <select
              name="industryId"
              className="form-select mb-3"
              {...register("industryId", {
                required: "La industria es obligatoria",
              })}
              defaultValue={"default"}
            >
              <option value={"default"} disabled>
                Seleccione una industria
              </option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
            {errors.industryId && (
              <p className="text-danger">{errors.industryId.message}</p>
            )}
          </div>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label htmlFor="countryOriginId">País de origen</label>
                <select
                  {...register("countryOriginId", {
                    required: "El país de origen es obligatorio",
                  })}
                  name="countryOriginId"
                  className="form-select"
                  defaultValue={"default"}
                >
                  <option value={"default"} disabled>
                    Seleccionar país
                  </option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="cantEmployees">Cantidad de empleados aprox</label>
              <input
                type="number"
                name="cantEmployees"
                className="form-control w-100 mb-3"
                placeholder="500"
                {...register("cantEmployees", {
                  required: "La cantidad de empleados es obligatoria",
                })}
              />
              {errors.cantEmployees && (
                <p className="text-danger">{errors.cantEmployees.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="logoUrl">
              Logo de la empresa{" "}
              <span className="text-success">(Solo formatos JPG y PNG)</span>
            </label>
            <input
              type="file"
              name="logoUrl"
              accept="image/png, image/jpeg, image/jpg"
              className="form-control w-100 mb-3"
              onChange={handleLogoChange}
            />
          </div>
          {previewLogo && (
            <img
              src={previewLogo}
              className={`${styles.roundedImage} mb-2 me-0 img-thumbnail rounded-circle`}
            />
          )}
          <div>
            <label htmlFor="message">Mensaje</label>
            <input
              type="text"
              name="message"
              className="form-control w-100 mb-3"
              placeholder="Cuentanos tu rol en la empresa, que funciones cumples, etc."
              {...register("message", {
                required: "El mensaje es obligatorio",
              })}
            />
          </div>
          <div className="d-flex flex-column ">
            <div className="w-100 d-flex justify-content-between">
              <div>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary fw-bold"
                >
                  Volver
                </button>
              </div>
              <button type="submit" className="btn btn-primary">
                Siguiente
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="descripcion border shadow rounded p-4 d-flex flex-column w-25">
        <img
          src="./img/registro-empresa.png"
          className="mb-3"
          alt="imagen-registro"
        />
        <span className="mb-1">
          Una vez registres la empresa a la que perteneces,{" "}
          <span className="fw-semibold">se pondrá en revisión</span> hasta que
          un administrador la apruebe.
        </span>
        <span className="mb-1">
          Este proceso puede tardar{" "}
          <span className="fw-semibold"> hasta 24 horas</span> :)
        </span>
        <span>
          Mientra tanto,{" "}
          <span className="fw-semibold">
            podrás completar los datos de tu perfil
          </span>
          .
        </span>
      </div>
    </div>
  );
};
