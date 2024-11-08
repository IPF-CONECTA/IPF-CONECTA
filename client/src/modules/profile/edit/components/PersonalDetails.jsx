import React, { useState } from "react";
import styles from "../../../../../public/css/editProfile.module.css";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useNoti } from "../../../../hooks/useNoti";
import { updatePersonalDetails } from "../services/editProfileServices";

const CustomPhoneInput = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`form-control ${styles.phoneInput}`} // Añade tu clase aquí
    {...props}
  />
));

export const PersonalDetails = ({ profileData, setProfileData }) => {
  console.log(profileData);
  const [phone, setPhone] = useState(profileData.profile.phonenumber || null);

  const { register, handleSubmit } = useForm();
  const noti = useNoti();
  const [sending, setSending] = useState(false);

  const onSubmit = async (data) => {
    data.phonenumber = phone;
    setSending(true);
    try {
      const res = await updatePersonalDetails(data);
      if (res.status !== 201) {
        return noti("Hubo un error al actualizar tu perfil", "error");
      }
      setProfileData({
        ...profileData,
        profile: {
          ...profileData.profile,
          ...data,
          user: {
            ...profileData.profile.user,
            username: data.username,
          },
        },
      });
      noti("Perfil actualizado", "success");
    } catch (error) {
      noti("Hubo un error al actualizar tu perfil", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="w-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column align-items-end shadow-none border-0 p-3 bg-transparent"
        style={{ maxWidth: "none" }}
      >
        <div className="d-flex w-100 gap-2">
          <div className="w-50">
            <div className="mb-3 names">
              <label htmlFor="name">Nombres</label>
              <input
                disabled={sending}
                {...register("names")}
                defaultValue={profileData.profile.names}
                type="text"
                className="form-control w-100 m-0"
              />
            </div>
            <div className="mb-3 surnames">
              <label htmlFor="lastName">Apellidos</label>
              <input
                disabled={sending}
                {...register("surnames")}
                defaultValue={profileData.profile.surnames}
                type="text"
                className="form-control w-100 m-0"
              />
            </div>
            <div className="mb-3 email">
              <div className="d-flex">
                <label htmlFor="email">Correo electrónico</label>
                <div className="form-text ms-2 mt-0">
                  (Deberás volver a confirmar tu correo)
                </div>
              </div>
              <input
                disabled={sending}
                {...register("email")}
                defaultValue={profileData.profile.user.email}
                type="email"
                className="form-control w-100"
                style={{ padding: "12px" }}
              />
            </div>
            <div className="mb-3 username">
              <label htmlFor="username">Usuario</label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  disabled={sending}
                  {...register("username")}
                  defaultValue={profileData.profile.user.username}
                  name="username"
                  type="text"
                  className="form-control mb-0"
                  placeholder="Username"
                  aria-label="Username"
                />
              </div>
            </div>
          </div>
          <div className="w-50 ">
            <div className="mb-3 title">
              <div className="d-flex">
                <label htmlFor="phone">Título</label>
                <div className="form-text ms-2 mt-0">
                  (Es como te encontrarán los demás)
                </div>
              </div>
              <input
                disabled={sending}
                {...register("title")}
                defaultValue={profileData.profile.title}
                type="text"
                className="form-control w-100 m-0"
                placeholder="Backend Dev."
              />
            </div>
            <div className="mb-3 cellphone">
              <span>Número de celular</span>
              <PhoneInput
                placeholder="370 4567891"
                value={phone}
                inputComponent={CustomPhoneInput}
                onChange={setPhone}
                countrySelectProps={{ className: "form-select" }}
                defaultValue={profileData.profile.phonenumber}
              />
            </div>
            <div className="d-flex flex-column birthday">
              <label className="input-group-date" htmlFor="birthday">
                Fecha de nacimiento
              </label>
              <input
                {...register("birthdate", {
                  valueAsDate: true,
                })}
                disabled={sending}
                defaultValue={profileData.profile.birthdate || ""}
                name="birthdate"
                type="date"
                max={"2006-12-31"}
                className="form-control mb-0 w-100"
                style={{ padding: "12px" }}
              />
            </div>
          </div>
        </div>
        <div className="w-25 d-flex justify-content-end">
          <button
            disabled={sending}
            type="submit"
            className="btn btn-dark w-75"
          >
            {sending ? (
              <>
                <span className="sr-only me-1">Guardando...</span>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </>
            ) : (
              "Guardar"
            )}
          </button>
        </div>
      </form>
    </main>
  );
};
