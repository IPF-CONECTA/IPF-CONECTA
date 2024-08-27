import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

export const CreateHeadqueartersForm = () => {
  const location = useLocation();
  const { companyId } = location.state;

  const [Location, setLocation] = useState({
    countries: [],
    states: [],
    cities: [],
  });
  const [formData, setFormData] = useState({
    companyId,
    countryId: "",
    state: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log({ formData });
  };

  return (
    <>
      <p>
        Has registrado una empresa al sistema, ahora debes de registrar al menos
        una sede para dicha empresa.
      </p>

      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <span className="material-symbols-outlined">apartment</span>
        <input
          type="text"
          title="Dirección"
          placeholder="Ingrese la dirección de la sede"
        />

        <div className="col-md-6 mb-3">
          <label htmlFor="country">País</label>
          <select
            className="form-select"
            id="country"
            name="country"
            onChange={handleInputChange}
          >
            <option value="">Seleccione un país</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Crear sede
        </button>
      </form>
    </>
  );
};
