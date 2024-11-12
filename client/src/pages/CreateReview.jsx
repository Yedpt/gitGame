import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pattern from '../assets/img/pattern.svg';
import { useAuth } from '../context/authContextsss';
import { createReview } from '../services/reviewServices';

const CreateReview = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  
  const [formData, setFormData] = useState({
    id: '',
    user_id: user ? user.id : '',
    title: '',
    review: '',
    author: '',
    rating: null,
    image_url: null, // Debe ser null inicialmente para un archivo
  });

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirige al inicio de sesión si no está autenticado
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Asigna la imagen si es un archivo
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "El título es obligatorio.";
    if (!formData.review) newErrors.review = "El contenido de la reseña es obligatorio";
    if (!formData.image_url) newErrors.image_url = "Debes seleccionar una imagen";
    if (!formData.author) newErrors.author = "El autor es obligatorio";
    // Solo los admins necesitan un rating
    if (user?.rol === 'admin' && (!formData.rating || formData.rating < 1 || formData.rating > 5)) {
      newErrors.rating = "ADMIN: la calificación es necesaria del 1 al 5";
    }
    if (formData.review.length < 10) newErrors.review = "La reseña debe tener al menos 10 caracteres.";
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
      formDataToSend.append('rol', user.rol);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('review', formData.review);
      formDataToSend.append('image_url', formData.image_url); // Usa el image_url del estado
      formDataToSend.append('author', formData.author);
      formDataToSend.append('num_likes', 0); // Inicialmente en 0
      // Solo los admins envían rating
      if (user?.rol === 'admin' && formData.rating) {
        formDataToSend.append('rating', formData.rating);
      }
      
      

      try {
        await createReview(formDataToSend);
        setSuccessMessage("¡Registro de reseña exitoso!");
        setTimeout(() => navigate('/reviews'), 3000);
      } catch (error) {
        setSubmissionError('Error al registrar reseña: ' + error.message);
        console.error('Error al registrar reseña:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-8 bg-cover bg-center bg-no-repeat py-12"
        style={{ backgroundImage: `url(${pattern})` }}
    >
      <div className="flex-grow flex justify-center items-center mt-20">
          <div className="bg-greenMid p-8 rounded-lg shadow-lg max-w-md w-full md:max-w-lg">
            <h2 className="font-title text-white text-4xl mb-6 text-center">CREA UNA RESEÑA</h2>

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

              {/* Review */}
              <div className="mb-4">
                <label className="font-title block text-greenLight text-lg mb-2">RESEÑA</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
                ></textarea>
                {errors.review && <p className="text-red-500 text-sm">{errors.review}</p>}
              </div>

              {/* author */}
              <div className="mb-4">
                  <label className="font-title block text-greenLight text-lg mb-2">AUTOR</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-gray-100 text-gray-900 font-paragraph"
                  />
                  {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
              </div>

              {/* rating */}
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

              {/* Image */}
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

export default CreateReview;
