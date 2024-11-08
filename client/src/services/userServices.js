import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

// listar todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario por ID", error);
    throw error;
  }
}

// Crear un nuevo usuario
export const createUser = async (userData) => {
  const { name, email, birth_date, password, bio, avatar } = userData;
  const role = "usuario"; // Asigna el rol por defecto
  const create_at = new Date(); // Fecha de creación

  try {
    const response = await axios.post(API_URL, {
      name,
      email,
      birth_date,
      password,
      bio,
      avatar,
      role,
      create_at,
      status: "active", // Estado por defecto
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("Correo en uso");
    }
    throw error;
  }
};

// Obtener usuario por ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario por ID", error);
    throw error;
  }
};


// Actualizar usuario
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario", error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario", error);
    throw error;
  }
};
