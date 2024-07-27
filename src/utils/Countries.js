import { API_URL } from "../config";

async function fetchAllCountries() {
    try {
        const response = await fetch(`${API_URL}/api/countries`);
        if (response.ok) {
            const data = await response.json();
            return data.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            throw new Error("Network response was not ok.");
        }
    } catch (error) {
        throw new Error("Error when fetching countries: " + error);
    }
}

export { fetchAllCountries };