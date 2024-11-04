import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContextsss'; // Importa el hook useAuth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth(); // Usa el hook en lugar de AuthContext

  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/register');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setError(null);

    if (!validateEmail(email)) {
      setEmailError('El formato del correo no es válido.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      const userData = response.data.user;

      // Llama a login para almacenar el usuario en el contexto
      login(userData);
      sessionStorage.setItem('user', JSON.stringify(userData)); // Almacena el usuario en sessionStorage
      console.log("Inicio de sesión exitoso!");

      // Redirige según el rol del usuario
      if (userData.rol === 'admin') {
        navigate('/'); // Cambia a la ruta que corresponda a admin
      } else {
        navigate('/'); // Redirige al home si es un usuario regular
      }

    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-8 mt-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/fondoLoginMobile.png')` }}>
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-green-900 p-8 rounded-lg shadow-lg max-w-md w-full md:max-w-lg">
          <h2 className="text-white text-3xl mb-6 text-center">Inicia Sesión</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2" htmlFor="email">CORREO</label>
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
              <label className="block text-white text-sm mb-2" htmlFor="password">CONTRASEÑA</label>
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
              type="submit">
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
