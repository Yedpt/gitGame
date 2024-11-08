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
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener noticia con ID ${id}:`, error.message);
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
    const response = await axios.delete(`${API_URL}/${id}`);
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
    const response = await axios.post(API_URL, newData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la noticia', error);
    throw error;
  }
};

// Actualizar noticia -- PUT
export const updateNew = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario', error);
    throw error;
  }
};