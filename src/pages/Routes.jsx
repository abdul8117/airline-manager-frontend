import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import NewRouteModal from "../components/NewRouteModal";
import RouteCard from "../components/RouteCard";

import { noLeftPadding } from "../config";
import { API_URL } from "../config";

function Routes() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        async function fetchRoutes() {
            try {
                const response = await fetch(`${API_URL}/api/routes`);
                if (response.ok) {
                    const data = await response.json();
                    setRoutes(data);
                }
                throw new Error("Network response was not ok.");
            } catch (error) {
                throw new Error("Error when fetching routes: " + error);
            }
        }

        fetchRoutes();
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

                <div className="grid is-min-30">
                    {routes.map((route) => (
                        <div className="grid-item">
                            <RouteCard route={route} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Routes;
