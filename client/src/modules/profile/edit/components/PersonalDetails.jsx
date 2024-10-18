import React from "react";
import styles from "../../../../../public/css/editProfile.module.css";
export const PersonalDetails = () => {
  return (
    <main>
      <h1>Editar información básica</h1>
      <form className="d-flex">
        <div>
          <div>
            <label htmlFor="name">Nombre</label>
            <input type="text" className="form-control w-100" />
          </div>
          <div>
            <label htmlFor="lastName">Apellidos</label>
            <input type="text" className="form-control w-100" />
          </div>
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" className="form-control w-100" />
          </div>
        </div>
        <div>
          <div>
            <div>
              <span>País</span>
              <select className={` form-select me-1`}>
                <option value="1">+1</option>
                <option value="52">+52</option>
                <option value="57">+57</option>
              </select>
            </div>
            <input type="tel" className="form-control w-100" />
          </div>
          <div>
            <label htmlFor="birthdate">Fecha de nacimiento</label>
            <input type="date" className="form-control w-100" />
          </div>
        </div>
      </form>
    </main>
  );
};
