import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import NewRouteModal from "../components/NewRouteModal";
import RouteCard from "../components/RouteCard";

import { fetchRoutes } from "../utils/FetchRoutes";
import { noLeftPadding } from "../config";
import ScheduleFlightModal from "../components/ScheduleFlightModal";

function Routes() {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    useEffect(() => {
        fetchRoutes()
            .then((data) => setRoutes(data))
            .catch((error) => console.error(error));
    }, []);

    function handleOpenModal(route) {
        setSelectedRoute(route);
    }

    function handleCloseModal() {
        setSelectedRoute(null);
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
