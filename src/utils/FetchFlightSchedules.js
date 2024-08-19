import { API_URL } from "../config";

async function fetchFlightSchedules(token) {
    try {
        const response = await fetch(`${API_URL}/api/routes/schedule`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("GET flight schedules response was not okay", response);
        }

        return await response.json();
    } catch {
        throw new Error("Failed to fetch flight schedules ", error);
    }
}

export { fetchFlightSchedules };