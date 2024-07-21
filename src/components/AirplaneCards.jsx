import { useEffect, useState } from "react";
import { API_URL } from "../config";

function AirplaneCards() {
    const [airplanes, setAirplanes] = useState([]);

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
                console.log(data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            {airplanes.map((airplane) => (
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img
                                src={`src/assets/airplanes/${airplane.model}.png`}
                                alt={airplane.model}
                            />
                        </figure>
                    </div>

                    <div className="card-content">
                        <p className="title is-4">{airplane.model}</p>
                        <div className="content">
                            <p>Manufacturer: {airplane.manufacturer}</p>
                            <p>Price: ${airplane.price}</p>
                            <p>Capacity: {airplane.capacity}</p>
                            <p>Range: {airplane.range}</p>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button className="card-footer-item">Buy</button>
                    </div>
                </div>
            ))}
            ;
        </>
    );
}

export default AirplaneCards;
