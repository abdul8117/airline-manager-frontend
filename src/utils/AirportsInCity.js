import { API_URL } from "../config";

async function fetchAllAirportsInCity(cityId) {
    try {
        const response = await fetch(`${API_URL}/api/airports/cities/${cityId}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Network response was not ok.");
        }
    } catch (error) {
        throw new Error("Error when fetching airports in a city: " + error);
    }
}

export { fetchAllAirportsInCity };