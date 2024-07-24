import { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthProvider";
import { API_URL, noLeftPadding } from "../config";

import FleetCard from "../components/FleetCard.jsx";
import Navbar from "../components/Navbar.jsx";

function Fleet() {
    const [fleet, setFleet] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchPlayerFleet() {
            try {
                const response = await fetch(`${API_URL}/api/fleet`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    console.log("GET fleet response is ok");
                    const data = await response.json();
                    setFleet(data);
                } else {
                    console.error("GET fleet response was not okay", response);
                }
            } catch (error) {
                console.error("Failed to fetch fleet", error);
            }
        }

        fetchPlayerFleet();
    }, [token]);

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="section" style={noLeftPadding}>
                    <h1 className="title">Your fleet</h1>
                </div>
                <div className="columns">
                    <div className="column">
                        {fleet.map((airplane) => (
                            <FleetCard airplane={airplane} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Fleet;
