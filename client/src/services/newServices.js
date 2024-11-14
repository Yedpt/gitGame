import axios from 'axios';

const API_URL = 'http://localhost:3000/api/news';

//Get all news -- GET
export const getAllNews = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error('getAllNews error ', error.message);
    throw error;
  }
};

// Obtener noticia por ID -- GET
export const getNewById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Noticia con ID ${id} no encontrada.`);
    } else {
      console.error(`Error al obtener noticia con ID ${id}:`, error.message);
    }
    throw error;
  }
};

//Obtener noticias por user ID -- GET
export const getNewsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las reseñas del usuario con ID ${userId}:`, error.message);
    throw error;
  }
};

// Eliminar noticia -- DELETE
export const deleteNew = async (id) => {
  try {
    // Obtener el token de autorización
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario', error);
    throw error;
  }
};

// Crear una noticia -- POST
export const createNew = async (newData) => {
  const { title, news, image_url, image2_url } = newData;

  try {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };
    const response = await axios.post(API_URL, newData, config);
    return response.data;
  } catch (error) {
    console.error('Error al crear la noticia', error);
    throw error;
  }
};

// Actualizar noticia -- PUT
export const updateNew = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };
    const response = await axios.put(`${API_URL}/${id}`, updatedData, config);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la reseña con ID ${id}:`, error.message);
    throw error;
  }
};

export const incrementLike = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error al incrementar like a noticia con ID ${id}:`, error.message);
    throw error;
  }
};