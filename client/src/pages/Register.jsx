import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userServices';
import avatar1 from '../assets/avatarImage/avatar1.svg';
import avatar2 from '../assets/avatarImage/avatar2.svg';
import avatar3 from '../assets/avatarImage/avatar3.svg';
import avatar4 from '../assets/avatarImage/avatar4.svg';
import avatar5 from '../assets/avatarImage/avatar5.svg';
import avatar6 from '../assets/avatarImage/avatar6.svg';
import avatar7 from '../assets/avatarImage/avatar7.svg';
import avatar8 from '../assets/avatarImage/avatar8.svg';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birth_date: '',
    password: '',
    confirmPassword: '',
    bio: '',
    avatar: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  // Estados para la visibilidad de la contraseña y confirmación
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email) newErrors.email = "El correo es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo inválido.";
    if (!formData.birth_date) newErrors.birth_date = "La fecha de nacimiento es obligatoria.";
    if (!formData.password || formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden.";
    if (!formData.bio) newErrors.bio = "La biografía es obligatoria.";
    if (!formData.avatar) newErrors.avatar = "Elige un avatar.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await createUser(formData);
        setSuccessMessage("¡Registro exitoso! Serás redirigido al inicio de sesión.");
        setTimeout(() => navigate('/login'), 3000); // Espera de 3 segundos antes de redirigir
      } catch (error) {
        console.error('Error al registrar', error);
      }
    }
  };

  const handleAvatarSelect = (avatar) => {
    setFormData({ ...formData, avatar });
    setShowAvatarDropdown(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-8 bg-cover bg-center bg-no-repeat py-12"
      style={{ backgroundImage: `url('/fondoLoginMobile.png')` }}
    >
      <div className="flex-grow flex justify-center items-center mt-20">
        <div className="bg-green-900 p-8 rounded-lg shadow-lg max-w-md w-full md:max-w-lg">
          <h2 className="text-white text-3xl mb-6 text-center">Regístrate</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 text-gray-900"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Correo */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Correo</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 text-gray-900"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Fecha de nacimiento */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Fecha de Nacimiento</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 text-gray-900"
              />
              {errors.birth_date && <p className="text-red-500 text-sm">{errors.birth_date}</p>}
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-100 text-gray-900"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirmar contraseña */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-100 text-gray-900"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            {/* Acerca de mí */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Acerca de mí</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 text-gray-900"
              ></textarea>
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            </div>

            {/* Elige avatar */}
            <div className="mb-4 relative">
              <label className="block text-white text-sm mb-2">Elige Avatar</label>
              <div
                className="w-full p-2 rounded bg-gray-100 text-gray-900 cursor-pointer"
                onClick={() => setShowAvatarDropdown(!showAvatarDropdown)}
              >
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar seleccionado"
                    className="inline-block w-10 h-10 rounded-full mr-2"
                  />
                ) : (
                  'Seleccionar Avatar...'
                )}
              </div>

              {showAvatarDropdown && (
                <div
                  className="absolute z-10 mt-2 w-full bg-gray-800 p-4 rounded-lg shadow-lg grid grid-cols-4 gap-4"
                  style={{ maxHeight: '200px', overflowY: 'auto', top: '100%' }}
                >
                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-16 h-16 object-cover cursor-pointer hover:ring-4 hover:ring-green-500"
                      onClick={() => handleAvatarSelect(avatar)}
                    />
                  ))}
                </div>
              )}
              {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
            </div>

            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded">
              Crear Cuenta
            </button>

            {successMessage && <p className="text-green-500 mt-4 text-sm">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
