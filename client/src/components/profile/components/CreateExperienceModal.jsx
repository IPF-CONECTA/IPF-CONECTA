import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { findCompanies } from "../../../services/recruiterServices";

export const CreateExperienceModal = ({
  openExperienceModal,
  setOpenExperienceModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [companySearch, setCompanySearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (companySearch.length >= 1) {
      const timeout = setTimeout(async () => {
        const res = await findCompanies(companySearch);
        if (res.status !== 200) {
          return;
        }
        setCompanies(res.data);
      }, 500);

      setDebounceTimeout(timeout);
    } else {
      setCompanies([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [companySearch]);

  const handleSearchCompany = (e) => {
    setCompanySearch(e.target.value);
  };
  const handleChooseCompany = (companyId) => {
    setCompany(companyId);
  };
  return (
    <Dialog
      open={Boolean(openExperienceModal)}
      onClose={() => setOpenExperienceModal(false)}
      fullWidth
      maxWidth="sm"
    >
      <div className="p-3">
        <span className="fs-4 fw-semibold ">Agregar experiencia</span>
        <div>
          <form className="shadow-none border-0 p-0 pt-2 d-flex flex-column">
            <div className={`mb-3`}>
              <label htmlFor="title">
                Título <span className="text-danger">*</span>
              </label>
              <input
                name="title"
                {...register("title", {
                  required: "El título es obligatorio",
                  maxLength: {
                    value: 32,
                    message: "El título no puede tener más de 32 caracteres",
                  },
                })}
                className="form-control w-100"
                type="text"
                placeholder="Ej: Back End Developer"
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </div>
            <div className={`mb-3`}>
              <label htmlFor="experienceType">
                Tipo de empleo <span className="text-danger">*</span>
              </label>
              <select
                {...register("experienceType", {
                  required: "El tipo de empleo es obligatorio",
                })}
                className="form-select "
                name="experienceType"
                defaultValue={"default"}
              >
                <option value="default" disabled>
                  Por favor seleccione
                </option>
              </select>
              {errors.experienceType && (
                <span className="text-danger">
                  {errors.experienceType.message}
                </span>
              )}
            </div>
            <div className={`mb-3`}>
              <label htmlFor="company">Empresa</label>
              <div>
                <input
                  {...register("company", {
                    required: "La empresa es obligatoria",
                    maxLength: {
                      value: 32,
                      message:
                        "El nombre de la empresa no puede tener más de 32 caracteres",
                    },
                  })}
                  onChange={handleSearchCompany}
                  value={companySearch}
                  type="text"
                  className="form-control w-100"
                  placeholder="Coca-Cola"
                />
                {companySearch.length > 0 && companies.length > 0 && (
                  <ul className="position-absolute w-100 list-group">
                    {companies.map((company) => (
                      <li
                        onClick={() => {
                          handleChooseCompany(company);
                        }}
                        key={company.id}
                        className="list-group-item list-group-item-action d-flex align-items-center"
                      >
                        <img
                          src={`${BASE_URL}/logoUrl/${company.logoUrl}`}
                          crossOrigin="anonymous"
                          alt="logo"
                          width={30}
                          className="me-2"
                        />
                        <span className="fw-semibold">{company.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className={`mb-3`}>
              <label htmlFor="location">Ubicación</label>
              <select class="js-example-basic-single" name="state">
                <option value="AL">Alabama</option>
                <option value="WY">Wyoming</option>
              </select>
              <input
                {...register("location", {})}
                type="text"
                className="form-control w-100"
                placeholder="Formosa, Argentina"
              />
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Actualmente estoy trabajando en este puesto
              </label>
            </div>
            <div className={`mb-3`}>
              <label htmlFor="startDate">Fecha de inicio</label>
              <div className="d-flex gap-3">
                <select
                  type="date"
                  name="startDateMonth"
                  className="form-select w-100  "
                  defaultValue={"default"}
                >
                  <option value="default" disabled>
                    Por favor seleccione el mes
                  </option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
                <select
                  type="date"
                  name="startDateYear"
                  className="form-select w-100  "
                  defaultValue={"default"}
                >
                  <option value="default" disabled>
                    Por favor seleccione el año
                  </option>
                  {Array.from(
                    { length: new Date().getFullYear() - 1924 + 1 },
                    (_, i) => (
                      <option key={1924 + i} value={1924 + i}>
                        {new Date().getFullYear() - i}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className={`mb-3`}>
              <label htmlFor="endDate">Fecha de fin</label>

              <div className="d-flex gap-3 mb-3">
                <select
                  type="date"
                  name="endDateMonth"
                  className="form-select w-100  "
                  defaultValue={"default"}
                >
                  <option value="default" disabled>
                    Por favor seleccione el mes
                  </option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                  <option value=""></option>
                </select>
                <select
                  type="date"
                  name="endDateYear"
                  className="form-select w-100  "
                  defaultValue={"default"}
                >
                  <option value="default" disabled>
                    Por favor seleccione el año
                  </option>
                  {Array.from(
                    { length: new Date().getFullYear() - 1924 + 1 },
                    (_, i) => (
                      <option key={1924 + i} value={1924 + i}>
                        {new Date().getFullYear() - i}
                      </option>
                    )
                  )}{" "}
                </select>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <button className="btn btn-dark">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
