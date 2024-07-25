import { useState, useEffect } from "react";

import { API_URL } from "../config";
import { useAuth } from "./auth/AuthProvider";

function AirlineInfo() {
    const [info, setInfo] = useState(null);

    const { token } = useAuth();

    useEffect(() => {
        async function fetchPlayerData() {
            try {
                const response = await fetch(`${API_URL}/api/player/me`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Player data:", data);
                    setInfo(data);
                } else {
                    console.error(
                        "Failed to fetch player data - response not ok.",
                    );
                }
            } catch (error) {
                console.error("Failed to fetch player data - error:", error);
            }
        }

        fetchPlayerData();
    }, [token]);

    if (!info) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h4 className="title is-4">Airline info</h4>
            <ul>
                <li>Airline name: {info.airlineName}</li>
                <li>Balance: ${info.balance}</li>
                <li>Hub airport: {info.airport.name}</li>
                <li>Number of routes: *TODO*</li>
                <li>Fleet size: *TODO*</li>
            </ul>
        </>
    );
}

export default AirlineInfo;
