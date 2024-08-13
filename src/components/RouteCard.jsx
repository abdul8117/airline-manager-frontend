import ScheduleFlightModal from "./ScheduleFlightModal";

function RouteCard({ route, onOpenModal }) {
    const hours = Math.floor(route.totalFlightTime / 60);
    const minutes = route.totalFlightTime % 60;

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">
                    <p className="title is-2">
                        {route.hubAirport.iataCode}
                        {" -->-- "} {route.destinationAirport.iataCode}
                    </p>
                </div>
            </div>

            <div className="card-content">
                <p>Departure: {route.hubAirport.name}</p>
                <p>Destination: {route.destinationAirport.name}</p>
                <p>Distance: {route.distance} km</p>
                <p>
                    Flight time: {hours} hours and {minutes} minutes
                </p>
            </div>

            <div className="card-footer">
                <div
                    className="card-footer-item"
                    onClick={() => onOpenModal(route)}
                >
                    <a>Schedule a flight on this route</a>
                </div>
            </div>
        </div>
    );
}

export default RouteCard;
