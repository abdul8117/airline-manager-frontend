import { API_URL } from "../config";

async function fetchAllCitiesInCountry(countryName) {
    try {
        const response = await fetch(`${API_URL}/api/cities?country=${countryName}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Network response was not ok.");
        }
    } catch (error) {
        throw new Error("Error when fetching cities in a country: " + error);
    }
}

export { fetchAllCitiesInCountry };