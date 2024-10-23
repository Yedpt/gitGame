import axios from "axios";
const URL_API = "http://localhost:5173";
const URL_STORAGE = "https://api.cloudinary.com/v1_1/dz53okn10/image/upload";

//Get all news -- GET
export async function getAllNews() {
  try {
    const response = await axios.get(URL_API);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

//Create new -- POST
export async function uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('upload_preset', 'ml_default');
      formData.append('file', file);
  
      const response = await axios.post(URL_STORAGE, formData);
      return response.data;
    } catch (error) {
      console.log("ERROR en la subida de la imagen", error);
    }
  };
  
  export async function createNew(dataNew) {
    try {
      const response = await axios.post(URL_API, dataNew)
      .then((response) =>{
        console.log(response);
      });
      return response;
    } catch(e) {console.error("ERROR",e);
    }
  };  