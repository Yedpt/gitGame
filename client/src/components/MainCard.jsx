import React from 'react';
import blackops from '../assets/img/blackops.svg';

const MainCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative h-full">
      
      <img 
        src={blackops} 
        alt="Call of Duty" 
        className="w-full h-full object-cover"  
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
        <h3 className="text-2xl font-bold mb-2 font-title text-white">
          El nuevo Call of Duty vuelve a sus orígenes
        </h3>

        {/* Este párrafo estará oculto en móviles y visible en pantallas medianas en adelante */}
        <p className="text-gray-300 font-paragraph hidden md:block">
          Descubre cómo la última entrega de la franquicia regresa a sus raíces con un enfoque en la guerra moderna y el combate táctico.
        </p>
      </div>
    </div>
  );
}

export default MainCard;

