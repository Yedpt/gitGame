import { useState } from 'react';
import axios from 'axios';
import avatar1 from '../assets/avatarImage/avatar1.svg';
import avatar2 from '../assets/avatarImage/avatar2.svg';
import avatar3 from '../assets/avatarImage/avatar3.svg';
import avatar4 from '../assets/avatarImage/avatar4.svg';
import avatar5 from '../assets/avatarImage/avatar5.svg';
import avatar6 from '../assets/avatarImage/avatar6.svg';
import avatar7 from '../assets/avatarImage/avatar7.svg';
import avatar8 from '../assets/avatarImage/avatar8.svg';

const Register = () => {
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
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  const avatars = [
    avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8
  ];

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
        const response = await axios.post('http://localhost:5000/api/register', formData);
        alert('Registro exitoso');
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
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-10 mb-10">
      <h1 className="text-2xl text-white mb-4">Regístrate</h1>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-white">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="block text-white">Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Fecha de nacimiento */}
        <div className="mb-4">
          <label className="block text-white">Fecha de Nacimiento</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
          {errors.birth_date && <p className="text-red-500 text-sm">{errors.birth_date}</p>}
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-white">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirmar Contraseña */}
        <div className="mb-4">
          <label className="block text-white">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Acerca de mí */}
        <div className="mb-4">
          <label className="block text-white">Acerca de mí</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          ></textarea>
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        {/* Elige Avatar */}
        <div className="mb-4 relative">
          <label className="block text-white">Elige Avatar</label>
          <div
            className="w-full p-2 rounded-lg bg-gray-700 text-white cursor-pointer"
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

          {/* Dropdown de avatares */}
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
                  className="w-16 h-16 object-cover  cursor-pointer hover:ring-4 hover:ring-green-500"  // Añadido object-cover para asegurar que la imagen mantenga sus proporciones
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </div>
          )}
          {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
        </div>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
};

export default Register;
