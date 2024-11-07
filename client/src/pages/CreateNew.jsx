import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContextsss';
import { createNew } from '../services/newServices';

const CreateNew = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    id: '',
    user_id: user ? user.id : '',
    title: '',
    news: '',
    image_url: null,
    image2_url: null,
  });

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "El título es obligatorio.";
    if (!formData.news) newErrors.news = "El contenido de la noticia es obligatorio.";
    if (!formData.image_url) newErrors.image_url = "La imagen principal es obligatoria";
    if (!formData.image2_url) newErrors.image2_url = "La imagen secundaria es obligatoria";
    if (!formData.news || formData.news.length < 10) newErrors.news = "La noticia debe tener al menos 10 caracteres.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('user_id', user.id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('news', formData.news);
      formDataToSend.append('num_likes', 0);
      formDataToSend.append('image_url', formData.image_url);
      formDataToSend.append('image2_url', formData.image2_url);

      try {
        await createNew(formDataToSend);
        alert('Noticia creada exitosamente');
        navigate('/news');
      } catch (error) {
        setSubmissionError('Error al registrar la noticia: ' + error.message);
        console.error('Error al registrar la noticia:', error);
      }
    }
  };

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

            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg  mb-2">IMÁGEN PRINCIPAL</label>
              <input
                type="file"
                name="image_url"
                // value={formData.image_url}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              />
              {errors.image_url && <p className="text-red-500 text-sm">{errors.image_url}</p>}
            </div>

            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg  mb-2">IMÁGEN SECUNDARIA</label>
              <input
                type="file"
                name="image2_url"
                // value={formData.image2_url}
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