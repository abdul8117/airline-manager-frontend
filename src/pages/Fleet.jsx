import { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthProvider";
import { noLeftPadding } from "../config";
import { fetchPlayerFleet } from "../utils/FetchPlayerFleet";

import FleetCard from "../components/FleetCard.jsx";
import Navbar from "../components/Navbar.jsx";

function Fleet() {
    const [fleet, setFleet] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        fetchPlayerFleet(token).then((data) => {
            const groupedFleet = data.reduce((acc, airplane) => {
                const model = airplane.aircraftType.model;

                if (!acc[model]) {
                    acc[model] = { ...airplane, quantity: 1 };
                } else {
                    acc[model].quantity += 1;
                }

                return acc;
            }, {});

            console.log(groupedFleet);

            setFleet(Object.values(groupedFleet));
        });
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
