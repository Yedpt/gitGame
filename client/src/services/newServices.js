import axios from 'axios';

const API_URL = 'http://localhost:3000/api/news';

// Crear una noticia
export const createNew = async (newData) => {
  const { title, news, image_url } = newData;
  const user_id = 1; // LIGADO A LA TABLA DE USUARIOS
  const published_at = new Date(); // Fecha de creación
  const updated_at = new Date(); // Fecha de actualización
  const num_likes = 5; //LIKES DE LAS NOTICIAS

  try {
    const response = await axios.post(API_URL, {
        user_id,
        title,
        news,
        published_at,
        updated_at,
        num_likes,
        image_url,
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario', error);
    throw error;
  }
};

// Obtener noticia por ID
export const getNewById = async (newId) => {
  try {
    const response = await axios.get(`${API_URL}/${newId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario por ID', error);
    throw error;
  }
};

// Actualizar noticia
export const updateNew = async (newId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${newId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario', error);
    throw error;
  }
};

// Eliminar noticia
export const deleteNew = async (newId) => {
  try {
    const response = await axios.delete(`${API_URL}/${newId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario', error);
    throw error;
  }
};