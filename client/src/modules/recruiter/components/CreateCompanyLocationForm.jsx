import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useNoti } from "../../../hooks/useNoti";
import { authService } from "../../auth/services/authService";

export const CreateCompanyLocationForm = ({ companyId }) => {
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
        "http://localhost:4000/create-company-location",
        {
          companyLocation: {
            companyId: companyId,
            countryId: selectedCountry,
            stateId: selectedState !== "" ? selectedState : null,
            cityId: selectedCity !== "" ? selectedCity : null,
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
      <main className="h-100 d-flex align-items-center justify-content-center gap-5">
        <form
          className="w-25 p-3 border rounded shadow-sm bg-light"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <span className="fs-2 fw-semibold mb-2">Registrar sede</span>
          </div>
          <span className="text-secondary">
            <span className="text-danger">*</span> significa que es un campo
            obligatorio
          </span>
          <div className="row mb-3 mt-2">
            <div className="col-md-12">
              <label htmlFor="country" className="form-label">
                País <span className="text-danger">*</span>
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

          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="state" className="form-label">
                Estado
              </label>
              <select
                className="form-select"
                id="state"
                disabled={location.states.length === 0}
                value={selectedState}
                onChange={handleStateChange}
                defaultValue={""}
              >
                <option value="">Seleccione un estado</option>
                {location.states.length > 0 ? (
                  location.states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))
                ) : (
                  <option disabled className="fw-semibold text-danger">
                    Seleccione el país para mostrar las opciones
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="city" className="form-label">
                Ciudad
              </label>
              <select
                className="form-select"
                id="city"
                disabled={location.cities.length === 0}
                value={selectedCity}
                onChange={handleCityChange}
                defaultValue={""}
              >
                <option value="">Seleccione una ciudad</option>
                {location.cities.length > 0 ? (
                  location.cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))
                ) : (
                  <option disabled className="fw-semibold text-danger">
                    Seleccione el estado para mostrar las opciones
                  </option>
                )}
              </select>
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
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              disabled={selectedCountry == "" || selectedState == ""}
              type="submit"
              className="btn btn-dark"
            >
              Crear sede
            </button>
          </div>
        </form>
        <div className="w-25 p-3 d-flex flex-column align-items-center">
          <span className="fs-4 fw-semibold">
            Registra la sede principal de tu empresa. La utilizaremos para
            corroborar la veracidad de ésta.
          </span>
          <img src="/img/inspector.png" width={300} alt="" />
        </div>
      </main>
    </>
  );
};
