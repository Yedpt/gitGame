import axios from "axios";
const BASE_URL = 'http://localhost:3000/api/releases';

// Fonción para recuperar los proximos juegos.
export const getAllUpComingReleases = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/UpcomingReleases`);
        return response.data;
    } catch (error) {
        console.error('Surgió un error a la hora de recuperar los juegos', error);
        throw error;
    }
};

// Fonción para recuperar los juegos de un mes específico.
export const getReleasesByMonth = async (month) => {
    try {
        const response = await axios.get(`${BASE_URL}/${month}`);
        return response.data;
    } catch (error) {
        console.error(`Surgió un error a la hora de recuperar el juego del mes de ${month}:`, error);
        throw error;
    }
};

// crear una petición post createReleases.
