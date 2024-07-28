import { API_URL } from "../config";

async function fetchRoutes() {
    try {
        const response = await fetch(`${API_URL}/api/routes`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error("Network response was not ok.");
    } catch (error) {
        throw new Error("Error when fetching routes: " + error);
    }
}

export { fetchRoutes };