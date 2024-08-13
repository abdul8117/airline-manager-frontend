import { useState, useEffect } from "react";

import { useAuth } from "./auth/AuthProvider";
import { fetchPlayerFleet } from "../utils/FetchPlayerFleet";
import { API_URL } from "../config";

function ScheduleFlightModal({ route, onCloseModal }) {
    const [selectedAircraftFromFleet, setSelectedAircraftFromFleet] =
        useState("");
    const [weeklyFrequency, setWeeklyFrequency] = useState(0);

    function handleSelectedAircraftFromFleet(e) {
        setSelectedAircraftFromFleet(parseInt(e.target.value)); // id of aircraft
    }

    function handleWeeklyFrequency(e) {
        setWeeklyFrequency(e.target.value);
    }

    const [playerFleet, setPlayerFleet] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        // get all aircraft from the player's fleet
        fetchPlayerFleet(token).then((data) => {
            setPlayerFleet(data);
        });
    }, []);

    const [hoursAvailable, setHoursAvailable] = useState({});

    useEffect(() => {
        async function fetchAllHoursAvailable() {
            const hoursData = {};

            for (let airplane of playerFleet) {
                const hours = await fetchNumberOfHoursAvailable(
                    airplane.aircraftFleetId,
                );
                hoursData[airplane.aircraftFleetId] = hours;
            }

            setHoursAvailable(hoursData);
        }

        fetchAllHoursAvailable();
    }, playerFleet);

    async function fetchNumberOfHoursAvailable(airplaneId) {
        // Send a GET request to the server to get the number of hours available for the airplane
        try {
            const response = await fetch(
                `${API_URL}/api/fleet/hours-available?aircraftFleetId=${airplaneId}`,
            );

            if (!response.ok) {
                throw new Error("Response was not ok " + response);
            }

            return await response.json();
        } catch (error) {
            throw new Error("Failed to fetch data " + error);
        }
    }

    async function handleConfirmFlightsClick(e) {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_URL}/api/routes/schedule?routeId=${route.routeId}&aircraftFleetId=${selectedAircraftFromFleet}&weeklyFrequency=${weeklyFrequency}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Response was not ok " + response);
            }

            onCloseModal();
        } catch (error) {
            throw new Error("Failed to fetch data " + error);
        }
    }

    return (
        <>
            <div id="modal-js" className={`modal ${route ? "is-active" : ""}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <div className="modal-card-head">
                        <p className="modal-card-title title is-4">
                            Schedule flights
                        </p>
                    </div>

                    <div className="modal-card-body">
                        {/* 
                            Need a form where the user will select a particular airplane and then how many flights to schedule per week.
                            The form should have a dropdown for the airplane and a number input for the number of flights.
                            We should know how much time the airplane will be in the air per week.
                            We should also know how much demand there is for the route.
                        */}

                        <div className="field">
                            <label htmlFor="" className="label">
                                Select aircraft from fleet
                            </label>
                            <div className="select">
                                <select
                                    onChange={handleSelectedAircraftFromFleet}
                                >
                                    <option value="">Aircraft</option>
                                    {playerFleet.map((airplane) => (
                                        <option
                                            key={airplane.aircraftFleetId}
                                            value={airplane.aircraftFleetId}
                                        >
                                            {airplane.aircraftType.model +
                                                " - ID: " +
                                                airplane.aircraftFleetId +
                                                " - Number of hours available: " +
                                                (hoursAvailable[
                                                    airplane.aircraftFleetId
                                                ] ?? "Loading...")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="" className="label">
                                Weekly frequency
                            </label>
                            <div className="control">
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="Number of flights"
                                    onChange={handleWeeklyFrequency}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-card-foot">
                        <div className="buttons">
                            <button
                                className="button is-primary"
                                onClick={handleConfirmFlightsClick}
                            >
                                Confirm flights
                            </button>
                            <button className="button" onClick={onCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScheduleFlightModal;
