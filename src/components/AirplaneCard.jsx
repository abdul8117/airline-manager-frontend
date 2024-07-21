function AirplaneCard({ airplane }) {
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
                    <p>Manufacturer:{airplane.manufacturer}</p>
                    <p>Price: ${airplane.price}</p>
                    <p>Capacity: {airplane.capacity}</p>
                    <p>Range: {airplane.range}</p>
                </div>
            </div>
            <div className="card-footer">
                <button className="card-footer-item">-</button>
                <p className="card-footer-item">1</p>
                <button className="card-footer-item">+</button>
                <button className="card-footer-item">Buy</button>
            </div>
        </div>
    );
}

export default AirplaneCard;
