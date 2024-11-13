import axios from "axios";
const BASE_URL = 'http://localhost:3000/api/releases';

export const  getAllReleases = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        throw error;
    }
};

export const getReleaseById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching release:', error);
        throw error;
    }
};

export const getReleasesByMonth = async (month) => {
    try {
        const response = await axios.get(`${BASE_URL}/month/${month}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching releases by month:', error);
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
      console.error('Error creating release:', error);
      throw error;
    }
  };

export const updateRelease = async (id, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            method: 'PUT',
            body: formData
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating release:', error);
        throw error;
    }
};

export const deleteRelease = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting release:', error);
        throw error;
    }
};
