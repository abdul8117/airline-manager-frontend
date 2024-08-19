import { API_URL } from "../config.js";

async function fetchPlayerFleet(token) {
    try {
        const response = await fetch(`${API_URL}/api/fleet`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log("GET fleet response is ok");
            const data = await response.json();
            return data;
        } else {
            throw new Error("GET fleet response was not okay", response);
        }
    } catch (error) {
        throw new Error("Failed to fetch fleet", error);
    }
}

export { fetchPlayerFleet };