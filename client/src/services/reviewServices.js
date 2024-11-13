import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/reviews'; // Cambia esta URL si tu endpoint es diferente

//GET all reviews -- GET
export const  getAllReviews = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        throw error;
    }
};
                                                                                                                                                                                                                                                      

//GET one review by ID -- GET
export const getOneReview = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la reseña con ID ${id}:`, error.message);
        throw error;
    }
};

//GET all reviews by user ID -- GET
export const getReviewsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error)
    {
        console.error(`Error al obtener las reseñas del usuario con ID ${userId}:`, error.message);
        throw error;
    }
};

//GET all reviews by admin -- GET
export const getAllReviewsAdmin = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin`);
        return response;
    } catch (error) {
        console.error('Error al obtener las reseñas de los administradores:', error);
        throw error;
    }
};

//GET all reviews by user -- GET
export const getAllReviewsUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user`);
        return response;
    } catch (error) {
        console.error('Error al obtener las reseñas de los usuarios:', error);
        throw error;
    }
};




//CREATE new review -- POST

export const createReview = async (reviewData) => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage

    try {
        const response = await axios.post(`${BASE_URL}`, reviewData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Añade el token aquí
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        throw error;
    }
};

//DELETE review -- DELETE
export const deleteReview = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar la reseña con ID ${id}:`, error);
        throw error;
    }
};

//UPDATE review -- PUT
export const updateReview = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la reseña con ID ${id}:`, error.message);
        throw error;
    }
};

// Servicio para dar like a una reseña
export const addLikeToReview = async (id, updatedData) => {
    try {
      const response = await axios.patch(`${BASE_URL}/${id}/like`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error al dar like a la reseña:", error);
      throw error;
    }
  };

  export const incrementLike = async (id) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error al incrementar like a review con ID ${id}:`, error.message);
      throw error;
    }
  };