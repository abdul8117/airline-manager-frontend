import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../config.js";
import { useAuth } from "./AuthProvider.jsx";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [airlineName, setAirlineName] = useState("");

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [airportsInHubCity, setAirportsInHubCity] = useState([]);
  const [selectedHubAirport, setSelectedHubAirport] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleAirlineNameChange(e) {
    setAirlineName(e.target.value);
  }

  function handleSelectedCountry(e) {
    setSelectedCountry(e.target.value); // value is the name of the country
  }

  function handleSelectedCity(e) {
    setSelectedCity(e.target.value); // value is the id of the city
  }

  function handleSelectedHubAirport(e) {
    setSelectedHubAirport(e.target.value); // value is the id of the hub airport
  }

  async function handleRegister(e) {
    e.preventDefault();

    const registrationData = {
      email: email,
      password: password,
      airlineName: airlineName,
      hubAirportId: selectedHubAirport,
    };

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful", data);
        const userToken = data.jwtToken;
        login(userToken);
        navigate("/home");
      } else {
        console.log("Registration failed", data);
      }
    } catch (error) {
      console.log("Error when registering", error);
    }
  }

  useEffect(() => {
    fetch(`${API_URL}/api/countries`)
      .then((response) => {
        console.log("response: ", response);
        if (response.ok) {
          return response.json();
        }

        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setCountries(data.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((error) => {
        console.log();

        console.log("Error when fetching countries", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`${API_URL}/api/cities?country=${selectedCountry}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          setCities(data);
        })
        .catch((error) => {
          console.log("Error when fetching cities", error);
        });
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity) {
      fetch(`${API_URL}/api/airports/cities/${selectedCity}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          setAirportsInHubCity(data);
        })
        .catch((error) => {
          console.log("Error when fetching airports in a city", error);
        });
    } else {
      setAirportsInHubCity([]);
    }
  }, [selectedCity]);

  const h1RegistrationStyle = {
    paddingLeft: 0,
    marginBottom: 0,
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        {/* <div className="field">
          <label htmlFor="" className="label">
            Username
          </label>
          <div className="control">
            <input type="text" className="input" />
          </div>
        </div> */}

        <div className="field">
          <label htmlFor="" className="label">
            Email
          </label>
          <div className="control">
            <input
              type="email"
              className="input"
              onChange={handleEmailChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="" className="label">
            Create password
          </label>
          <div className="control">
            <input
              type="password"
              className="input"
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="" className="label">
            Name of your airline
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              onChange={handleAirlineNameChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="" className="label">
            Choose your desired hub airport's country
          </label>

          <div className="control">
            <div className="select">
              <select onChange={handleSelectedCountry}>
                <option value="">Choose country</option>

                {countries.map((country) => (
                  <option key={country.countryId} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="" className="label">
            Choose the city where your desired hub airport is located in
          </label>
          <div className="control">
            <div className="select">
              <select onChange={handleSelectedCity}>
                <option value="">Choose city</option>

                {cities.map((city) => (
                  <option key={city.cityId} value={city.cityId}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="" className="label">
            Choose your hub airport
          </label>
          <div className="control">
            <div className="select">
              <select name="" onChange={handleSelectedHubAirport}>
                <option value="">Choose hub airport</option>
                {airportsInHubCity.map((airport) => (
                  <option key={airport.airportId} value={airport.airportId}>
                    {airport.iataCode} - {airport.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-link">Register</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
