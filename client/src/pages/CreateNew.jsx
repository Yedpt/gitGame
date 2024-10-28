import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateNew = () => {
  const [formData, setFormData] = useState({
    users_id: '',
    title: '',
    news: '',
    published_at: '',
    updated_at: '',
    num_likes: '',
    image_url: '',
    image2_url: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "El título es obligatorio.";
    if (!formData.news) newErrors.news = "El contenido de la noticia es obligatorio.";
    if (!formData.updated_at) newErrors.updated_at = "La fecha de actualización es automatica";
    // if (!formData.num_likes) newErrors.num_likes = "CANTIDAD DE LIKES";
    if (!formData.image_url) newErrors.image_url = "URL";
    if (!formData.image2_url) newErrors.image2_url = "URL";
    if (!formData.news || formData.news.length < 500) newErrors.news = "La noticia debe tener al menos 500 caracteres.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/api/news', formData);
        alert('Registro exitoso');
      } catch (error) {
        console.error('Error al registrar', error);
      }
    }
  };

  const [fecha, setFecha] = useState('');
  useEffect(() => {
    const fechaActual = new Date();
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);
    setFecha(fechaFormateada);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between px-8 bg-cover bg-center bg-no-repeat py-12"
      style={{ backgroundImage: `url('/fondoLoginMobile.png')` }}
    >
      <div className="flex-grow flex justify-center items-center mt-20">
        <div className="bg-greenMid p-8 rounded-lg shadow-lg max-w-md w-full md:max-w-lg">
          <h2 className="font-title text-white text-4xl mb-6 text-center">CREA UNA NOTICIA</h2>

          <form onSubmit={handleSubmit}>
            {/* title */}
            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg mb-2">TÍTULO</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Noticia */}
            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg mb-2">DETALLE</label>
              <textarea
                name="news"
                value={formData.news}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              ></textarea>
              {errors.news && <p className="text-red-500 text-sm">{errors.news}</p>}
            </div>

            {/* Fecha de publicación */}
            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg  mb-2">FECHA DE PUBLICACIÓN</label>
              <input
                type="text"
                name="published_at"
                value={fecha}
                readOnly
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              />
              {errors.published_at && <p className="text-red-500 text-sm">{errors.published_at}</p>}
            </div>

            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg  mb-2">IMAGEN PRINCIPAL</label>
              <input
                type="file"
                name="url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              />
              {errors.image_url && <p className="text-red-500 text-sm">{errors.image_url}</p>}
            </div>

            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg  mb-2">IMAGEN SECUNDARIA</label>
              <input
                type="file"
                name="url"
                value={formData.image2_url}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              />
              {errors.image2_url && <p className="text-red-500 text-sm">{errors.image2_url}</p>}
            </div>

            <div className="mb-4 flex justify-center">
              <button type="submit" className="font-title w-32 bg-greenLight hover:bg-greenMidsec text-white p-3 rounded-md">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;