import { useState, useEffect } from "react";
import { API_URL, noLeftPadding } from "../config";

import Navbar from "../components/Navbar";
import AirplaneCards from "../components/AirplaneCards.jsx";
import AirplaneCard from "../components/AirplaneCard.jsx";

function BuyAirplanes() {
    const [airplanes, setAirplanes] = useState([]);
    const [numOfRows, setNumOfRows] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/api/aircraft-types`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch airplanes");
                }
            })
            .then((data) => {
                setAirplanes(data);
                setNumOfRows(Math.ceil(data.length / 3));
                console.log(data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="section" style={noLeftPadding}>
                    <h1 className="title">Buy airplanes</h1>
                </div>
                <div className="grid is-col-min-10">
                    {airplanes.map((airplane) => (
                        <div className="cell">
                            <AirplaneCard airplane={airplane} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default BuyAirplanes;
