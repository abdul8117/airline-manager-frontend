function FleetCard({ airplane }) {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">
                    {airplane.aircraftType.manufacturer}{" "}
                    {airplane.aircraftType.model} {"\n"}
                </div>
                <div className="card-header-icon">
                    <span className="icon">
                        <strong>x{airplane.quantity}</strong>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FleetCard;
