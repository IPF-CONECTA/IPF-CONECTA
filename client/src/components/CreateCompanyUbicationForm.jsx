import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useNoti } from "../hooks/useNoti";
import { authService } from "../services/authService";

export const CreateCompanyUbicationForm = ({ companyId }) => {
  const navigate = useNavigate();
  const noti = useNoti();

  const [ubication, setUbication] = useState({
    countries: [],
    states: [],
    cities: [],
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");

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
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/create-company-ubication",
        {
          companyUbication: {
            companyId: companyId,
            countryId: selectedCountry,
            stateId: selectedState,
            cityId: selectedCity,
            address: address,
          },
        },
        {
          headers: {
            authorization: `Bearer ${authService.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          noti(response.data.message, "success");
        }
      })
      .catch((error) => {
        console.error("Error creating company ubication:", error);
        noti("Error al crear la ubicación de la empresa.", "error");
      });
  }

  return (
    <>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <span className="material-symbols-outlined d-flex ">apartment</span>
        <h2>
          ¡Perfecto! Has registrado una empresa en el sistema, pero ahora debes
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
              <span className="material-symbols-outlined">location_city</span>
              <label htmlFor="state">Estado</label>
              <select
                className="form-select"
                id="state"
                required
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Seleccione un estado</option>
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
            <select
              className="form-select"
              id="city"
              required
              value={selectedCity}
              onChange={handleCityChange}
            >
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
          value={address}
          onChange={handleAddressChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Crear sede
        </button>
      </form>
    </>
  );
};
