import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

export const CreateCompanyUbicationForm = () => {
  const location = useLocation();
  const { companyId } = location.state;
  console.log(companyId);

  const [ubication, setUbication] = useState({
    countries: [],
    states: [],
    cities: [],
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/find-all-countries").then((response) => {
      setUbication((prev) => {
        return { ...prev, countries: response.data };
      });
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`http://localhost:4000/states-by-country/${selectedCountry}`)
        .then((response) => {
          setUbication((prev) => {
            return { ...prev, states: response.data };
          });
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(`http://localhost:4000/cities-by-state/${selectedState}`)
        .then((response) => {
          setUbication((prev) => {
            return { ...prev, cities: response.data };
          });
        });
    }
  }, [selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <>
      <form className="w-50 mx-auto" onSubmit={() => {}}>
        <span className="material-symbols-outlined d-flex ">apartment</span>
        <h2>
          Perfecto! Has registrado una empresa al sistema!, pero ahora debes de
          registrar al menos una sede.
        </h2>
        <span className="material-symbols-outlined ">flag</span>

        <div className="col-md-6 mb-3">
          <label htmlFor="country">País</label>
          <select
            className="form-select"
            id="country"
            required
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Seleccione el país</option>
            {ubication.countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>

          {ubication.states.length > 0 ? (
            <>
              <span class="material-symbols-outlined">location_city</span>
              <label htmlFor="state">Estado</label>
              <option value="">Seleccione un estado</option>
              <select
                className="form-select"
                id="state"
                required
                value={selectedState}
                onChange={handleStateChange}
              >
                {ubication.states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <p>No hay estados disponibles en este país.</p>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="city">Ciudad</label>
          {ubication.cities.length > 0 ? (
            <select className="form-select" id="city" required>
              <option value="">Seleccione una ciudad</option>
              {ubication.cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          ) : (
            <p>No hay ciudades disponibles en este estado.</p>
          )}
        </div>
        <input
          type="text"
          title="Dirección"
          placeholder="Ingrese la dirección de la sede"
        />
        <button type="submit" className="btn btn-primary">
          Crear sede
        </button>
      </form>
    </>
  );
};
