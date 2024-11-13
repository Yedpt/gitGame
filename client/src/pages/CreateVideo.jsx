import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pattern from '../assets/img/pattern.svg';
import { useAuth } from '../context/authContextsss';
import { createVideo } from '../services/videoServices';

const CreateVideo = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    user_id: user ? user.id : '',
    title: '',
    video_url: '',
    thumbnail: null, 
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
    if (!formData.video_url) {
      newErrors.video_url = "La URL del video es obligatoria";
    } else if (!/^https?:\/\/(?:www\.)?youtube\.com\/(?:v\/|watch\?v=)([a-zA-Z0-9_-]{11})/.test(formData.video_url)) {
      newErrors.video_url = "La URL del video debe ser un enlace válido de YouTube.";
    }
    if (!formData.thumbnail) newErrors.thumbnail = "Debes seleccionar una miniatura";
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
      formDataToSend.append('video_url', formData.video_url);
      formDataToSend.append('thumbnail', formData.thumbnail);

      try {
        await createVideo(formDataToSend);
        setSuccessMessage('Video creado exitosamente');
        setTimeout(() => navigate('/Videos'), 3000);
      } catch (error) {
        setSubmissionError('Error al registrar video: ' + error.message);
        console.error('Error al registrar video:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-8 bg-cover bg-center bg-no-repeat py-12"
        style={{ backgroundImage: `url(${pattern})` }}
    >
      <div className="flex-grow flex justify-center items-center mt-20">
          <div className="bg-greenMid p-8 rounded-lg shadow-lg max-w-md w-full md:max-w-lg">
            <h2 className="font-title text-white text-4xl mb-6 text-center">CREA UN VIDEO</h2>

            <form onSubmit={handleSubmit}>
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

              <div className="mb-4">
                <label className="font-title block text-greenLight text-lg mb-2">ENLACE DE YOUTUBE</label>
                <input
                  type="text"
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
                />
                {errors.video_url && <p className="text-red-500 text-sm">{errors.video_url}</p>}
              </div>

              <div className="mb-4">
                <label className="font-title block text-greenLight text-lg mb-2">MINIATURA</label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
                />
                {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail}</p>}
              </div>

              <div className="mb-4 flex justify-center">
                <button type="submit" className="font-title w-32 bg-greenLight hover:bg-greenMidsec text-white p-3 rounded-md">
                    Enviar
                </button>
              </div>
              {successMessage && <p className="text-green-500 mt-4 text-sm">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
  );
};

export default CreateVideo;

