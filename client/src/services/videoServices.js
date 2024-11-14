import axios from "axios";

const BASE_URL = "http://localhost:3000/videos"; // Cambia esta URL si tu endpoint de videos es diferente

// Obtener todos los videos
export const getAllVideos = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los videos:", error);
    throw error;
  }
};

// Obtener un video por ID
export const getVideoById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el video con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo video
export const createVideo = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/videos",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Maneja la respuesta del backend
  } catch (error) {
    console.error("Error al crear el video:", error);
    throw error; // Propaga el error al componente para que se pueda manejar adecuadamente
  }
};

// Eliminar un video por ID
export const deleteVideo = async (id) => {
  const token = localStorage.getItem("token"); // Si necesitas un token

  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Si el backend usa autenticación
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el video con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un video por ID
export const updateVideo = async (id, updatedData) => {
  const token = localStorage.getItem("token"); // Si necesitas un token

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Si el backend usa autenticación
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el video con ID ${id}:`, error);
    throw error;
  }
};
