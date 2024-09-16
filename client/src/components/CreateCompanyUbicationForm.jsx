import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useNoti } from "../hooks/useNoti";
import { authService } from "../services/authService";

export const CreateCompanyUbicationForm = ({ companyId }) => {
  const navigate = useNavigate();
  const noti = useNoti();

  const [location, setLocation] = useState({
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
      setLocation((prev) => {
        return { ...prev, countries: response.data };
      });
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`http://localhost:4000/states-by-country/${selectedCountry}`)
        .then((response) => {
          setLocation((prev) => {
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
          setLocation((prev) => {
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
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        if (response.status === 201) {
          noti(response.data.message, "success");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        noti("Error al crear la ubicación de la empresa.", "error");
      });
  }

  return (
    <>
      <form
        className="w-50 mx-auto p-4 border rounded shadow-sm bg-light"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-4">
          <span className="material-symbols-outlined d-block mb-2">
            apartment
          </span>
          <h2 className="h4">
            ¡Perfecto! Has registrado una empresa en el sistema, pero ahora
            debes registrar al menos una sede.
          </h2>
          <span className="material-symbols-outlined d-block mt-3">flag</span>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="country" className="form-label">
              País
            </label>
            <select
              className="form-select"
              id="country"
              required
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Seleccione el país</option>
              {location.countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {location.states.length > 0 ? (
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="state" className="form-label">
                Estado
              </label>
              <select
                className="form-select"
                id="state"
                required
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Seleccione un estado</option>
                {location.states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="row mb-3">
            <div className="col-md-12">
              <p className="text-danger">
                No hay estados disponibles en este país.
              </p>
            </div>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="city" className="form-label">
              Ciudad
            </label>
            {location.cities.length > 0 ? (
              <select
                className="form-select"
                id="city"
                required
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Seleccione una ciudad</option>
                {location.cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-danger">
                No hay ciudades disponibles en este estado.
              </p>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="address" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="form-control w-100"
              title="Dirección"
              placeholder="Ingrese la dirección de la sede"
              value={address}
              onChange={handleAddressChange}
              required
            />
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-outline-dark">
            Crear sede
          </button>
        </div>
      </form>
    </>
  );
};
