import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import NewRouteModal from "../components/NewRouteModal";
import RouteCard from "../components/RouteCard";

import { fetchRoutes } from "../utils/FetchRoutes";
import { noLeftPadding } from "../config";

function Routes() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        fetchRoutes()
            .then((data) => setRoutes(data))
            .catch((error) => console.error(error));
    }, []);

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
                            <div className="grid-item">
                                <RouteCard route={route} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Routes;
