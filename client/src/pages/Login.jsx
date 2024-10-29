// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/register');
  };

  // Validaciones
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Limpiamos los errores previos
    setEmailError('');
    setPasswordError('');
    setError(null);

    // Validación de email
    if (!validateEmail(email)) {
      setEmailError('El formato del correo no es válido.');
      valid = false;
    }

    // Validación de contraseña
    if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      valid = false;
    }

    // Si no es válido, no hacemos el submit
    if (!valid) {
      return;
    }

    try {
      // Verificar el usuario en el backend
      const response = await axios.post('http://localhost:3000/api/users', { email, password });
      console.log('Login exitoso:', response.data);
      
      // Guardar información del usuario en sessionStorage
      sessionStorage.setItem('user', JSON.stringify(response.data.user)); // Guarda el objeto del usuario en sessionStorage

      setIsLoggedIn(true);
      setUserName(response.data.user.name); // Asumiendo que el backend retorna el nombre del usuario
      navigate('/'); // Redirige al home
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between px-8 mt-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/fondoLoginMobile.png')` }} 
    >
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-green-900 p-8 rounded-lg shadow-lg max-w-md w-full md:max-w-lg">
          <h2 className="text-white text-3xl mb-6 text-center">Inicia Sesión</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2" htmlFor="email">
                CORREO
              </label>
              <input
                className="w-full p-2 rounded bg-gray-100 text-gray-900"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm mb-2" htmlFor="password">
                CONTRASEÑA
              </label>
              <input
                className="w-full p-2 rounded bg-gray-100 text-gray-900"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              type="submit"
            >
              Entrar
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-white text-sm">
              ¿Aún no tienes cuenta? <a href="#" onClick={handleSignupClick} className="text-green-400">Crea una.</a>
            </p>
            <p className="text-white text-sm mt-2">
              <a href="#" className="text-green-400">Olvidé mi contraseña</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
