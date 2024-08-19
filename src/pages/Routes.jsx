import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import NewRouteModal from "../components/NewRouteModal";
import RouteCard from "../components/RouteCard";

import { fetchRoutes } from "../utils/FetchRoutes";
import { noLeftPadding } from "../config";
import ScheduleFlightModal from "../components/ScheduleFlightModal";
import { fetchFlightSchedules } from "../utils/FetchFlightSchedules";
import { useAuth } from "../components/auth/AuthProvider";

function Routes() {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const [schedules, setSchedules] = useState([]);

    const { token } = useAuth();

    useEffect(() => {
        // fetch the routes that the player operates
        fetchRoutes()
            .then((data) => setRoutes(data))
            .catch((error) => console.error(error));

        // fetch the schedules of every route
        fetchFlightSchedules(token)
            .then((data) => setSchedules(data))
            .catch((error) => console.error(error));
    }, [token]);

    function handleOpenModal(route) {
        setSelectedRoute(route);
    }

    function handleCloseModal() {
        setSelectedRoute(null);
    }

    function getScheduleOfRoute(routeId) {
        return schedules.filter(
            (schedule) => schedule.route.routeId == routeId,
        )[0];
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="section" style={noLeftPadding}>
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <h1 className="title">Your routes</h1>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <NewRouteModal />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed-grid has-2">
                    <div className="grid">
                        {routes.map((route) => (
                            <div className="grid-item" key={route.routeId}>
                                <RouteCard
                                    route={route}
                                    schedule={getScheduleOfRoute(route.routeId)}
                                    onOpenModal={handleOpenModal}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {selectedRoute && (
                    <ScheduleFlightModal
                        route={selectedRoute}
                        onCloseModal={handleCloseModal}
                    />
                )}
            </div>
        </>
    );
}

export default Routes;
