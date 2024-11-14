import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pattern from '../assets/img/pattern.svg';
import { useAuth } from '../context/authContextsss';
import { createRelease } from '../services/releasesServices';

const CreateLaunch = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    user_id: user ? user.id : '',
    title: '',
    release_date: '',
    rating: null,
    image_url: null,
    month: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    if (!formData.release_date) newErrors.release_date = "La fecha de lanzamiento es obligatoria.";
    if (!formData.image_url) newErrors.image_url = "Debes seleccionar una imagen.";
    if (user?.rol === 'admin' && (!formData.rating || formData.rating < 1 || formData.rating > 5)) {
      newErrors.rating = "ADMIN: la calificación es necesaria del 1 al 5.";
    }
    if (!formData.month) newErrors.month = "El mes es obligatorio.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append('user_id', user.id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('release_date', formData.release_date);
      formDataToSend.append('image_url', formData.image_url);
      formDataToSend.append('month', formData.month);
      if (user?.rol === 'admin' && formData.rating) {
        formDataToSend.append('rating', formData.rating);
      }

      try {
        await createRelease(formDataToSend);
        setSuccessMessage("¡Lanzamiento creado exitosamente!");
        setTimeout(() => navigate('/upcoming'), 3000);
      } catch (error) {
        setSubmissionError('Error al crear el lanzamiento: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-8 bg-cover bg-center bg-no-repeat py-12"
         style={{ backgroundImage: `url(${pattern})` }}>
      <div className="flex-grow flex justify-center items-center mt-20">
        <div className="bg-greenMid p-8 rounded-lg shadow-lg max-w-md w-full md:max-w-lg">
          <h2 className="font-title text-white text-4xl mb-6 text-center">CREA UN LANZAMIENTO</h2>

          <form onSubmit={handleSubmit}>
            {/* Title */}
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

            {/* Release Date */}
            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg mb-2">FECHA DE LANZAMIENTO</label>
              <input
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              />
              {errors.release_date && <p className="text-red-500 text-sm">{errors.release_date}</p>}
            </div>

            {user?.rol === 'admin' && (
              <div className="mb-4">
                <label className="font-title block text-greenLight text-lg mb-2">CALIFICACIÓN</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
              </div>
            )}

            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg mb-2">IMAGEN</label>
              <input
                type="file"
                name="image_url"
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              />
              {errors.image_url && <p className="text-red-500 text-sm">{errors.image_url}</p>}
            </div>

            <div className="mb-4">
              <label className="font-title block text-greenLight text-lg mb-2">MES</label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
              />
              {errors.month && <p className="text-red-500 text-sm">{errors.month}</p>}
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

export default CreateLaunch;