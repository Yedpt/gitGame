import axios from "axios";
const BASE_URL = 'http://localhost:3000/api/releases';

export const getAllReleases = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los lanzamientos:', error);
        throw error;
    }
};

export const getReleaseById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el lanzamiento:', error);
        throw error;
    }
};

export const getReleasesByMonth = async (month) => {
    try {
        const response = await axios.get(`${BASE_URL}/month/${month}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener lanzamientos por mes:', error);
        throw error;
    }
};

export const createRelease = async (formData) => {
    try {
        const response = await axios.post(BASE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear lanzamiento:', error);
        throw error;
    }
};

export const updateRelease = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el lanzamiento con ID ${id}:`, error);
        throw error;
    }
};

export const deleteRelease = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar lanzamiento con ID ${id}:`, error);
        throw error;
    }
};
