import { useState, useEffect } from "react";

import { fetchAllCountries } from "../utils/Countries";
import { fetchAllCitiesInCountry } from "../utils/CitiesInCountry";
import { fetchAllAirportsInCity } from "../utils/AirportsInCity";

import { API_URL } from "../config";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function NewRouteModal() {
    const navigate = useNavigate();

    function handleModalClick(e) {
        e.preventDefault();
        const modal = document.querySelector("#modal-js");
        modal.classList.add("is-active");
    }

    function handleModalCancelClick(e) {
        e.preventDefault();
        const modal = document.querySelector("#modal-js");
        modal.classList.remove("is-active");
    }

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        fetchAllCountries().then((data) => setCountries(data));
    }, []);

    function handleSelectedCountry(e) {
        setSelectedCountry(e.target.value); // name of country, not an id
    }

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        if (selectedCountry) {
            fetchAllCitiesInCountry(selectedCountry).then((data) =>
                setCities(data),
            );
        }
    }, [selectedCountry]);

    function handleSelectedCity(e) {
        setSelectedCity(e.target.value); // id of city
    }

    const [airports, setAirports] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState("");

    useEffect(() => {
        if (selectedCity) {
            fetchAllAirportsInCity(selectedCity).then((data) =>
                setAirports(data),
            );
        }
    }, [selectedCity]);

    const [weeklyGateCost, setWeeklyGateCost] = useState(0);

    function handleSelectedAirport(e) {
        setSelectedAirport(e.target.value); // id of airport

        // fetch weekly gate cost
        fetch(`${API_URL}/api/airports/id/${e.target.value}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch weekly gate cost");
            })
            .then((data) => setWeeklyGateCost(data.weeklyGateCost))
            .catch((error) => {
                throw new Error("Error fetching weekly gate cost:", error);
            });
    }

    const { token } = useAuth();
    async function handleAddRoute(e) {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_URL}/api/routes/new?destinationAirportId=${selectedAirport}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.ok) {
                // window.location.reload();
                navigate("/routes");
            } else {
                throw new Error("Failed to add route");
            }
        } catch (error) {
            throw new Error("Failed to add route: " + error);
        }
    }

    return (
        <>
            <button className="button" onClick={handleModalClick}>
                Add new route
            </button>

            <div id="modal-js" className="modal">
                <div className="modal-background"></div>

                <div className="modal-card">
                    <div className="modal-card-head">
                        <p className="modal-card-title title is-4">New route</p>
                    </div>

                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Destination country</label>
                            <div className="select">
                                <select onChange={handleSelectedCountry}>
                                    <option value="">Country</option>
                                    {countries.map((country) => (
                                        <option
                                            key={country.id}
                                            value={country.name}
                                        >
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="" className="label">
                                City
                            </label>
                            <div className="select">
                                <select onChange={handleSelectedCity}>
                                    <option value="">City</option>
                                    {cities.map((city) => (
                                        <option
                                            key={city.cityId}
                                            value={city.cityId}
                                        >
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="" className="label">
                                Airport
                            </label>
                            <div className="select">
                                <select onChange={handleSelectedAirport}>
                                    <option value="">Airport</option>
                                    {airports.map((airport) => (
                                        <option
                                            key={airport.airportId}
                                            value={airport.airportId}
                                        >
                                            {airport.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="" className="label">
                                Weekly gate cost:
                            </label>
                            <p>${weeklyGateCost}</p>
                        </div>
                    </section>

                    <div className="modal-card-foot">
                        <div className="buttons">
                            <button
                                className="button is-primary"
                                onClick={handleAddRoute}
                            >
                                Add route
                            </button>
                            <button
                                className="button"
                                onClick={handleModalCancelClick}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewRouteModal;
