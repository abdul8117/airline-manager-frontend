import { API_URL } from "../config";
import { useAuth } from "./auth/AuthProvider";

function AirplaneCard({ airplane }) {
    const { token } = useAuth();

    function handleBuyButton(id) {
        let quantity = document.querySelector("#quantity").innerHTML;

        console.log(`Buying ${airplane.model}`);

        // Send a POST request to the server to buy the airplane
        for (let i = 0; i < quantity; i++) {
            fetch(`${API_URL}/api/aircraft-types/buy?aircraftTypeId=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        console.log(
                            `${airplane.manufacturer} ${airplane.model} purchased.`,
                        );
                    } else {
                        console.error("Response was not ok " + response);
                    }
                })
                .catch((error) => {
                    console.error("Failed to purchase the plane " + error);
                });
        }
    }

    function incrementQuantity() {
        let quantityElement = document.querySelector("#quantity");
        let currentNum = parseInt(quantityElement.innerHTML);
        quantityElement.innerHTML = currentNum + 1;
    }

    function decrementQuantity() {
        let quantityElement = document.querySelector("#quantity");
        let currentNum = parseInt(quantityElement.innerHTML);
        quantityElement.innerHTML = currentNum - 1;
    }

    return (
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
                <button
                    className="card-footer-item"
                    onClick={decrementQuantity}
                >
                    -
                </button>
                <p className="card-footer-item" id="quantity">
                    1
                </p>
                <button
                    className="card-footer-item"
                    onClick={incrementQuantity}
                >
                    +
                </button>
                <button
                    className="card-footer-item"
                    onClick={() => handleBuyButton(airplane.aircraftTypeId)}
                >
                    Buy
                </button>
            </div>
        </div>
    );
}

export default AirplaneCard;
