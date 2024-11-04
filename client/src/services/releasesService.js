const API_URL = 'http://localhost:5000/api/releases';

// Fonction pour récupérer tous les jeux à venir
export const fetchUpcomingReleases = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des jeux:', error);
    }
};

// Fonction pour récupérer les jeux d'un mois spécifique
export const fetchReleasesByMonth = async (month) => {
    try {
        const response = await fetch(`${API_URL}/${month}`);
        return await response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération des jeux pour le mois de ${month}:`, error);
    }
};
