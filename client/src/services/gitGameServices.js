import axios from "axios";
const URL_API = "http://localhost:5173";

//Get all news -- GET
export const getAllNews = async () => {
  try {
    const res = await axios.get(URL_API);
    return res;
  } catch (error) {
    console.error('getAllNews error ', error.message);
    throw error;
  }
};

//Get one meme by ID -- GET
export const getOneNew = async (id) => {
  try {
    const res = await axios.get(`${URL_API}/${id}`);
    return res;
  } catch (error) {
    console.error(`getOnenEW ID ${id} error:`, error.message);
    throw error;
  }

};

export const createNew = async (data) => {
  try {
      const res = await axios.post(URL_API, data);
      return res;
  }  catch (error) {
      console.error('createNew error:', error.message);
      throw error;
    }
};

//Delete New -- DELETE
export const deleteNew = async (id) => {
  try{
  let URL_ID = `${URL_API}/${id}`;
  const res = await axios.delete(URL_ID);
  return res;
  }  catch (error) {
      console.error(`deleteNew ID ${id} error:`, error.message);
      throw error;
  }
};

//Update New -- PUT
export const updateNew = async (data) => {
  try{
  let URL_ID = `${URL_API}/${data.id}`;
  const res = await axios.put(URL_ID, data);
  return res;
  } catch(error) {
      console.error(`Error en updateNew con ID ${data.id}:`, error.message);
      throw error;
  }
};