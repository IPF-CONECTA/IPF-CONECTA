import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNoti } from "../../../hooks/useNoti";
import { updateAbout } from "../services/services";

export const AboutCard = ({ own, aboutData, username }) => {
  const noti = useNoti();
  const [about, setAbout] = useState(null);
  const [editDescription, setEditDescription] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    setAbout(aboutData);
  }, [aboutData, username]);

  useEffect(() => {
    reset();
  }, [editDescription]);

  const handleUpdateAbout = async (data) => {
    const res = await updateAbout(data, username);
    if (res.status !== 201) {
      return noti("Hubo un error al actualizar la descripción", "error");
    }
    setEditDescription(false);
    setAbout(data.about);
    noti("Descripción actualizada", "success");
  };

  const renderForm = () => (
    <form
      onSubmit={handleSubmit(handleUpdateAbout)}
      className="w-100 mw-100 border-0 shadow-none d-flex flex-column align-items-end p-0 mt-2"
    >
      <textarea
        {...register("about")}
        defaultValue={about || ""}
        style={{ minHeight: "100px" }}
        className="w-100 form-control border rounded mb-3 p-2"
        name="about"
      ></textarea>
      <div>
        <button
          type="button"
          className="btn btn-outline-dark me-2"
          onClick={() => setEditDescription(false)}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-dark">
          Guardar
        </button>
      </div>
    </form>
  );

  return (
    (own || aboutData?.length > 0) && (
      <div
        className="w-100 border-bottom border-top d-flex flex-column p-4"
        id="resumen"
      >
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold fs-5">Acerca de</span>
          {own && !editDescription && (
            <button
              type="button"
              onClick={() => setEditDescription(true)}
              className="btn d-flex p-0 align-items-center"
            >
              <span className="material-symbols-outlined text-dark-emphasis">
                edit
              </span>
            </button>
          )}
        </div>
        {editDescription ? (
          renderForm()
        ) : (
          <>
            <div>
              {about?.length > 160 ? (
                showDescription ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: about?.replace(/\n/g, "<br />"),
                    }}
                  ></div>
                ) : (
                  <div>
                    {about.slice(0, 160)}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowDescription(true)}
                      className="text-secondary"
                    >
                      ...Ver más
                    </span>
                  </div>
                )
              ) : about !== null ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: about?.replace(/\n/g, "<br />"),
                  }}
                ></div>
              ) : (
                <span className="text-secondary">Sin descripción</span>
              )}
            </div>
          </>
        )}
      </div>
    )
  );
};
