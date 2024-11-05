import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/reviews'; // Cambia esta URL si tu endpoint es diferente

//GET all reviews -- GET
export const  getAllReviews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/reviews`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        throw error;
    }
};
                                                                                                                                                                                                                                                      

//GET one review by ID -- GET
export const getOneReview = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/reviews/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la reseña con ID ${id}:`, error.message);
        throw error;
    }
};



//CREATE new review -- POST

export const createReview = async (reviewData) => {
    try {
        const response = await axios.post(`${BASE_URL}/reviews`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        throw error;
    }
};

//DELETE review -- DELETE
export const deleteReview = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/reviews/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar la reseña con ID ${id}:`, error.message);
        throw error;
    }
};

//UPDATE review -- PUT
export const updateReview = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/reviews/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la reseña con ID ${id}:`, error.message);
        throw error;
    }
};