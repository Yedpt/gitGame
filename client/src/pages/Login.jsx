// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      console.log('Login exitoso:', response.data);
      // Aquí puedes redirigir o guardar el token según tu lógica
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between px-8"  // Flex para centrar con espacios
      style={{
        backgroundImage: `url('/fondoLoginMobile.svg')`, // Asegúrate de colocar correctamente la ruta del archivo SVG
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
      
      {/* Contenedor de login centrado */}
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
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                required
              />
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
              ¿Aún no tienes cuenta? <a href="#" className="text-green-400">Crea una.</a>
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
