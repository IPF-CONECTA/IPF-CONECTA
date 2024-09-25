import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useNoti } from "../../../hooks/useNoti";
import { deleteAbout, updateAbout } from "../services/services";

import styles from "../../../../public/css/profile.module.css";

export const AboutCard = ({ own, aboutData, profileId }) => {
  const noti = useNoti();
  const [about, setAbout] = useState(aboutData);
  const [editDescription, setEditDescription] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setAbout(aboutData);
  }, [aboutData, profileId]);

  const handleDeleteAbout = async () => {
    const res = await deleteAbout(profileId);
    if (res.status !== 201) {
      return noti("Hubo un error al borrar la descripcion", "error");
    }
    setEditDescription(false);
    setAbout("");
    noti("Descripción eliminada", "success");
  };

  const handleUpdateAbout = async (data) => {
    const res = await updateAbout(data, profileId);
    if (res.status !== 201) {
      return noti("Hubo un error al actualizar la descripcion", "error");
    }
    setEditDescription(false);
    setAbout(data.about);
    noti("Descripcion actualizada", "success");
  };
  const renderForm = () => (
    <form
      onSubmit={handleSubmit(handleUpdateAbout)}
      className="w-100 mw-100 border-0 shadow-none d-flex flex-column align-items-end p-0 mt-2"
    >
      <textarea
        {...register("about")}
        defaultValue={about || ""}
        className="w-100 border rounded mb-3 p-2"
        name="about"
      ></textarea>
      <div>
        <button
          type="button"
          className="btn btn-dark me-2"
          onClick={() => setEditDescription(false)}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );

  const renderDropdown = () => (
    <div className="nav-item dropdown d-flex">
      <Link
        className={`nav-link d-flex align-items-center m-0 dropdown-toggle ${styles.noArrow}`}
        to="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <button className={`p-0 btn ${styles.btnAdd}`}>
          <span className="material-symbols-outlined text-dark-emphasis">
            more_vert
          </span>
        </button>
      </Link>
      <ul className="dropdown-menu dropdown-menu-end p-0 p-2">
        {about ? (
          <>
            <li>
              <button
                onClick={() => setEditDescription(true)}
                className="dropdown-item w-100 d-flex p-0 justify-content-between"
              >
                Editar descripción
              </button>
            </li>
            <li>
              <hr className="m-1" />
            </li>
            <li>
              <button
                onClick={handleDeleteAbout}
                className="dropdown-item d-flex p-0 justify-content-between"
              >
                Borrar descripción
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => setEditDescription(true)}
              className="dropdown-item w-100 d-flex p-0 justify-content-between"
            >
              Agregar descripción
            </button>
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <section className="w-100 border d-flex flex-column">
      <div className="d-flex justify-content-between mb-2">
        <span className="fw-bold fs-5">Acerca de mi</span>
        {own && renderDropdown()}
      </div>
      {editDescription ? renderForm() : <div>{about || "Sin descripción"}</div>}
    </section>
  );
};
